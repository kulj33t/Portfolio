import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ResumeBtn from "./components/ReumeBtn";
import DotFiles from "./pages/DotFiles";
import ResumePage from "./pages/ResumePage";
import "./App.css";

const Home: React.FC = () => (
  <>
    <Header />
    <section id="hero" className="relative bg-black">
      <Hero />
    </section>

    <section id="about" className="relative bg-black">
      <About />
    </section>

    <section id="Tech" className="relative bg-black">
      <Skills />
    </section>

    <section id="Project" className="relative bg-black">
      <Projects />
    </section>

    <section id="footer" className="relative bg-black">
      <Footer />
    </section>

    <ResumeBtn />
  </>
);

const App: React.FC = () => {
  return (
    <div className="app-container min-h-screen bg-black">
      <main className="min-h-screen bg-black">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dotFiles" element={<DotFiles />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
};

export default App;
