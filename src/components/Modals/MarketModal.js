// MarketModal.js
import React from "react";
import { Modal, Tabs, Button } from "antd";
// Adjust imports for item images
import BreadImage from "../../media/inventory/bread.png";
import CigarretesImage from "../../media/inventory/cigarettes.png";
import SweetsImage from "../../media/inventory/sweets.jpg";
import WeedImage from "../../media/inventory/weed.png";
import MoonshineImage from "../../media/inventory/moonshine.png";
import PillsImage from "../../media/inventory/pills.png";
import ExchangeLogo from "../../media/exchange.png";
import ShankImage from "../../media/inventory/shank.jpg";
import CocaineImage from "../../media/inventory/cocaine.png";
import ParacetemolImage from "../../media/inventory/paracetemol.png";
import HealingSyrupImage from "../../media/inventory/syrup.png";
import CanofMeatImage from "../../media/inventory/can-of-meat.jpg";
import ChipsImage from "../../media/inventory/chips.jpg";
import PackofTeaImage from "../../media/inventory/packoftea.png";
import CoinImage from "../../media/coin.png";
const { TabPane } = Tabs;

const MarketModal = ({
  fetchMarketItems,
  refreshProfile,
  baseURL,
  marketModalVisible,
  setMarketModalVisible,
  marketItems,
  tradeItems,
  handleTradeExchange,
  profile,
  profile_id,
  hasSufficientItems,
}) => {
  const itemImages = {
    Bread: BreadImage,
    Pills: PillsImage,
    Sweets: SweetsImage,
    Aspirine: PillsImage,
    "Healing Syrup": HealingSyrupImage,
    "Can of Meat": CanofMeatImage,
    "Pack of Tea": PackofTeaImage,
    Cigarettes: CigarretesImage,
    Chips: ChipsImage,
    Paracetemol: ParacetemolImage,
    Volga: CigarretesImage,
    Weed: WeedImage,
    Rocket: CigarretesImage,
    Cocaine: CocaineImage,
    Moonshine: MoonshineImage,
    Shank: ShankImage,
  };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
      alert("An error occurred during the purchase.");
    }
  };
  return (
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
        {/* Market Items Tab */}
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

        {/* Trade Goods Tab */}
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
                          flexDirection: "column",
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
                        src={
                          typeof item.name === "number"
                            ? CoinImage
                            : itemImages[item.name]
                        }
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
  );
};

export default MarketModal;
