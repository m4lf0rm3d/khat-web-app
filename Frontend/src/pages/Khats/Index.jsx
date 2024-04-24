import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck";
import { Helmet } from "react-helmet";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import "../create-account/CreateAccount.css";
import "./Khats.css"
import { MailOutline, HomeOutline, PersonAddOutline } from 'react-ionicons';

const Khats = () => {
    const [searchText, setSearchText] = useState("");
    const [activeIndex, setActiveIndex] = useState(2); // Initialize activeIndex with a default value

    const location = useLocation(); // Use useLocation to get the current location

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
    ];

    const navigate = useNavigate();

    const handleItemClick = (path, index) => {
        navigate(path);
        setActiveIndex(index);
    };

    useEffect(() => {
        const routes = [
            NAVIGATION_ROUTES.HOMEPAGE.path,
            NAVIGATION_ROUTES.ADD_COMPANION.path,
            NAVIGATION_ROUTES.KHATS.path
        ];
        const index = routes.indexOf(location.pathname);
        setActiveIndex(index);
    }, [location.pathname]);

    return (
        <section className="Khats">
            <Helmet>
                <title>{NAVIGATION_ROUTES.KHATS.title}</title>
            </Helmet>
            <div className="khatsMain">
                <h1>Khats</h1>
                <div className="inputBoxKhats">
                    <input className="searchBarKhats" type="text" onInput={(e) => {
                        setSearchText(e.target.value);
                    }}/>
                </div>
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
                            );
                    })}
                </div>
                <div className="navigation">
                    <ul>
                        <li className={`list ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleItemClick(NAVIGATION_ROUTES.HOMEPAGE.path, 0)}>
                            <a href="#">
                                <span className="icon">
                                    <HomeOutline />
                                </span>
                                <span className="text">Home</span>
                            </a>
                        </li>
                        <li className={`list ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleItemClick(NAVIGATION_ROUTES.ADD_COMPANION.path, 1)}>
                            <a href="#">
                                <span className="icon">
                                    <PersonAddOutline />
                                </span>
                                <span className="text">Add Companion</span>
                            </a>
                        </li>
                        <li className={`list ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleItemClick(NAVIGATION_ROUTES.KHATS.path, 2)}>
                            <a href="#">
                                <span className="icon">
                                    <MailOutline />
                                </span>
                                <span className="text">Khats</span>
                            </a>
                        </li>
                        <div className="indicator"></div>
                    </ul>
                </div>
            </div>   
        </section>
    );
}

export default withDeviceWidthCheck(Khats);
