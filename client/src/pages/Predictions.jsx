import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("deepmate_token");
      const res = await axios.get("http://localhost:3000/api/predictions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPredictions(res.data.data);
      setMessage(res.data.message);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setMessage("Failed to load predictions.");
    }
    setLoading(false);
  };

  const getTopOutput = (output) => {
    if (
      !output ||
      typeof output !== "object" ||
      !output.prediction ||
      !output.prediction_proba
    ) {
      return <span className="text-gray-400">N/A</span>;
    }

    const label =
      output.prediction.charAt(0).toUpperCase() +
      output.prediction.slice(1).toLowerCase();

    const prob =
      output.prediction_proba[output.prediction.toLowerCase()] ?? null;

    const color =
      label === "White"
        ? "bg-blue-100 text-blue-700"
        : label === "Black"
        ? "bg-red-100 text-red-700"
        : label === "Draw"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-100 text-gray-700";

    return (
      <span
        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${color}`}
      >
        {label} {prob ? `(${(prob * 100).toFixed(1)}%)` : ""}
      </span>
    );
  };

  const renderInputSummary = (prediction) => {
    const input = prediction.predictionInput || {};
    const entries = Object.entries(input).slice(0, 3);
    return (
      <div
        className="text-xs text-gray-600 space-y-1 cursor-pointer"
        onClick={() => setModalData(prediction)}
        title="Click to view full input"
      >
        {entries.map(([key, val]) => (
          <div key={key}>
            <span className="font-medium capitalize">
              {key.replace(/_/g, " ")}:
            </span>{" "}
            {String(val)}
          </div>
        ))}
        {Object.entries(input).length > 3 && (
          <div className="text-gray-400 italic">...click to view more</div>
        )}
      </div>
    );
  };

  return (
    <main className="max-w-6xl mx-auto mt-12 relative">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Predictions</h2>
            <p className="text-sm text-gray-500">
              A list of all your prediction attempts and results.
            </p>
          </div>
          <Link
            to="/predict"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            + New Prediction
          </Link>
        </div>

        {loading ? (
          <p className="text-center py-4 text-gray-500">Loading...</p>
        ) : predictions.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No predictions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Input Summary
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Top Prediction
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {predictions.map((pred, index) => (
                  <tr key={pred._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {new Date(pred.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{renderInputSummary(pred)}</td>
                    <td className="px-4 py-2 text-sm font-medium">
                      {getTopOutput(pred.predictionOutput)}
                    </td>
                    <td className="px-4 py-2 text-sm capitalize text-indigo-600">
                      {pred.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setModalData(null)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              Prediction Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-600 mb-2">
                  🧠 Prediction Input
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {Object.entries(modalData.predictionInput).map(
                    ([key, val]) => (
                      <li key={key}>
                        <strong className="capitalize">
                          {key.replace(/_/g, " ")}:
                        </strong>{" "}
                        {String(val)}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-600 mb-2">
                  📊 Prediction Output
                </h4>
                <div className="mb-3">
                  {getTopOutput(modalData.predictionOutput)}
                </div>
                <div className="text-sm space-y-1 text-gray-700">
                  {Object.entries(
                    modalData.predictionOutput.prediction_proba || {}
                  ).map(([label, prob]) => (
                    <div key={label}>
                      <strong className="capitalize">{label}:</strong>{" "}
                      {(prob * 100).toFixed(2)}%
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Predictions;
