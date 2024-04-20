import React from "react";
import { Helmet } from "react-helmet";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes";
import "./KhatHistory.css"

const KhatHistory = ({id = 0}) => {
    const sampleData = [
        {
            id: 0,
            companionfirstName: "Muzammil Sattar",
            companionfirstName: "Muzammil Sattar", 
            messages: [
                {
                    date: "20/08/23",
                    isSender: 0,
                    content: "Hello, how are you"

                },
                {
                    date: "05/02/23",
                    isSender: 1,
                    content: "Im good, its been a while since we talked."
                },]
        },
    ];


    return (
        <div className="khatHistory">
            <Helmet>
                <title>{NAVIGATION_ROUTES.KHATHISTORY.title}</title>
            </Helmet>
            <div className="khatHistoryMain">
                <h1>Khat History</h1>                
            </div>
        </div>
    );
}

export default withDeviceWidthCheck(KhatHistory);