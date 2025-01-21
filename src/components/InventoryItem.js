import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useParams } from "react-router-dom";
import BreadImage from "../media/inventory/bread.png";
import CigarettesImage from "../media/inventory/cigarettes.png";
import PillsImage from "../media/inventory/pills.png";
import SweetsImage from "../media/inventory/sweets.jpg";
import CocaineImage from "../media/inventory/cocaine.png";
import MoonshineImage from "../media/inventory/moonshine.png";
import WeedImage from "../media/inventory/weed.png";

const InventoryItem = ({ itemName, refreshProfile, hidden = false, profile }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { profile_id } = useParams();
  const baseURL = process.env.REACT_APP_LOCAL_IP;

  const itemImages = {
    Bread: BreadImage,
    Cigarettes: CigarettesImage,
    Pills: PillsImage,
    Sweets: SweetsImage,
    Cocaine: CocaineImage,
    Moonshine: MoonshineImage,
    Weed: WeedImage,
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const moveToHiddenOrInventory = async (itemName) => {
    if(!hidden){
      if (profile.hidden_stash.length >= 6) {
        alert("Hidden stash limit reached. You cannot add more items."); // Display error message
        return;
      }
    }
    try {
      const endpoint = hidden
        ? `http://${baseURL}:5000/api/profiles/${profile_id}/hidden_stash/to_inventory/${itemName}`
        : `http://${baseURL}:5000/api/profiles/${profile_id}/inventory/to_hidden_stash/${itemName}`;
      const response = await fetch(endpoint, { method: "POST" });

      if (response.ok) {
        await sleep(100); // Optional: Wait before refreshing the profile
        refreshProfile();
        setIsModalVisible(false);
      } else {
        console.error("Failed to move the item.");
      }
    } catch (error) {
      console.error("Error moving the item:", error);
    }
  };

  const moveToTrash = async (itemName) => {
    const isConfirmed = window.confirm(`Are you sure you want to move "${itemName}" to the trash?`);

    if (!isConfirmed) {
      return; // If the user cancels, do nothing
    }
    try {
      const endpoint = hidden
        ? `http://${baseURL}:5000/api/profiles/${profile_id}/hidden_stash/${itemName}`
        : `http://${baseURL}:5000/api/profiles/${profile_id}/inventory/${itemName}`;
      const response = await fetch(endpoint, { method: "DELETE" });

      if (response.ok) {
        await sleep(100); // Optional: Wait before refreshing the profile
        refreshProfile();
        setIsModalVisible(false);
      } else {
        console.error("Failed to delete the item.");
      }
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  return (
    <>
      <div
        style={{ textAlign: "center", margin: "10px", cursor: "pointer" }}
        onClick={showModal}
      >
        <img
          src={itemImages[itemName]}
          alt={itemName}
          style={{ width: "50px", height: "50px" }}
        />
        <div style={{ marginTop: "5px" }}>
          <b>{itemName}</b>
        </div>
      </div>

      <Modal
        title={`Manage ${itemName}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ textAlign: "center" }}>
          <p>What do you want to do with this item?</p>
          <Button
            type="primary"
            style={{ margin: "5px" }}
            onClick={() => moveToHiddenOrInventory(itemName)}
          >
            {hidden ? "Move to Inventory" : "Move to Stash"}
          </Button>
          <Button
            type="danger"
            style={{ margin: "5px" }}
            onClick={() => moveToTrash(itemName)}
          >
            Move to Trash
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default InventoryItem;
