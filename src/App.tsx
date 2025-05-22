import React from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="fixed-background">
        <Background />
      </div>

      <main>
        <section className="hero-section">
          <Header />
        </section>

        <section className="section">
          <h2>Experience Section (Coming Soon)</h2>
        </section>

        <section className="footer">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default App;