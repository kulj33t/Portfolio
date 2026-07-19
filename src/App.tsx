import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Background from "./components/Background";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ResumeBtn from "./components/ReumeBtn";
import DotFiles from "./pages/DotFiles"; 
import "./App.css";

const Home: React.FC = () => (
  <>
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
  </>
);

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="fixed-background">
        <Background />
      </div>

      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dotFiles" element={<DotFiles />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
};

export default App;