import { Modal, Tabs } from "antd";

const { TabPane } = Tabs;

const CaseFilesModal = ({ caseFilesVisible, handleCaseFilesClose, profile }) => {
  return (
    <Modal
      title="Case Files"
      visible={caseFilesVisible}
      onCancel={handleCaseFilesClose}
      footer={null}
      bodyStyle={{
        maxHeight: "400px", // Limit modal height
        overflowY: "auto",  // Scrollable content
        padding: "20px",    // Inner padding
      }}
    >
      {profile ? (
        <Tabs defaultActiveKey="1">
          {/* Tab for "My Case" */}
          <TabPane tab="My Case" key="1">
            <div style={{ marginBottom: "10px" }}>
              <strong>Name:</strong> {profile.name}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Age:</strong> {profile.age}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Crime:</strong> {profile.crime}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Status:</strong> {profile.status}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Karma:</strong> {profile.karma}
            </div>
            <div>
              <strong>Jail Time Remaining:</strong>{" "}
              {profile.jail_years} years, {profile.jail_months} months, {profile.jail_days} days
            </div>
          </TabPane>

          {/* Tab for "Cellmate" */}
          <TabPane tab="Cellmate" key="2">
            <div style={{ marginBottom: "10px" }}>
              <strong>Name:</strong> {profile.cellmate_name}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Age:</strong> {profile.cellmate_age}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Crime:</strong> {profile.cellmate_crime}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Relationship:</strong> {profile.cellmate_relationship}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Status:</strong> {profile.cellmate_status}
            </div>
            <div>
              <strong>Jail Time Remaining:</strong>{" "}
              {profile.cellmate_remaining_years} years, {profile.cellmate_remaining_months} months, {profile.cellmate_remaining_days} days
            </div>
          </TabPane>
        </Tabs>
      ) : (
        <div>Loading...</div>
      )}
    </Modal>
  );
};

export default CaseFilesModal;
