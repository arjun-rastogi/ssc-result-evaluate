import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Fetch the results from the server when the component mounts
    axios
      .get("https://ssc-result-api.onrender.com/fetch-results")
      .then((res) => setResults(res.data));
  }, []);

  return (
    <div className="App">
      {results ? (
        <div>
          <p>Attempted: {results.Attempted}</p>
          <p>Right Answers: {results["Right Answers"]}</p>
          <p>Wrong Answers: {results["Wrong Answers"]}</p>
          <p>Marks: {results.Marks}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
