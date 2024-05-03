import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { Helmet } from "react-helmet";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import "../homepage/homestyles.css";
import "./CompanionsList.css"
import { MailOutline, HomeOutline, PersonAddOutline } from 'react-ionicons';

const CompanionsList = () => {
    const [searchText, setSearchText] = useState("");
    const [activeIndex, setActiveIndex] = useState(2); // Initialize activeIndex with a default value

    const location = useLocation(); // Use useLocation to get the current location    

    const sampleData = [
        {
            companionId: 0,
            id: 0,
            firstName: "Muzammil",
            lastName: "Sattar",
            imgUrl: ""
        },
        {
            companionId: 1,
            id: 1,
            firstName: "Arsalan",
            lastName: "Hussain",
            imgUrl: ""
        },
        {
            companionId: 2,
            id: 2,
            firstName: "Ahsan",
            lastName: "Azeemi",
            imgUrl: ""
        },
    ];

    // const companionData = [
    //     {
    //         companionId: 0,
    //         companionAId: 0,
    //         companionBiD: 1,
    //     },
    //     {
    //         companionId: 1,
    //         companionAId: 2,
    //         companionBiD: 1,
    //     }
    // ]

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
                <h1>Companions</h1>
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
                                        navigate(NAVIGATION_ROUTES.KHATS.path.replace(":companionId", companion.companionId))
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
                                <span className="text1">Khats</span>
                            </a>
                        </li>
                        <div className="indicator"></div>
                    </ul>
                </div>
            </div>   
        </section>
    );
}

export default withDeviceWidthCheck(CompanionsList);
