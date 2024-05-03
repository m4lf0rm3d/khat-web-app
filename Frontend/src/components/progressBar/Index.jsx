import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const ProgressBar = ({ property1, className, frameClassName, frameClassNameOverride, divClassName }) => {
  return (
    <div className={`progress-bar ${className}`}>
      {property1 === "zero" && (
        <>
          <div className="frame">
            <div className="frame-2" />
          </div>
          <div className="frame-3" />
        </>
      )}

      {["fifty", "one-hundred", "seventy-five", "twenty-five"].includes(property1) && (
        <div className={`frame ${frameClassName}`}>
          <div className={`frame-2 ${frameClassNameOverride}`} />
          <div className={`frame-4 ${property1} ${divClassName}`} />
        </div>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  property1: PropTypes.oneOf(["twenty-five", "zero", "one-hundred", "fifty", "seventy-five"]),
};