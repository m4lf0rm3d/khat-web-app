import React from "react";
import "./viewkhatstyle.css";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import "../create-account/CreateAccount.css";
import { useNavigate } from 'react-router-dom';


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


export const ViewKhat = () => {
  const now = new Date();
  const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  const timeRemaining = targetTime - now;
  const formattedTimeRemaining = convertMsToTime(timeRemaining);
  const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  

      // Obtain the navigation function using useNavigate
    const navigate = useNavigate();

    // Event handler for the "View Companions" button
    const onGoBackClick = () => {
      // Navigate to the "KHATS" screen
      navigate(NAVIGATION_ROUTES.HOMEPAGE.path);
    };

  return (
    <div className="view-khat">
      <div className="overlap-group">
        <div className="input-feilds">
          <div className="label">Your Current Khat</div>
          <div className="textbox-feild">
            Add khat from database here.
            {/* <p className="lorem-ipsum">
              <span className="span">8:15 am:</span>
              <span className="text-wrapper-4">
                {" "}
                Just having breakfast makes me miss you and think of you. I hate Karachi, it’s busy and loud and
                extremely dull without you here.
                <br />
                --------------------------------------{" "}
              </span>
              <span className="span">6:09 pm:</span>
              <span className="text-wrapper-4">
                {" "}
                Hey Love. Missed you a lot today. Hope to see you as soon as possible.{"  "}
              </span>
              <span className="span">______________________________________</span>
            </p> */}
          </div>
        </div>
      </div>
      <div className="text-wrapper-5">Khat</div>
      <button className="button_home" onClick={onGoBackClick}>Back To Home</button>
      <div className="text-wrapper-6">{formattedTimeRemaining}</div>
    </div>
  );
};
export default withDeviceWidthCheck(ViewKhat);