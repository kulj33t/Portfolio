import React, { useEffect, useRef, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

type ContactForm = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const INITIAL_FORM: ContactForm = {
  name: "",
  email: "",
  message: "",
  website: "",
};

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const REQUEST_TIMEOUT = 15000;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

function isValidEmail(email: string): boolean {
  return (
    email.length <= MAX_EMAIL_LENGTH &&
    !email.includes("..") &&
    EMAIL_REGEX.test(email)
  );
}

function validateForm(form: ContactForm): FormErrors {
  const errors: FormErrors = {};

  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.name = "Your name is too long.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = "Your message is too long.";
  }

  return errors;
}

const Footer: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState<ContactForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<FormStatus>("idle");

  const updateStatus = (nextStatus: FormStatus) => {
    statusRef.current = nextStatus;
    setStatus(nextStatus);
  };

  useEffect(() => {
    if (!isChatOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && statusRef.current !== "sending") {
        setIsChatOpen(false);
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          );

        if (!focusableElements.length) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      nameInputRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isChatOpen]);

  const openChat = () => {
    setErrors({});
    setServerError("");
    updateStatus("idle");
    setIsChatOpen(true);
  };

  const closeChat = () => {
    if (statusRef.current === "sending") return;
    setIsChatOpen(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name in errors) {
      setErrors((previous) => ({
        ...previous,
        [name]: undefined,
      }));
    }

    if (serverError) {
      setServerError("");
    }

    if (statusRef.current === "error") {
      updateStatus("idle");
    }
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    if (name === "email" && value.trim()) {
      setErrors((previous) => ({
        ...previous,
        email: isValidEmail(value.trim())
          ? undefined
          : "Please enter a valid email address.",
      }));
    }

    if (name === "name") {
      setErrors((previous) => ({
        ...previous,
        name:
          value.trim().length > MAX_NAME_LENGTH
            ? "Your name is too long."
            : undefined,
      }));
    }

    if (name === "message") {
      setErrors((previous) => ({
        ...previous,
        message:
          value.trim().length > MAX_MESSAGE_LENGTH
            ? "Your message is too long."
            : undefined,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (statusRef.current === "sending") return;

    setServerError("");

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (formData.website.trim()) {
      updateStatus("success");
      return;
    }

    updateStatus("sending");

    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          website: formData.website,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(
          typeof result?.message === "string"
            ? result.message
            : "Unable to send your message. Please try again.",
        );
      }

      setFormData(INITIAL_FORM);
      setErrors({});
      updateStatus("success");
    } catch (error) {
      updateStatus("error");

      if (error instanceof Error && error.name === "AbortError") {
        setServerError(
          "The request took too long. Please check your connection before trying again.",
        );
      } else if (error instanceof TypeError) {
        setServerError(
          "Unable to connect. Please check your internet connection.",
        );
      } else {
        setServerError(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );
      }
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-transparent text-sm sm:text-base text-white placeholder:text-[#85858b] outline-none ${
      hasError ? "placeholder:text-red-400/60" : ""
    }`;

  const isFormReady =
    formData.name.trim().length > 0 &&
    formData.name.trim().length <= MAX_NAME_LENGTH &&
    isValidEmail(formData.email.trim()) &&
    formData.message.trim().length > 0 &&
    formData.message.trim().length <= MAX_MESSAGE_LENGTH &&
    status !== "sending";

  return (
    <>
      <footer className="relative isolate min-h-screen w-full overflow-visible bg-black flex justify-center items-center px-4 sm:px-[5vw] py-12 sm:py-[5vh] text-[#ccc] text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-[260px] w-[min(110vw,1100px)] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#0A84FF]/[0.055] blur-[150px]"
        />
        <div className="relative z-10 w-full max-w-[800px] flex flex-col items-center gap-6 sm:gap-8 px-3 sm:px-[2vw] py-8 sm:py-[3vh] rounded-[1.6vh] shadow-[0_0.4vh_3vh_rgba(0,0,0,0.1)]">
          <h1
            className="text-[clamp(1.7rem,2vw+1vh,3rem)] text-white tracking-[2px]"
            style={{
              fontFamily: '"Nunito", ui-rounded, system-ui, sans-serif',
              fontWeight: 900,
            }}
          >
            Let’s Connect
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#bbb] leading-relaxed max-w-[600px]">
            Feel free to reach out for collaborations or just a friendly hello!
          </p>

          {/* iMessage preview */}
          <div className="w-full max-w-[390px] flex flex-col gap-3 mt-2">
            <div className="flex flex-col items-start gap-1">
              <span className="text-[0.65rem] tracking-wider text-[#888] ml-3">
                KULJEET
              </span>

              <div className="max-w-[75%] rounded-[18px] rounded-bl-[5px] bg-[#303136] px-4 py-2.5 text-left shadow-lg">
                <p className="text-xs sm:text-sm text-white leading-relaxed">
                  Hey! Got something in mind? Let's talk.
                </p>
              </div>
            </div>

            <button
              ref={triggerRef}
              type="button"
              onClick={openChat}
              aria-label="Start a conversation with Kuljeet"
              className="group w-full min-h-[54px] flex items-center gap-3 rounded-full border border-white/10 bg-[#25262b]/90 px-4 py-2.5 text-left transition-all duration-300 hover:border-[#087df5]/60 hover:bg-[#303136] hover:shadow-[0_0_22px_rgba(8,125,245,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087df5]"
            >
              <span className="flex-1 flex items-center gap-1 text-sm text-[#888]">
                iMessage
                <span className="inline-block h-[17px] w-[1.5px] bg-[#60a5fa] animate-[cursorBlink_1s_steps(2,start)_infinite] motion-reduce:animate-none" />
              </span>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#087df5] text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1688ff]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 19V5" />
                  <path d="m5 12 7-7 7 7" />
                </svg>
              </span>
            </button>
          </div>

          {/* Social links */}
          <div className="flex gap-5 sm:gap-8 mt-2">
            <a
              href="mailto:kulj33tsingh@gmail.com"
              aria-label="Email Kuljeet"
              className="w-11 h-11 rounded-full bg-white/8 flex items-center justify-center transition-transform duration-200 hover:scale-110"
            >
              <img
                src="/icons/social/email.png"
                alt=""
                className="w-6 h-6 object-contain"
              />
            </a>

            <a
              href="https://github.com/kulj33t"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="w-11 h-11 rounded-full bg-white/8 flex items-center justify-center transition-transform duration-200 hover:scale-110"
            >
              <img
                src="/icons/social/github.png"
                alt=""
                className="w-6 h-6 object-contain"
              />
            </a>

            <a
              href="https://linkedin.com/in/kulj33t"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="w-11 h-11 rounded-full bg-white/8 flex items-center justify-center transition-transform duration-200 hover:scale-110"
            >
              <img
                src="/icons/social/linkedin.png"
                alt=""
                className="w-6 h-6 object-contain"
              />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-[#888] mt-2">
            © {new Date().getFullYear()} Kuljeet Singh
          </p>
        </div>
      </footer>

      {/* iMessage modal */}
      {isChatOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeChat();
            }
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
            className="relative flex flex-col w-full max-w-[460px] max-h-[calc(100dvh-24px)] sm:max-h-[min(760px,calc(100dvh-40px))] overflow-hidden rounded-[24px] border border-white/10 bg-[#17181c] shadow-[0_25px_100px_rgba(0,0,0,0.55)] animate-[chatAppear_0.25s_ease-out]"
          >
            {/* Chat header */}
            <div className="flex shrink-0 items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#202126]">
              <div className="flex items-center gap-3">
                {/* KS avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#414653] to-[#242832] text-white font-bold text-sm shadow-md">
                  KS
                </div>

                {/* Name and subtitle */}
                <div className="text-left">
                  <h2
                    id="chat-title"
                    className="text-white font-semibold text-sm sm:text-base"
                  >
                    Kuljeet Singh
                  </h2>
                  <p className="text-xs text-[#999]">
                    Let's start a conversation
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={closeChat}
                disabled={status === "sending"}
                aria-label="Close chat"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#aaa] transition-all hover:bg-white/10 hover:text-white hover:rotate-90 disabled:opacity-40"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="m18 6-12 12M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Conversation */}
            <div className="shrink-0 px-4 sm:px-6 pt-5 pb-3 space-y-4">
              <div className="text-center">
                <p className="text-[11px] text-[#777]">iMessage</p>
                <p className="text-[11px] text-[#777] mt-1">
                  Start a new conversation
                </p>
              </div>

              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-[20px] rounded-bl-[5px] bg-[#303136] px-4 py-3 text-left">
                  <p className="text-sm leading-relaxed text-white">
                    Hey there! 👋
                  </p>
                  <p className="text-sm leading-relaxed text-white mt-1">
                    Thanks for stopping by. I'd love to hear from you. What's on
                    your mind?
                  </p>
                </div>
              </div>
            </div>

            {/* Success state */}
            {status === "success" ? (
              <div className="flex-1 min-h-0 overflow-y-auto px-5 py-8 flex flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15 text-green-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-7 w-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-white">
                  Message sent!
                </h3>

                <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-[#999]">
                  Thanks for reaching out. I've received your message and will
                  get back to you soon.
                </p>

                <button
                  type="button"
                  onClick={closeChat}
                  className="mt-6 w-full max-w-[220px] rounded-full bg-[#087df5] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1688ff]"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Three iMessage-style input bubbles */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="min-h-0 flex-1 overflow-y-auto px-4 sm:px-6 py-5"
              >
                <div className="flex flex-col gap-4">
                  {/* Name bubble */}
                  <div className="flex justify-end">
                    <div className="w-[90%] sm:w-[85%] rounded-[20px] rounded-br-[5px] bg-[#303136] border border-white/5 px-5 py-4 text-left">
                      <label
                        htmlFor="contact-name"
                        className="block text-[10px] tracking-wider text-[#999] mb-2"
                      >
                        YOUR NAME
                      </label>

                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        maxLength={MAX_NAME_LENGTH}
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="What's your name?"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                        className={inputClass(Boolean(errors.name))}
                      />

                      {errors.name && (
                        <p
                          id="name-error"
                          className="mt-2 text-xs text-red-400"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email bubble */}
                  <div className="flex justify-end">
                    <div className="w-[90%] sm:w-[85%] rounded-[20px] rounded-br-[5px] bg-[#303136] border border-white/5 px-5 py-4 text-left">
                      <label
                        htmlFor="contact-email"
                        className="block text-[10px] tracking-wider text-[#999] mb-2"
                      >
                        EMAIL ADDRESS
                      </label>

                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        maxLength={MAX_EMAIL_LENGTH}
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className={inputClass(Boolean(errors.email))}
                      />

                      {errors.email && (
                        <p
                          id="email-error"
                          className="mt-2 text-xs text-red-400"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message composer */}
                  <div className="flex justify-end">
                    <div className="w-full rounded-[24px] border border-white/10 bg-[#25262b] px-4 py-3 transition-colors focus-within:border-[#087df5]/70">
                      <label htmlFor="contact-message" className="sr-only">
                        Your message
                      </label>

                      <textarea
                        id="contact-message"
                        name="message"
                        rows={3}
                        maxLength={MAX_MESSAGE_LENGTH}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="iMessage..."
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={
                          errors.message ? "message-error" : "message-count"
                        }
                        className="w-full min-h-[90px] resize-y bg-transparent text-sm sm:text-base text-white placeholder:text-[#85858b] outline-none"
                      />

                      <div className="flex items-center justify-between gap-3 pt-2">
                        <div className="text-left">
                          {errors.message ? (
                            <p
                              id="message-error"
                              className="text-xs text-red-400"
                            >
                              {errors.message}
                            </p>
                          ) : (
                            <span
                              id="message-count"
                              className="text-[11px] text-[#777]"
                            >
                              {formData.message.length}/5000
                            </span>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={!isFormReady}
                          aria-label="Send message"
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                            isFormReady
                              ? "bg-[#087df5] text-white hover:bg-[#1688ff] hover:scale-105 active:scale-95 cursor-pointer"
                              : "bg-[#45464b] text-[#888] opacity-50 cursor-not-allowed"
                          }`}
                        >
                          {status === "sending" ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-5 w-5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 2 11 13" />
                              <path d="m22 2-7 20-4-9-9-4Z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Honeypot spam protection */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  {serverError && (
                    <p
                      role="alert"
                      className="text-center text-xs leading-relaxed text-red-400"
                    >
                      {serverError}
                    </p>
                  )}

                  <p className="text-center text-[11px] text-[#777]">
                    Usually replies within a few days.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes cursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes chatAppear {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
