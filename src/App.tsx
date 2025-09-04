import React from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ResumeBtn from "./components/ReumeBtn";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="fixed-background">
        <Background />
      </div>

      <main>
        <Header />
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <About/>
        </section>

        <section id="Tech">
          <Skills/>
        </section>

        <section id="Project">
          <Projects/>
        </section>

        <section id="footer">
          <Footer/>
        </section>

          <ResumeBtn/>
      </main>
    </div>
  );
};

export default App;
