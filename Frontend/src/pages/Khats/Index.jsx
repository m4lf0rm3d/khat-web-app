import React, { useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck";
import { Helmet } from "react-helmet";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import "./Khats.css"



const Khats = () => {
    const [searchText, setSearchText] = useState("");
    const sampleData = [
        {
            id: 0,
            firstName: "Muzammil",
            lastName: "Sattar",
            imgUrl: ""
        },
        {
            id: 1,
            firstName: "Arsalan",
            lastName: "Hussain",
            imgUrl: ""
        },
        {
            id: 2,
            firstName: "Ahsan",
            lastName: "Azeemi",
            imgUrl: ""
        },
    ]

    // for(let i = 0; i < 20; i ++){
    //     sampleData.push({
    //         id: i+3,
    //         firstName: "Ahsan",
    //         lastName: "Azeemi",
    //         imgUrl: ""
    //     })
    // }

    return (
        <section className="Khats">
            <Helmet>
                <title>{NAVIGATION_ROUTES.KHATS.title}</title>
            </Helmet>
            <div className="khatsMain">
                <h1>Khats</h1>
                {/* search */}
                <div className="inputBoxKhats">
                    <input className="searchBarKhats" type="text" onInput={(e) => {
                        setSearchText(e.target.value);
                    }}/>
                </div>
                {/* companions */}
                <div className="companionlistKhats">
                    {sampleData.map((companion) => {    
                        if(companion.firstName.toLowerCase().startsWith(searchText.toLowerCase()))
                            return(
                                 <button 
                                    key={companion.id}
                                    className="companionTileKhats"
                                    onClick={() => {
                                        console.log("clicked");
                                    }}>
                                        {companion.imgUrl == "" ?                                             
                                            <img
                                            className="companionImageKhats" 
                                            src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                                            alt="No image" />   
                                        : 
                                            <img 
                                            className="companionImageKhats"
                                            src={companion.imgUrl} 
                                             alt="No image" />                                                                        
                                        }
                                        {companion.firstName} {companion.lastName}
                                </button>
                    );})}
                </div>
            </div>
            
        </section>
    );
}

export default withDeviceWidthCheck(Khats);