import { useEffect, useState } from "react";
import { fetchAppSettings } from "../../utils/FetchAppSettings.js";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { Link, useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import { NavBar } from "../../components/Navbar.jsx";
import Timer from "../../components/TImer.jsx";
import "./Index.css";

export const WriteKhat = () => {
    const [config, setConfig] = useState();
    const [companionList, setCompanionList] = useState([]);
    const [selectedCompanion, setSelectedCompanion] = useState();
    const [selfKhatMessages, setSelfKhatMessages] = useState([]);
    const [isMessageAdded, setIsMessageAdded] = useState(false);

    if (localStorage.getItem("token") === null) {
        const navigate = useNavigate();
        navigate(NAVIGATION_ROUTES.LOGIN.path);
    }

    useEffect(() => {
        async function fetchConfig() {
            const config = await fetchAppSettings();
            setConfig(config);
        }
        fetchConfig();
    }, []);

    useEffect(() => {
        if (config) {
            let fetchCompanionList = async () => {
                let response = await fetch(
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
                let companionList = await response.json();
                setCompanionList(companionList.data);
                setSelectedCompanion(companionList?.data[0].userId);
            };
            fetchCompanionList();
        }
    }, [config]);

    const handleAddMessage = async () => {
        const message = document.getElementById("khatMessage").value;
        document.getElementById("khatMessage").value = "";
        const response = await fetch(`${config?.ApiUrl}/Khat/AddMessage`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                receiverId: selectedCompanion,
                message: message,
            }),
        });
        setIsMessageAdded(!isMessageAdded);

        // scroll to bottom
        const khatEditor = document.getElementById("khatEditor");
        khatEditor.scrollTop = khatEditor.scrollHeight;
    };

    useEffect(() => {
        if (!config) return;
        let fetchSelfKhatMessages = async () => {
            let response = await fetch(`${config?.ApiUrl}/Khat/GetSelf`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    receiverId: selectedCompanion,
                }),
            });
            let selfKhatMessages = await response.json();
            setSelfKhatMessages(selfKhatMessages.data);
        };
        fetchSelfKhatMessages();
    }, [isMessageAdded, selectedCompanion]);

    return (
        <section className="khatViewSection">
            <h1>Write Khat</h1>
            {companionList.length == 0 ? (
                <div>
                    <h2>No Companions Found</h2>
                </div>
            ) : (
                <>
                    <div className="chooseCompanion">
                        <select
                            name="chooseCompanion"
                            id="chooseCompanionSelect"
                            onChange={(e) =>
                                setSelectedCompanion(e.target.value)
                            }
                        >
                            {companionList.map((companion) => (
                                <option
                                    key={companion.userId}
                                    value={companion.userId}
                                >
                                    {companion.firstName} {companion.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="khatEditor" id="khatEditor"  >
                        {selfKhatMessages.map((message) => (
                            <div key={Math.random()} className="khatMessage">
                                <p>{message.message}</p>
                                <span>
                                    {new Date(
                                        message.createdOn
                                    ).toLocaleTimeString()}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="addKhatOptions">
                        <input
                            type="text"
                            name="khatMessage"
                            id="khatMessage"
                            placeholder="Write Message"
                        />
                        <button onClick={handleAddMessage}>
                            <i className="fas fa-add"></i>
                        </button>
                    </div>
                    <Timer />
                </>
            )}

            <NavBar />
        </section>
    );
};

export default withDeviceWidthCheck(WriteKhat);
