import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homestyles.css';
import { MailOutline, HomeOutline, PersonAddOutline } from 'react-ionicons';


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

    const onViewKhatClick = () => {
      // Navigate to the "KHATS" screen
      navigate(NAVIGATION_ROUTES.VIEWKHAT.path);
    };

    useEffect(() => {
      const ulElement = document.querySelector('.navigation ul');
      const activeLink = (e) => {
          const target = e.target.closest('li');
          if (!target) return;
          const listItems = ulElement.querySelectorAll('li');
          listItems.forEach((item) => item.classList.remove('active'));
          target.classList.add('active');

          // Find the index of the clicked item
          const index = Array.from(listItems).indexOf(target);
          // Map the index to the corresponding route
          const routes = [
              NAVIGATION_ROUTES.HOMEPAGE.path,
              NAVIGATION_ROUTES.ADD_COMPANION.path,
              NAVIGATION_ROUTES.KHATS.path
          ];
          // Navigate to the corresponding route
          navigate(routes[index]);
      };
      ulElement.addEventListener('click', activeLink);
      return () => {
          ulElement.removeEventListener('click', activeLink);
      };
  }, [navigate]);

    
    return (
      <section className="homepage">
        <Helmet>
          <title>{NAVIGATION_ROUTES.HOMEPAGE.title}</title>
        </Helmet>

        <div className="khatsMain">Khat </div>

        <div className="container">

          <textarea className = "inputhome" type="text"  placeholder="Enter your Khat here!" />
          <div className="buttoncontainer">
            <button className="button1">Add To Khat</button>
            <button className="button2" onClick={onViewKhatClick}>View CurrentKhat</button>
          </div>
          
          <div className="text-wrapper-6">{formattedTimeRemaining}</div> 
        </div>
        <div className="navigation">
          <ul>
              <li className="list active">
                  <a href="#">
                      <span className="icon">
                          <HomeOutline />
                      </span>
                      <span className="text">Home</span>
                  </a>
              </li>
              <li className="list">
                  <a href="#">
                      <span className="icon">
                          <PersonAddOutline />
                      </span>
                      <span className="text">Add Companion</span>
                  </a>
              </li>
              <li className="list">
                  <a href="#">
                      <span className="icon">
                          <MailOutline />
                      </span>
                      <span className="text">Khat</span>
                  </a>
              </li>
              <div className="indicator"></div>
          </ul>
      </div>
      </section>
    );
  };

  export default withDeviceWidthCheck(Homepage);
