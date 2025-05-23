import React from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import EduExp from "./components/EduExp";
import Tech from "./components/Tech";
import Projects from "./components/Projects";
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

        <section id="EduExp">
          <EduExp/>
        </section>

        <section id="Tech">
          <Tech/>
        </section>

        <section id="Project">
          <Projects/>
        </section>

        <section id="footer">
          <Footer/>
        </section>
      </main>
    </div>
  );
};

export default App;
