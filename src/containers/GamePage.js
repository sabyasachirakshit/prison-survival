import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function GamePage() {
  const { profile_id } = useParams(); // Get profile_id from the URL
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch profile data from backend
    fetch(`http://192.168.0.103:5000/api/profiles/${profile_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          setProfile(data); // Set the profile data in state
        }
      })
      .catch((error) => console.error('Error fetching profile:', error));
  }, [profile_id]);

  return (
    <div>
      <h1>Game Page</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p><strong>Crime:</strong> {profile.crime}</p>
          <p><strong>Nickname:</strong> {profile.nickname ? profile.nickname : "None"}</p>
          <p><strong>Status:</strong> {profile.status}</p>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Coins:</strong> {profile.coins}</p>
          <p><strong>Karma:</strong> {profile.karma}</p>
          <p><strong>Inventory:</strong></p>
          <ul>
            {profile.inventory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p><strong>Strength:</strong> {profile.strength}</p>
          <p><strong>Vitality:</strong> {profile.vitality}</p>
          <p><strong>Agility:</strong> {profile.agility}</p>
          <p><strong>Snitch:</strong> {profile.snitch ? "Yes" : "No"}</p>
          <p><strong>In Debt:</strong> {profile.in_debt ? "Yes" : "No"}</p>
          <p><strong>Jail Time:</strong> {profile.jail_years} years {profile.jail_months} months {profile.jail_days} days</p>
          <h3>Cellmate Details</h3>
          <p><strong>Cellmate Name:</strong> {profile.cellmate_name}</p>
          <p><strong>Cellmate Age:</strong> {profile.cellmate_age}</p>
          <p><strong>Cellmate Relationship:</strong> {profile.cellmate_relationship}</p>
          <p><strong>Cellmate Crime:</strong> {profile.cellmate_crime}</p>
          <p><strong>Cellmate Remaining Time:</strong> {profile.cellmate_remaining_years} years {profile.cellmate_remaining_months} months {profile.cellmate_remaining_days} days</p>
          <p><strong>Cellmate Status:</strong> {profile.cellmate_status}</p>
        </div>
      ) : (
        <p>Profile not available for id {profile_id}</p>
      )}
    </div>
  );
}

export default GamePage;
