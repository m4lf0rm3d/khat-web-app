import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck";
import { fetchAppSettings } from "../../utils/FetchAppSettings";
import { Link, useParams } from "react-router-dom";
import { NavBar } from "../../components/Navbar";
import { Helmet } from "react-helmet";
import "./Khats.css"

const KhatsList = () => {
    const [config, setConfig] = useState();
    const [khatsList, setKhatsList] = useState([]);

    const { companionId } = useParams();

    useEffect(() => {
        async function fetchConfig() {
            const config = await fetchAppSettings();
            setConfig(config);

            const response = await fetch(
                `${config.ApiUrl}/Khat/GetKhatByCompanionId`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        companionId: companionId,
                    }),
                }
            );
            const khatsList = await response.json();
            setKhatsList(khatsList.data.sort());
        }
        fetchConfig();
    }, []);

    return (
        <div>
            {/* <h1>Khats</h1>
            <br />
            <div>
                {khatsList.length === 0 && <div>No khats found</div>}
                {khatsList.map((khatDate) => (
                    <div key={khatDate}>
                        <Link
                            to={`/companions/${companionId}/khats/${khatDate.slice(
                                0,
                                10
                            )}`}
                        >
                            {khatDate.slice(0, 10)}
                        </Link>
                        <hr />
                    </div>
                ))}
            </div> */}
            <Helmet>
                <title>Khats</title>
            </Helmet>
            <div className="khatHistoryMain">
                <h1>Khats</h1>                
                {/* {imgUrl == "" ?                                             
                <img
                    className="companionImageKhatHistory" 
                    src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                    alt="No image" />   
                    : 
                <img 
                    className="companionImageKhatHistory"
                    src={imgUrl} 
                    alt="No image" />                                                                        
                } */}
                
                <div className="khatDatesKhatHistory">
                {khatsList.length == 0 && <div> No khats yet :( </div>}
                {khatsList.map((khatDate) => (
                    <div 
                    key={khatDate}
                    className="viewKhatButtonKhatHistory">
                        <Link
                            style={{textDecoration: "none"}}
                            to={`/companions/${companionId}/khats/${khatDate.slice(
                                0,
                                10
                            )}`}
                        >
                            {khatDate.slice(0, 10)}
                        </Link>                        
                    </div>
                ))}
                </div>
            </div>
            <NavBar />
        </div>
    );
};

export default withDeviceWidthCheck(KhatsList);
