import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

function MainPage() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('http://192.168.0.103:5000/api/profiles')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched profiles data:", data); // Log profiles data
        setProfiles(data);
      })
      .catch((error) => console.error('Error fetching profiles:', error));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>WELCOME TO PRISON SURVIVAL SIM</h1>

      <div
        className="all-profile-slots"
        style={
          !isMobile
            ? { display: 'flex', justifyContent: 'center', width: '100%' }
            : { flexDirection: 'column', gap: 10, display: 'flex', alignItems: 'center' }
        }
      >
        {profiles.map((profile) => (
          <div key={profile.id} className="profile-slot" style={isMobile ? { width: '100px' } : {}}>
            <Link to={`/game/${profile.id}`} style={{ textDecoration: 'none' }}>
              {profile.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
