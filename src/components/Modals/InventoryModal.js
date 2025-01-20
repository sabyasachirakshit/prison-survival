import React from "react";
import { Modal } from "antd";
import InventoryItem from "../InventoryItem";

const InventoryModal = ({
  isInventoryModalVisible,
  handleModalClose,
  profile,
  hidden = false,
}) => {
  const itemsToDisplay = hidden ? profile?.hidden_stash : profile?.inventory;

  return (
    <Modal
      title={hidden ? "Hidden Stash" : "Inventory"}
      visible={isInventoryModalVisible}
      onCancel={handleModalClose}
      footer={null}
      bodyStyle={{
        maxHeight: "400px", // Limit the height of the modal body
        overflowY: "auto", // Enable scrolling within the modal
        padding: "20px", // Add padding inside the modal content
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // 2 columns layout
          gap: "10px", // Space between grid items
        }}
      >
        {itemsToDisplay && itemsToDisplay.length > 0 ? (
          itemsToDisplay.map((item, index) => (
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
              <InventoryItem key={index} itemName={item} />
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "10px" }}>
            No items to display.
          </div>
        )}
      </div>
    </Modal>
  );
};

export default InventoryModal;
