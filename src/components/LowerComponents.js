import React from "react";
import InventoryImage from "../media/inventory.jpg";
import CaseFilesIcon from "../media/case_files.png";
import MarketIcon from "../media/market_icon.png";
const LowerComponents = ({ handleInventoryClick, setMarketModalVisible, handleCaseFilesClick }) => {
  const items = [
    { className: "inventory", onClick: handleInventoryClick, imgSrc: InventoryImage, imgAlt: "Inventory" },
    { className: "market", onClick: () => setMarketModalVisible(true), imgSrc: MarketIcon, imgAlt: "Market", style: { position: "relative", top: -7 } },
    { className: "case-files", onClick: handleCaseFilesClick, imgSrc: CaseFilesIcon, imgAlt: "Case Files" }
  ];

  return (
    <div className="lower" style={{ display: "flex", gap: 100, marginTop: 200 }}>
      {items.map(({ className, onClick, imgSrc, imgAlt, style }, index) => (
        <div key={index} className={className} onClick={onClick} style={{ cursor: "pointer", ...style }}>
          <img src={imgSrc} alt={imgAlt} width={50} height={50} />
        </div>
      ))}
    </div>
  );
};

export default LowerComponents;
