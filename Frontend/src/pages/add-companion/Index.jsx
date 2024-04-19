import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { Link, useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import "../create-account/CreateAccount.css";
import { Loader } from "../../components/Loader.jsx";
import { MessagePopup } from "../../components/MessagePopup.jsx";
import { Helmet } from "react-helmet";
import { fetchAppSettings } from "../../utils/FetchAppSettings.js";

const AddCompanion = () =>{

    const handleSubmit = async (e) => {}

    return (
        <section className="createAccount">
            <Helmet>
                <title>{NAVIGATION_ROUTES.ADD_COMPANION.title}</title>
            </Helmet>

            <div className="addCompanionMain">
                <h1>Add A Companion!</h1>
                <form onSubmit={handleSubmit}>

                    <button type="submit">Login</button>
                </form>
            </div>
        </section>

    )
}