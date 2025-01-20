import React from "react";
import BreadImage from "../media/inventory/bread.png";
import CigarettesImage from "../media/inventory/cigarettes.png";
import PillsImage from "../media/inventory/pills.png";
import SweetsImage from "../media/inventory/sweets.jpg";
import CocaineImage from "../media/inventory/cocaine.png";
import MoonshineImage from "../media/inventory/moonshine.png";
import WeedImage from "../media/inventory/weed.png";

const InventoryItem = ({ itemName }) => {
  // Mapping of item names to images
  const itemImages = {
    Bread: BreadImage,
    Cigarettes: CigarettesImage,
    Pills: PillsImage,
    Sweets: SweetsImage,
    Cocaine: CocaineImage,
    Moonshine: MoonshineImage,
    Weed: WeedImage,
  };

  return (
    <div style={{ textAlign: "center", margin: "10px" }}>
      <img
        src={itemImages[itemName]}
        alt={itemName}
        style={{ width: "50px", height: "50px" }}
      />
      <div style={{ marginTop: "5px" }}>
        <b>{itemName}</b>
      </div>
    </div>
  );
};

export default InventoryItem;
