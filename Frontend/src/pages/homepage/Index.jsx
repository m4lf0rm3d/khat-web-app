import { Helmet } from 'react-helmet';
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import React from 'react';
import './styles.css';

function convertMsToTime(ms) {
  // Convert milliseconds to seconds
  const seconds = Math.floor(ms / 1000);
  
  // Calculate remaining hours and minutes
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  // Format the time string with leading zeros for minutes
  const formattedMinutes = minutes.toString().padStart(2, "0");
  
  // Construct the time remaining string
  const timeString = `Time Remaining: ${hours}h ${formattedMinutes}m`;
  
  return timeString;
}

const Homepage = () => {

  const now = new Date();
  const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  const timeRemaining = targetTime - now;
  const formattedTimeRemaining = convertMsToTime(timeRemaining);
  const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });



  
  return (
    <section className="homepage">
      <Helmet>
        <title>{NAVIGATION_ROUTES.HOMEPAGE.title}</title>
      </Helmet>

      <div className="container">
        <input className = "inputhome" type="text"  placeholder="Enter your Khat here!" />
        <button className="button1">Add To Khat</button>
        <button className="button2">View Companions</button>
      </div>
      
      <div className="text-wrapper">Khat</div>
      <div className="text-wrapper-6">{formattedTimeRemaining}</div> 
    </section>
  );
};

export default withDeviceWidthCheck(Homepage);
