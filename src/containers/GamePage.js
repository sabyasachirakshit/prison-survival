import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinImage from "../media/coin.png";
import KarmaImage from "../media/karma.png";
import PrisonImage from "../media/prison/prison.webp";
import InventoryImage from "../media/inventory.jpg";
import CaseFilesIcon from "../media/case_files.png";
import MarketIcon from "../media/market_icon.png";
import StashIcon from "../media/stash.jpg";

function GamePage() {
  const { profile_id } = useParams(); // Get profile_id from the URL
  const [profile, setProfile] = useState(null);
  const [showScenario, setShowScenario] = useState(false); // State to toggle scenario UI

  useEffect(() => {
    // Fetch profile data from backend
    fetch(`http://192.168.0.103:5000/api/profiles/${profile_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          setProfile(data); // Set the profile data in state
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [profile_id]);

  const handleServeSentence = () => {
    setShowScenario(true); // Show the scenario and hide the images
  };

  return (
    <div
      style={{
        backgroundImage: `url(${PrisonImage})`, // Set the background image
        backgroundSize: "cover", // Ensure the image covers the whole screen
        backgroundPosition: "center", // Center the background image
        minHeight: "100vh", // Make sure the div takes up the full height of the viewport
        padding: "20px", // Add some padding to the content
      }}
    >
      {profile ? (
        <div className="game" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="profile-stats" style={{ display: "flex", gap: 20 }}>
            <div className="coin-data" style={{ display: "flex", backgroundColor: "white" }}>
              <img src={CoinImage} alt="Coin" width={30} height={30} />
              <div style={{ position: "relative", top: 5 }}>
                <b>{profile.coins}</b>
              </div>
            </div>

            <div className="karma-data" style={{ display: "flex", backgroundColor: "white" }}>
              <img src={KarmaImage} alt="Karma" width={30} height={30} />
              <div style={{ position: "relative", top: 5 }}>
                <b>{profile.karma}</b>
              </div>
            </div>
          </div>

          <div
            className="serve-button"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              position: "relative",
              marginTop: 220,
            }}
          >
            <button style={{ width: "50%" }} onClick={handleServeSentence}>
              Serve Sentence
            </button>
          </div>

          {!showScenario ? (
            <div className="lower" style={{ display: "flex", gap: 50, marginTop: 200 }}>
              <div className="inventory">
                <img src={InventoryImage} alt="Inventory" width={50} height={50} />
              </div>
              <div className="inventory">
                <img
                  src={StashIcon}
                  alt="Stash"
                  width={50}
                  height={55}
                  style={{ position: "relative", top: -7 }}
                />
              </div>
              <div className="inventory">
                <img
                  src={MarketIcon}
                  alt="Market"
                  width={50}
                  height={57}
                  style={{ position: "relative", top: -7 }}
                />
              </div>
              <div className="inventory">
                <img src={CaseFilesIcon} alt="Case Files" width={50} height={50} />
              </div>
            </div>
          ) : (
            <div className="scenario" style={{ marginTop: 50, textAlign: "center" }}>
              <h3 style={{color:"white"}}>A guard catches you trying to sneak a note. What do you do?</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
                <button style={{ padding: "10px", cursor: "pointer" }}>
                  Apologize and claim it was a misunderstanding
                </button>
                <button style={{ padding: "10px", cursor: "pointer" }}>
                  Bribe the guard with some coins
                </button>
                <button style={{ padding: "10px", cursor: "pointer" }}>
                  Attack the guard to escape
                </button>
                <button style={{ padding: "10px", cursor: "pointer" }}>
                  Stay silent and accept punishment
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Profile not available for id {profile_id}</p>
      )}
    </div>
  );
}

export default GamePage;
