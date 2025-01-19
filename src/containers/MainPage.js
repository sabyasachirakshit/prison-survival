import React from 'react'
import '../styles/MainPage.css'
import { isMobile } from 'react-device-detect';

function MainPage() {
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