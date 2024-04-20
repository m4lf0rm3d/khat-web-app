import { Helmet } from 'react-helmet';
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import React from 'react';
import './styles.css';

const Homepage = () => {
  return (
    <section className="homepage">
      <Helmet>
        <title>{NAVIGATION_ROUTES.Homepage.title}</title>
      </Helmet>

      <div className="container">
        <input type="text" placeholder="Enter text here" />
        <button className="button">Add To Khat</button>
        <button className="button">View Companions</button>
        <div className="text-wrapper">Khat</div>
      </div>
    </section>
  );
};

export default withDeviceWidthCheck(Homepage);
