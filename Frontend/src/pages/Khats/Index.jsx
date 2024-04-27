import React from "react";
import { Helmet } from "react-helmet";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes";
import { useEffect } from "react";
import "./Khats.css"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const Khats = ({firstName, lastName, imgUrl = "", id = 0}) => {
    const navigate = useNavigate();
    const {companionId} = useParams();
    const companionData = [
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
    ]

    const sampleData = [                      
        {
            id: 0,
            isSender: 0,            
            date: "20/08/23",
            isSender: 0,
            content: "Hello, how are you. I recently bought this Charizard for 70rs that white people have to sell their souls for."

        },
        {
            id: 1,
            isSender: 1,
            date: "05/02/24",
            isSender: 1,
            content: "Im good, its been a while since we talked. That card is fake btw"
        },          
    ];

    useEffect(() => {
        // Convert the date strings to a sortable format (YYYY/MM/DD)
        sampleData.forEach(data => {
            const [day, month, year] = data.date.split('/');
            data.sortableDate = `20${year}/${month}/${day}`;
        });

        // Sort the array based on the sortableDate property
        sampleData.sort((a, b) => new Date(a.sortableDate) - new Date(b.sortableDate));

        // Remove the temporary sortableDate property
        sampleData.forEach(data => delete data.sortableDate);
    }, []);

    return (
        <div className="khatHistory">
            <Helmet>
                <title>{NAVIGATION_ROUTES.KHATS.title}</title>
            </Helmet>
            <div className="khatHistoryMain">
                <h1>Khats</h1>                
                {imgUrl == "" ?                                             
                <img
                    className="companionImageKhatHistory" 
                    src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                    alt="No image" />   
                    : 
                <img 
                    className="companionImageKhatHistory"
                    src={imgUrl} 
                    alt="No image" />                                                                        
                }
                <div className="khatDatesKhatHistory">
                    {
                        sampleData.map((khat) => {
                            return (                                
                                <Link                            
                                key={khat.id} 
                                onClick={(e) => {
                                    navigate(NAVIGATION_ROUTES.VIEWRECEIVEDKHAT.path.                                    
                                        replace(":companionId", companionId)
                                        .replace(":khatId", khat.id))
                                }}
                                // style={{backgroundColor: "black"}}
                                className="viewKhatButtonKhatHistory">
                                    <div className="khatHistoryDate">{khat.date}</div>
                                    {/* Add khat here */}
                                </Link>                                                        
                            );
                        })
                    }
                </div>
            </div>
            
        </div>
    );
}

export default withDeviceWidthCheck(Khats);