import React from "react";
import { Modal, Tabs } from "antd";
import InventoryItem from "../InventoryItem";

const { TabPane } = Tabs;

const InventoryModal = ({
  isInventoryModalVisible,
  handleModalClose,
  refreshProfile,
  profile,
  hidden = false,
}) => {
  const inventoryItems = profile?.inventory || [];
  const stashItems = profile?.hidden_stash || [];

  return (
    <Modal
      title={hidden ? "Hidden Stash" : "Inventory"}
      visible={isInventoryModalVisible}
      onCancel={handleModalClose}
      footer={null}
      bodyStyle={{
        maxHeight: "400px", // Limit the height of the modal body
        padding: "20px", // Add padding inside the modal content
      }}
    >
      <Tabs
        defaultActiveKey="1"
        tabBarStyle={{
          backgroundColor: "#fff", // Ensure the tab bar is visible with a white background
          borderBottom: "1px solid #ddd", // Add a bottom border to separate the tabs from the content
        }}
      >
        {/* Inventory Tab */}
        <TabPane tab="Inventory" key="1">
          <div
            style={{
              maxHeight: "300px", // Limit the height of the content area
              overflowY: "auto", // Enable scrolling within the tab content
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)", // 2 columns layout
              gap: "10px", // Space between grid items
            }}
          >
            {inventoryItems.length > 0 ? (
              inventoryItems.map((item, index) => (
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
                  <InventoryItem
                    hidden={false}
                    profile={profile}
                    key={index}
                    itemName={item}
                    refreshProfile={refreshProfile}
                  />
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "10px" }}>
                No items in Inventory.
              </div>
            )}
          </div>
        </TabPane>

        {/* Stash Tab */}
        <TabPane tab="Stash" key="2">
          <div
            style={{
              maxHeight: "300px", // Limit the height of the content area
              overflowY: "auto", // Enable scrolling within the tab content
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)", // 2 columns layout
              gap: "10px", // Space between grid items
            }}
          >
            {stashItems.length > 0 ? (
              stashItems.map((item, index) => (
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
                  <InventoryItem
                    hidden={true}
                    profile={profile}
                    key={index}
                    itemName={item}
                    refreshProfile={refreshProfile}
                  />
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "10px" }}>
                No items in Stash.
              </div>
            )}
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default InventoryModal;
