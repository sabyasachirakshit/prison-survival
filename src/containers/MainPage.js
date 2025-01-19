import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

function MainPage() {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        fetch('http://192.168.0.103:5000/api/profiles')
          .then((response) => response.json())
          .then((data) => setProfiles(data))
          .catch((error) => console.error('Error fetching profiles:', error));
    }, []);

    // Generate slots with profiles or "+ Add Profile"
    const profileSlots = [...profiles, ...Array(10 - profiles.length).fill(null)];

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
                {profileSlots.map((profile, index) => (
                    <div
                        key={index}
                        className="profile-slot"
                        style={isMobile ? { width: '100px' } : {}}
                    >
                         {profile ? (
                            <Link to={`/game/${profile.id}`} style={{ textDecoration: 'none' }}>
                                {profile.name}
                            </Link>
                        ) : (
                            '+ Add Profile'
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
