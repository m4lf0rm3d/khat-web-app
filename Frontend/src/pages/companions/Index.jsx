import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck";
import { fetchAppSettings } from "../../utils/FetchAppSettings";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"
import './CompanionsList.css'
import { NavBar } from "../../components/Navbar.jsx";

const Companions = () => {
    const [config, setConfig] = useState();
    const [searchText, setSearchText] = useState("");
    const [companionList, setCompanionList] = useState([]);

    useEffect(() => {
        async function fetchConfig() {
            const config = await fetchAppSettings();
            setConfig(config);

            const response = await fetch(
                `${config.ApiUrl}/Companion/GetCompanionsList`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            const companionList = await response.json();
            setCompanionList(companionList.data);
        }
        fetchConfig();
    }, []);

    return (
        // <div>
        //     <h1>Companions</h1>
        //     <br />
        //     <div>
        //         {companionList.map((companion) => (
        //             <div key={companion.userId}>
        //                 <Link
        //                     to={`/companions/${companion.companionId}/khats/`}
        //                 >
        //                     {companion.firstName} {companion.lastName}
        //                 </Link>
        //                 <hr />
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <section className="Khats">
            <Helmet>
                <title>Companions</title>
            </Helmet>
            <div className="khatsMain">
                <h1>Companions</h1>
                <div className="inputBoxKhats">
                    <input className="searchBarKhats" type="text" onInput={(e) => {
                        setSearchText(e.target.value);
                    }}/>
                </div>
                <div className="companionlistKhats">
                    {companionList.map((companion) => {    
                        if(companion.firstName.toLowerCase().startsWith(searchText.toLowerCase()))
                            return(
                                <Link 
                                    key={companion.id}
                                    className="companionTileKhats"
                                    to={`/companions/${companion.companionId}/khats/`}
                                    // onClick={() => {
                                    //     navigate(NAVIGATION_ROUTES.KHATS.path.replace(":companionId", companion.companionId))}}
                                    >
                                        {/* {companion.imgUrl == "" ?                                             
                                            <img
                                                className="companionImageKhats" 
                                                src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                                                alt="No image" />   
                                        : 
                                            <img 
                                                className="companionImageKhats"
                                                src={companion.imgUrl} 
                                                alt="No image" />                                                                        
                                        } */}
                                        {companion.firstName} {companion.lastName}
                                </Link>
                            );
                    })}
                </div>
            </div>
            <NavBar />  
        </section>
    );
};

export default withDeviceWidthCheck(Companions);
