import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinImage from "../media/coin.png";
import KarmaImage from "../media/karma.png";
import PrisonImage from "../media/prison/prison.webp";
import CaseFilesModal from "../components/Modals/CaseFilesModal";
import InventoryModal from "../components/Modals/InventoryModal";
import MarketModal from "../components/Modals/MarketModal";
import LowerComponents from "../components/LowerComponents";
function GamePage() {
  const { profile_id } = useParams(); // Get profile_id from the URL
  const [profile, setProfile] = useState(null);
  const [newPrisoner,setNewPrisoner]=useState(false);
  const [showScenario, setShowScenario] = useState(false); // State to toggle scenario UI
  const [aftermath, setAftermath] = useState(null); // State to show aftermath text
  const [isInventoryModalVisible, setIsInventoryModalVisible] = useState(false); // State for modal visibility
  const [caseFilesVisible, setCaseFilesVisible] = useState(false); // State for case files visibility
  const [marketItems, setMarketItems] = useState([]); // State for market items
  const [marketModalVisible, setMarketModalVisible] = useState(false); // State for market modal visibility
  const [tradeItems, setTradeItems] = useState([]); // State for trade items
  const baseURL = process.env.REACT_APP_LOCAL_IP;

  useEffect(() => {
    // Fetch profile data from backend
    fetch(`http://${baseURL}:5000/api/profiles/${profile_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          setProfile(data); // Set the profile data in state
          if(data.jail_days===0 && data.jail_months===0 && data.jail_years==0){
            setNewPrisoner(true);
            console.log("New prisoner");
          }
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));

    // Fetch market items from backend
    fetch(`http://${baseURL}:5000/api/market`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          setMarketItems(data);
        }
      })
      .catch((error) => console.error("Error fetching market items:", error));

    fetch(`http://${baseURL}:5000/api/trade`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          setTradeItems(data);
        }
      })
      .catch((error) => console.error("Error fetching trade items:", error));
  }, [profile_id, baseURL]);

  const refreshProfile = () => {
    // Fetch profile data from backend
    fetch(`http://${baseURL}:5000/api/profiles/${profile_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          setProfile(data); // Set the profile data in state
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  };

  const fetchMarketItems = () => {
    fetch(`http://${baseURL}:5000/api/market`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          setMarketItems(data);
        }
      })
      .catch((error) => console.error("Error fetching market items:", error));
  };

  const fetchTradeItems = () => {
    fetch(`http://${baseURL}:5000/api/trade`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          setTradeItems(data);
        }
      })
      .catch((error) => console.error("Error fetching trade items:", error));
  };

  const refreshMarketItems = () => {
    // Fetch market items from backend
    fetch(`http://${baseURL}:5000/api/refresh_market`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          alert("Market has new items");
          setMarketItems(data); // Set the market items in state
        }
      })
      .catch((error) => console.error("Error fetching market items:", error));
  };

  const refreshTradeItems = () => {
    // Fetch market items from backend
    fetch(`http://${baseURL}:5000/api/refresh_trade`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          setTradeItems(data); // Set the market items in state
        }
      })
      .catch((error) => console.error("Error fetching market items:", error));
  };

  const handleServeSentence = () => {
    setShowScenario(true); // Show the scenario and hide the images
  };

  const handleOptionClick = (option) => {
    // Handle aftermath based on the option chosen
    const aftermathMessages = {
      apologize: "The guard accepts your apology but keeps an eye on you.",
      bribe: "The guard takes your coins and lets you off the hook.",
      attack:
        "You manage to knock out the guard but now have more guards chasing you!",
      silent: "The guard punishes you, but you stay strong.",
    };
    setAftermath(aftermathMessages[option]); // Set aftermath message
  };

  const handleContinue = () => {
    setShowScenario(false); // Go back to the original UI
    setAftermath(null); // Reset aftermath state
  };

  const handleInventoryClick = () => {
    refreshProfile(); // Refresh profile data
    setIsInventoryModalVisible(true); // Show inventory modal
  };

  const handleCaseFilesClick = () => {
    refreshProfile(); // Refresh profile data
    setCaseFilesVisible(true); // Show case files modal
  };

  const handleModalClose = () => {
    setIsInventoryModalVisible(false); // Hide inventory modal
  };

  const handleCaseFilesClose = () => {
    setCaseFilesVisible(false); // Hide case files modal
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
        <div
          className="game"
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div className="profile-stats" style={{ display: "flex", gap: 20 }}>
            <div
              className="coin-data"
              style={{ display: "flex", backgroundColor: "white" }}
            >
              <img src={CoinImage} alt="Coin" width={30} height={30} />
              <div style={{ position: "relative", top: 5 }}>
                <b>{profile.coins}</b>
              </div>
            </div>

            <div
              className="karma-data"
              style={{ display: "flex", backgroundColor: "white" }}
            >
              <img src={KarmaImage} alt="Karma" width={30} height={30} />
              <div style={{ position: "relative", top: 5 }}>
                <b>{profile.karma}</b>
              </div>
            </div>

            <button onClick={refreshMarketItems}>Refresh market</button>
            <button onClick={refreshTradeItems}>Refresh Trade </button>
          </div>

          {!showScenario ? (
            <>
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
                <button
                  style={{
                    width: "50%",
                    height: 50,
                    borderRadius: 4,
                    backgroundColor: "#6174fc",
                    color: "white",
                  }}
                  onClick={handleServeSentence}
                >
                  <h4>Serve Sentence</h4>
                </button>
              </div>
              <LowerComponents
                handleInventoryClick={handleInventoryClick}
                setMarketModalVisible={setMarketModalVisible}
                handleCaseFilesClick={handleCaseFilesClick}
              />
            </>
          ) : aftermath ? (
            <div
              className="aftermath"
              style={{ marginTop: 50, textAlign: "center" }}
            >
              <h3>{aftermath}</h3>
              <button
                style={{ marginTop: 20, padding: "10px", cursor: "pointer" }}
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          ) : (
            <div
              className="scenario"
              style={{ marginTop: 50, textAlign: "center" }}
            >
              <h3>
                A guard catches you trying to sneak a note. What do you do?
              </h3>
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
          )}
        </div>
      ) : (
        <p>Profile not available for id {profile_id}</p>
      )}
      {/* Inventory & stash Modal */}
      <InventoryModal
        refreshProfile={refreshProfile}
        isInventoryModalVisible={isInventoryModalVisible}
        handleModalClose={handleModalClose}
        profile={profile}
      />
      {/* Case files Modal */}
      <CaseFilesModal
        caseFilesVisible={caseFilesVisible}
        handleCaseFilesClose={handleCaseFilesClose}
        profile={profile}
      />
      {/* Market Modal */}
      <MarketModal
        fetchMarketItems={fetchMarketItems}
        baseURL={baseURL}
        refreshProfile={refreshProfile}
        marketModalVisible={marketModalVisible}
        setMarketModalVisible={setMarketModalVisible}
        marketItems={marketItems}
        fetchTradeItems={fetchTradeItems}
        tradeItems={tradeItems}
        profile={profile}
        profile_id={profile_id}
        
      />
      ;
    </div>
  );
}

export default GamePage;
