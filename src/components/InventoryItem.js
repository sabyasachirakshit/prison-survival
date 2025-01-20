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

const InventoryItem = ({ itemName, refreshProfile, profile }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { profile_id } = useParams();
  const baseURL = process.env.REACT_APP_LOCAL_IP;
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

  // Handlers for modal visibility
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  // Action handlers
  const moveToStash = (itemName) => {
    refreshProfile();
    setIsModalVisible(false);
  };

  // Define the sleep function
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const moveToTrash = async (itemName) => {
    try {
      // Make the DELETE request
      const response = await fetch(
        `http://${baseURL}:5000/api/profiles/${profile_id}/inventory/${itemName}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Wait for 2 seconds before refreshing the profile
        await sleep(500);
        refreshProfile(); // Refresh the profile after the wait

        // Close the modal
        setIsModalVisible(false);
      } else {
        console.error("Failed to delete the item");
      }
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  return (
    <>
      {/* Inventory Item */}
      <div
        style={{ textAlign: "center", margin: "10px", cursor: "pointer" }}
        onClick={showModal} // Open modal on click
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

      {/* Modal */}
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
            onClick={() => moveToStash(itemName)}
          >
            Move to Stash
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
