import React,{useEffect} from 'react'
import '../styles/MainPage.css'
import { isMobile } from 'react-device-detect';

function MainPage() {
    // const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        fetch('http://192.168.0.103:5000/api/profiles')
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error('Error fetching profiles:', error));
      }, []);

  return (
    <div style={{textAlign: 'center'}}>
        <h1>WELCOME TO PRISON SURVIVAL SIM</h1>
        <div className="all-profile-slots" style={!isMobile?{display:"flex",justifyContent:"center",width:"100%"}:{flexDirection:"column",gap:10,display:"flex",alignItems:"center"}}>
            <div className="profile-slot" style={isMobile?{width:"100px"}:{}}>+ Add Profile</div>
            <div className="profile-slot" style={isMobile?{width:"100px"}:{}}>+ Add Profile</div>
            <div className="profile-slot" style={isMobile?{width:"100px"}:{}}>+ Add Profile</div>
            <div className="profile-slot" style={isMobile?{width:"100px"}:{}}>+ Add Profile</div>
            <div className="profile-slot" style={isMobile?{width:"100px"}:{}}>+ Add Profile</div>
            <div className="profile-slot" style={isMobile?{width:"100px"}:{}}>+ Add Profile</div>
            <div className="profile-slot" style={isMobile?{width:"100px"}:{}}>+ Add Profile</div>
            <div className="profile-slot" style={isMobile?{width:"100px"}:{}}>+ Add Profile</div>
            <div className="profile-slot" style={isMobile?{width:"100px"}:{}}>+ Add Profile</div>
            <div className="profile-slot" style={isMobile?{width:"100px"}:{}}>+ Add Profile</div>
        </div>
    </div>
  )
}

export default MainPage