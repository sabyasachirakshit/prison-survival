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
          {/* Render other profile details here */}
          <p>ID: {profile.id}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default GamePage;
