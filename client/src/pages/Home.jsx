import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to DeepMate</h1>
          <p className="text-xl mb-8">
            Your smart chess assistant — Predict outcomes. Analyze games.
            Improve faster.
          </p>
          <Link
            to="/predict"
            className="bg-white text-indigo-600 px-6 py-3 font-semibold rounded-full shadow hover:bg-gray-200 transition"
          >
            Try Prediction Now
          </Link>
        </div>
      </div>

      {/* How it Works */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How DeepMate Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Input Game Stats</h3>
              <p>
                Enter details like Elo ratings, material count, castling status,
                and more.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                AI Model Prediction
              </h3>
              <p>
                Our trained ML model instantly predicts win/draw/loss
                probabilities.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                Improve Strategically
              </h3>
              <p>
                Use insights to analyze your strategy and improve your chess
                gameplay.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
