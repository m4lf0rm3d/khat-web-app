import { Helmet } from 'react-helmet';
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homestyles.css';


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

      // Obtain the navigation function using useNavigate
    const navigate = useNavigate();

    // Event handler for the "View Companions" button
    const onViewCompanionsClick = () => {
      // Navigate to the "KHATS" screen
      navigate(NAVIGATION_ROUTES.KHATS.path);
    };
    const onAddCompanionsClick = () => {
      // Navigate to the "KHATS" screen
      navigate(NAVIGATION_ROUTES.ADD_COMPANION.path);
    };
    const onViewKhatClick = () => {
      // Navigate to the "KHATS" screen
      navigate(NAVIGATION_ROUTES.VIEWKHAT.path);
    };



    
    return (
      <section className="homepage">
        <Helmet>
          <title>{NAVIGATION_ROUTES.HOMEPAGE.title}</title>
        </Helmet>

        <div className="khatsMain">Khat </div>

        <div className="container">

          <input className = "inputhome" type="text"  placeholder="Enter your Khat here!" />
          <button className="button1">Add To Khat</button>
          <button className="button2" onClick={onViewKhatClick}>View CurrentKhat</button>
          <button className="button2" onClick={onViewCompanionsClick}>View Companions</button>
          <button className="button2" onClick={onAddCompanionsClick}>Add a Companion</button>
          



          <div className="text-wrapper-6">{formattedTimeRemaining}</div> 
        </div>



          

        
        
       
      </section>
    );
  };

  export default withDeviceWidthCheck(Homepage);
