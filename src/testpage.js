import React, { useState } from "react";
import backgroundImage from "./tbackground.jpg"; // Adjust the path as per your project structure

function TestPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for the loading spinner

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsLoading(true); // Show spinner while uploading

    try {
      const response = await fetch("http://localhost:8000/api/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      if (result.error) {
        setPrediction(`Error: ${result.error}`);
      } else {
        if (typeof result.prediction === "object") {
          const formattedPrediction = `
            Prediction: ${result.prediction.prediction}
            Probability: ${(result.prediction.probability * 100).toFixed(2)}%
          `;
          setPrediction(formattedPrediction);
        } else {
          setPrediction(`Prediction: ${result.prediction}`);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setPrediction("Failed to upload file. Please try again.");
    } finally {
      setIsLoading(false); // Hide spinner after completion
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          width: "80%",
          maxWidth: "500px",
        }}
      >
        <h1 style={{ marginBottom: "20px", fontSize: "2rem", fontWeight: "bold" }}>
          Audio Prediction
        </h1>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleUpload}
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Upload and Predict
        </button>
        {isLoading && (
          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                border: "4px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                borderTop: "4px solid #fff",
                width: "30px",
                height: "30px",
                animation: "spin 1s linear infinite",
                margin: "0 auto",
              }}
            ></div>
            <style>
              {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              `}
            </style>
            <p style={{ color: "#fff", marginTop: "10px" }}>Processing...</p>
          </div>
        )}
        {!isLoading && prediction && (
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "10px",
              borderRadius: "5px",
              color: "#333",
              textAlign: "left",
              fontFamily: "Courier New, monospace",
            }}
          >
            <h3 style={{ marginBottom: "10px", fontSize: "1.2rem", color: "#000" }}>
              Prediction Result:
            </h3>
            <pre style={{ margin: "0", overflowX: "auto", whiteSpace: "pre-wrap" }}>
              {prediction}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestPage;
