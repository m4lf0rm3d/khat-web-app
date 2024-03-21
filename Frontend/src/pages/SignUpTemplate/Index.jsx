/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Buttons } from "../Buttons";
import { InputFeilds } from "../InputFeilds";
import "./style.css";

export const SignUpTemplate = ({
  className,
  buttonsStatesDefaultTypeClassName,
  buttonsStates = "default",
  buttonsDivClassName,
  divClassName,
}) => {
  return (
    <div className={sign-up-template ${className}}>
      <div className="overlap-group">
        <div className="sign-in-form">
          <div className="grouped-input-feilds">
            <InputFeilds
              className="input-feilds-instance"
              label="Username"
              property1="default"
              supportText="Eg. must be unique"
              textboxFeildDefaultText="enter your username"
              textboxFeildShowRightIcon={false}
            />
            <InputFeilds
              className="design-component-instance-node"
              divClassName="input-feilds-2"
              label="Password"
              property1="default"
              supportText="Password must be at least 16 characters long"
              textboxFeildDefaultText="enter your password"
              textboxFeildShowRightIcon={false}
            />
          </div>
          <Buttons
            className={buttonsStatesDefaultTypeClassName}
            divClassName="buttons-instance"
            label="Login"
            showLeftIcon={false}
            showRightIcon={false}
            size="large"
            states={buttonsStates}
            type="fill"
          />
        </div>
        <div className="div">Enter Username and Password</div>
      </div>
      <div className="sign-up-option">
        <div className="text-wrapper-2">Already have an account?</div>
        <Buttons
          className="buttons-2"
          divClassName={buttonsDivClassName}
          label="Log in"
          showLeftIcon={false}
          showRightIcon={false}
          size="medium"
          states="default"
          type="no-outline"
        />
      </div>
      <div className={text-wrapper-3 ${divClassName}}>Welcome!</div>
    </div>
  );
};

SignUpTemplate.propTypes = {
  buttonsStates: PropTypes.string,
}