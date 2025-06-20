import React, { useState, useEffect } from "react";
import axios from "axios";

const Predict = () => {
  const [step, setStep] = useState(1);
  const [inputData, setInputData] = useState({
    white_elo: "",
    black_elo: "",
    white_title: "",
    black_title: "",
    eco: "",
    opening: "",
    white_material: "",
    black_material: "",
    material_balance: "",
    num_moves: "",
    num_captures: "",
    num_checks: "",
    castling_white: "",
    castling_black: "",
    termination: "",
    eval_score: "",
  });

  const [output, setOutput] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-calculate material balance
  useEffect(() => {
    const wm = Number(inputData.white_material);
    const bm = Number(inputData.black_material);
    if (!isNaN(wm) && !isNaN(bm)) {
      setInputData((prev) => ({
        ...prev,
        material_balance: wm - bm,
      }));
    }
  }, [inputData.white_material, inputData.black_material]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setOutput(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("deepmate_token");
      const userId = "684c1f925ad8aa117259d121"; // hardcoded temporarily

      const res = await axios.post(
        "http://localhost:3000/api/predictions",
        { userId, ...inputData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOutput(res.data.data.predictionOutput);
      setMessage("Prediction successful!");
    } catch (error) {
      console.error("Prediction error:", error);
      setMessage(error.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <main className="max-w-3xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
        Predict Chess Outcome
      </h2>

      {message && (
        <p
          className={`text-center mb-4 ${
            output ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Step 1: Player Info */}
        {step === 1 && (
          <>
            <Input
              name="white_elo"
              label="White Elo"
              value={inputData.white_elo}
              onChange={handleChange}
            />
            <Input
              name="black_elo"
              label="Black Elo"
              value={inputData.black_elo}
              onChange={handleChange}
            />
            <Input
              name="white_title"
              label="White Title"
              value={inputData.white_title}
              onChange={handleChange}
            />
            <Input
              name="black_title"
              label="Black Title"
              value={inputData.black_title}
              onChange={handleChange}
            />
          </>
        )}

        {/* Step 2: Opening & Material */}
        {step === 2 && (
          <>
            <Input
              name="eco"
              label="ECO Code"
              value={inputData.eco}
              onChange={handleChange}
            />
            <Input
              name="opening"
              label="Opening Name"
              value={inputData.opening}
              onChange={handleChange}
            />
            <Input
              name="white_material"
              label="White Material"
              value={inputData.white_material}
              onChange={handleChange}
            />
            <Input
              name="black_material"
              label="Black Material"
              value={inputData.black_material}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500">
              Material Balance: {inputData.material_balance}
            </p>
          </>
        )}

        {/* Step 3: Game Stats */}
        {step === 3 && (
          <>
            <Input
              name="num_moves"
              label="Number of Moves"
              value={inputData.num_moves}
              onChange={handleChange}
            />
            <Input
              name="num_captures"
              label="Number of Captures"
              value={inputData.num_captures}
              onChange={handleChange}
            />
            <Input
              name="num_checks"
              label="Number of Checks"
              value={inputData.num_checks}
              onChange={handleChange}
            />
            <Input
              name="castling_white"
              label="White Castled (true/false)"
              value={inputData.castling_white}
              onChange={handleChange}
            />
            <Input
              name="castling_black"
              label="Black Castled (true/false)"
              value={inputData.castling_black}
              onChange={handleChange}
            />
            <Input
              name="termination"
              label="Termination Type"
              value={inputData.termination}
              onChange={handleChange}
            />
            <Input
              name="eval_score"
              label="Evaluation Score"
              value={inputData.eval_score}
              onChange={handleChange}
            />
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="text-blue-600 hover:underline"
            >
              ← Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto text-blue-600 hover:underline"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="ml-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {loading ? "Predicting..." : "Predict"}
            </button>
          )}
        </div>
      </form>

      {/* Prediction Output */}
      {output && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold mb-3">
            Prediction Probabilities:
          </h3>
          <div className="flex justify-center space-x-4">
            {Object.entries(output.prediction_proba || output).map(
              ([label, prob]) => (
                <div
                  key={label}
                  className="bg-gray-100 px-4 py-2 rounded shadow text-sm font-medium"
                >
                  {label}: {(prob * 100).toFixed(2)}%
                </div>
              )
            )}
          </div>
        </div>
      )}
    </main>
  );
};

// Reusable Text Input Component
const Input = ({ name, label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full p-2 border border-gray-300 rounded-md"
    />
  </div>
);

export default Predict;
