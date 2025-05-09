import { Modal, Tabs } from "antd";
import case_files from "../../media/case_files.jpg";
const { TabPane } = Tabs;

const CaseFilesModal = ({
  caseFilesVisible,
  handleCaseFilesClose,
  profile,
}) => {
  return (
    <Modal
      title="Case Files"
      visible={caseFilesVisible}
      onCancel={handleCaseFilesClose}
      footer={null}
      bodyStyle={{
        maxHeight: "400px", // Limit modal height
        overflowY: "auto", // Scrollable content
        padding: "20px", // Inner padding
        backgroundImage: `url(${case_files})`,// Add background image
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundPosition: "center", // Position the image in the center
        backgroundRepeat: "no-repeat", // Ensure the image doesn't repeat
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
              <strong>Vitality:</strong> {profile.vitality}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Agility:</strong> {profile.agility}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Strength:</strong> {profile.strength}
            </div>
            {profile.snitch ? (
              <div style={{ marginBottom: "10px" }}>
                <strong>Snitch:</strong> Yes
              </div>
            ) : null}
            {profile.in_debt ? (
              <div style={{ marginBottom: "10px" }}>
                <strong>In Debt:</strong> Yes
              </div>
            ) : null}
            <div>
              <strong>Jail Time Remaining:</strong> {profile.jail_years} years,{" "}
              {profile.jail_months} months, {profile.jail_days} days
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
              {profile.cellmate_remaining_years} years,{" "}
              {profile.cellmate_remaining_months} months,{" "}
              {profile.cellmate_remaining_days} days
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
