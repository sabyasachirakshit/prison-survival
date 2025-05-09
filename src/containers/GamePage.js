import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinImage from "../media/coin.png";
import KarmaImage from "../media/karma.png";
import PrisonImage from "../media/prison/prison.webp";
import InventoryImage from "../media/inventory.jpg";
import CaseFilesIcon from "../media/case_files.png";
import MarketIcon from "../media/market_icon.png";
import CaseFilesModal from "../components/Modals/CaseFilesModal";
import InventoryModal from "../components/Modals/InventoryModal";
import { Modal, Button, message, Tabs } from "antd";
import BreadImage from "../media/inventory/bread.png";
import CigarretesImage from "../media/inventory/cigarettes.png";
import SweetsImage from "../media/inventory/sweets.jpg";
import WeedImage from "../media/inventory/weed.png";
import MoonshineImage from "../media/inventory/moonshine.png";
import PillsImage from "../media/inventory/pills.png";
import ExchangeLogo from "../media/exchange.png";
import ShankImage from "../media/inventory/shank.jpg";
import CocaineImage from "../media/inventory/cocaine.png"
import ParacetemolImage from "../media/inventory/paracetemol.png"
import HealingSyrupImage from "../media/inventory/syrup.png"
import CanofMeatImage from "../media/inventory/can-of-meat.jpg"
import ChipsImage from "../media/inventory/chips.jpg"
import PackofTeaImage from "../media/inventory/packoftea.png"

const { TabPane } = Tabs;
function GamePage() {
  const itemImages = {
    Bread: BreadImage,
    Pills: PillsImage,
    Sweets: SweetsImage,
    Aspirine: PillsImage,
    "Healing Syrup":HealingSyrupImage,
    "Can of Meat":CanofMeatImage,
    "Pack of Tea": PackofTeaImage,
    Cigarettes: CigarretesImage,
    Chips:ChipsImage,
    Paracetemol:ParacetemolImage,
    Volga:CigarretesImage,
    Weed: WeedImage,
    Rocket:CigarretesImage,
    Cocaine:CocaineImage,
    Moonshine: MoonshineImage,
    Shank: ShankImage,
  };
  const { profile_id } = useParams(); // Get profile_id from the URL
  const [profile, setProfile] = useState(null);
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
          console.log(data);
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
          alert("Market has new items")
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
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleBuyItem = async (item) => {
    try {
      const response = await fetch(
        `http://${baseURL}:5000/api/market/buy/${profile_id}/${item.market_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Purchase failed. Insufficient coins.");
        return;
      }

      await sleep(100); // Add a small delay if needed
      fetchMarketItems();
      refreshProfile();
    } catch (error) {
      console.error("Error purchasing item:", error);
      message.error("An error occurred during the purchase.");
    }
  };

  function hasSufficientItems(exchange, profile) {
    if (Array.isArray(exchange)) {
      // Check if inventory contains all items in the exchange array
      return exchange.every((item) => profile.inventory.includes(item));
    } else if (typeof exchange === "number") {
      // Handle numeric exchange (e.g., coins)
      return profile.coins >= exchange; // Assuming 'coins' is part of inventory
    }
    return false;
  }

  const handleTradeExchange = async (profile_id, trade_id) => {
    try {
      const response = await fetch(
        `http://${baseURL}:5000/api/trade/${profile_id}/${trade_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Trade failed");
        return;
      }

      await sleep(100); // Add a small delay if needed
      fetchTradeItems();
      refreshProfile();
    } catch (error) {
      console.error("Error trading items:", error);
      message.error("An error occurred during the trade.");
    }
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
              <div
                className="lower"
                style={{ display: "flex", gap: 100, marginTop: 200 }}
              >
                <div
                  className="inventory"
                  onClick={handleInventoryClick}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={InventoryImage}
                    alt="Inventory"
                    width={50}
                    height={50}
                  />
                </div>
                
                <div
                  className="market"
                  onClick={() => setMarketModalVisible(true)}
                >
                  <img
                    src={MarketIcon}
                    alt="Market"
                    width={50}
                    height={57}
                    style={{ position: "relative", top: -7 }}
                  />
                </div>
                <div className="case-files" onClick={handleCaseFilesClick}>
                  <img
                    src={CaseFilesIcon}
                    alt="Case Files"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
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
      <Modal
        title="Market"
        visible={marketModalVisible}
        onCancel={() => setMarketModalVisible(false)}
        footer={null}
        bodyStyle={{
          maxHeight: "400px",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <Tabs defaultActiveKey="1">
          {/* Tab for Market Items */}
          <TabPane tab="Market Items" key="1">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
              }}
            >
              {marketItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    padding: "10px",
                    textAlign: "center",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <img
                    src={itemImages[item.name]}
                    alt={item.name}
                    width={50}
                    height={50}
                  />
                  <div>{item.name}</div>
                  <div>
                    Price: {item.price}{" "}
                    <img
                      style={{ position: "relative", top: 5 }}
                      src={CoinImage}
                      alt={item.name}
                      width={21}
                      height={21}
                    />
                  </div>
                  <Button
                    type="primary"
                    onClick={() => handleBuyItem(item)}
                    style={{ marginTop: 10, padding: "5px", cursor: "pointer" }}
                  >
                    Buy
                  </Button>
                </div>
              ))}
            </div>
          </TabPane>

          {/* Tab for Trade Goods */}
          <TabPane tab="Trade Goods" key="2">
            {tradeItems &&
              tradeItems.map((item, index) => {
                const canTrade = hasSufficientItems(item.exchange, profile);

                return (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      padding: "10px",
                      display: "flex",
                      
                      alignItems: "center",
                      backgroundColor: "#f9f9f9",
                      marginBottom: "10px",
                    }}
                  >
                    {Array.isArray(item.name) ? (
                      item.name.map((name, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection:"column",
                            marginBottom: "5px",
                          }}
                        >
                          <img
                            src={itemImages[name]}
                            alt={name}
                            width={50}
                            height={50}
                            style={{ marginRight: "10px" }}
                          />
                          <div style={{ fontWeight: "bold" }}>{name}</div>
                        </div>
                      ))
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={typeof item.name === "number" ? CoinImage : itemImages[item.name]}
                          alt={item.name}
                          width={50}
                          height={50}
                          style={{ marginRight: "10px" }}
                        />
                        <div style={{ fontWeight: "bold" }}>{item.name}</div>
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src={ExchangeLogo} // Replace with the actual exchange logo path
                        alt="Exchange Logo"
                        width={30}
                        height={30}
                        style={{ marginRight: "10px" }}
                      />
                      <div style={{ textAlign: "left" }}>
                        {Array.isArray(item.exchange) ? (
                          <div>
                            {item.exchange.map((exchangeItem, idx) => (
                              <span key={idx} style={{ display: "block" }}>
                                {exchangeItem}{" "}
                                {itemImages[exchangeItem] && (
                                  <img
                                    src={itemImages[exchangeItem]}
                                    alt={exchangeItem}
                                    width={20}
                                    height={20}
                                    style={{ marginLeft: "5px" }}
                                  />
                                )}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div>
                            {item.exchange}{" "}
                            <img
                              style={{ position: "relative", top: 5 }}
                              src={CoinImage}
                              alt="Coins"
                              width={21}
                              height={21}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      type="primary"
                      disabled={!canTrade}
                      onClick={() => {
                        handleTradeExchange(profile_id, item.trade_id);
                      }}
                      style={{
                        marginTop: 10,
                        padding: "5px",
                        cursor: canTrade ? "pointer" : "not-allowed",
                      }}
                    >
                      {canTrade ? "Trade" : "Cannot Trade"}
                    </Button>
                  </div>
                );
              })}
          </TabPane>
        </Tabs>
      </Modal>
      ;
    </div>
  );
}

export default GamePage;
