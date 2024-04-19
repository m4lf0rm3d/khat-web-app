import React from "react";
// import { BottomNav } from "../../components/BottomNav";
import "./style.css";

export const ViewKhat = () => {
  return (
    <div className="view-khat">
      <div className="overlap-group">
        <div className="input-feilds">
          <div className="label">Your Current Khat</div>
          <div className="textbox-feild">
            <p className="lorem-ipsum">
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
            </p>
          </div>
        </div>
        <div className="input-feilds">
          <div className="label">Your Current Khat</div>
          <div className="textbox-feild">
            <p className="lorem-ipsum">
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
            </p>
          </div>
        </div>
      </div>
      <div className="text-wrapper-5">Khat</div>
      <div className="text-wrapper-6">Time Remaining</div>
      {/* <BottomNav
        className="bottom-nav-instance"
        editNote="edit-note-2.png"
        history="image.png"
        property1="send-khat"
        settings="settings-2.png"
        vector="image.svg"
      /> */}
    </div>
  );
};
export default withDeviceWidthCheck(ViewKhat);