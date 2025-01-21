import React from "react";

function Scenario() {

    const handleOptionClick = (option) => {
       console.log(option)
      };

  return (
    <div className="scenario" style={{ marginTop: 50, textAlign: "center" }}>
      <h3>A guard catches you trying to sneak a note. What do you do?</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 20,
        }}
      >
        <button
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() => handleOptionClick("apologize")}
        >
          Apologize and claim it was a misunderstanding
        </button>
        <button
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() => handleOptionClick("bribe")}
        >
          Bribe the guard with some coins
        </button>
        <button
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() => handleOptionClick("attack")}
        >
          Attack the guard to escape
        </button>
        <button
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() => handleOptionClick("silent")}
        >
          Stay silent and accept punishment
        </button>
      </div>
    </div>
  );
}

export default Scenario;
