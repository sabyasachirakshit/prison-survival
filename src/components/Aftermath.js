import React from "react";

function Aftermath() {
  const aftermath = "ss";
  const handleContinue = () => {
    console.log("Continue");
  };
  return (
    <div className="aftermath" style={{ marginTop: 50, textAlign: "center" }}>
      <h3>{aftermath}</h3>
      <button
        style={{ marginTop: 20, padding: "10px", cursor: "pointer" }}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}

export default Aftermath;
