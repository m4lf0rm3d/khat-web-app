import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const BottomNav = ({
  property1,
  history = "history-2.png",
  editNote = "edit-note-3.png",
  vector = "image.svg",
  settings = "settings-3.png",
}) => {
  return (
    <div className="bottom-nav">
      <div className="categories">
        <img
          className="img"
          alt="History"
          src={
            property1 === "default"
              ? "history.png"
              : property1 === "send-khat"
              ? history
              : property1 === "settings"
              ? "history-3.png"
              : "image.png"
          }
        />
        <div className={`text-wrapper ${property1}`}>Khat History</div>
        {property1 === "khat-history" && <img className="vector" alt="Vector" src="vector-1.svg" />}
      </div>
      <div className="div">
        <img
          className="edit-note"
          alt="Edit note"
          src={
            property1 === "default"
              ? "edit-note.png"
              : property1 === "khat-history"
              ? "edit-note-2.png"
              : property1 === "settings"
              ? "edit-note-4.png"
              : editNote
          }
        />
        <div className={`text-wrapper-2 property-1-${property1}`}>Send Khat</div>
        {property1 === "send-khat" && <img className="vector" alt="Vector" src={vector} />}
      </div>
      <div className="div">
        <img
          className="img"
          alt="Settings"
          src={
            property1 === "default"
              ? "settings.png"
              : property1 === "khat-history"
              ? "settings-2.png"
              : property1 === "send-khat"
              ? settings
              : "settings-4.png"
          }
        />
        <div className={`text-wrapper-3 property-1-0-${property1}`}>Settings</div>
        {property1 === "settings" && <img className="vector" alt="Vector" src="vector-1-2.svg" />}
      </div>
    </div>
  );
};

BottomNav.propTypes = {
  property1: PropTypes.oneOf(["khat-history", "send-khat", "settings", "default"]),
  history: PropTypes.string,
  editNote: PropTypes.string,
  vector: PropTypes.string,
  settings: PropTypes.string,
};