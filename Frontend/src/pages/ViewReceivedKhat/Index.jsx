import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck";
import { fetchAppSettings } from "../../utils/FetchAppSettings";
import { Link, useParams } from "react-router-dom";
import { NavBar } from "../../components/Navbar";

const ViewReceivedKhat = () => {
    const [config, setConfig] = useState();
    const [khatMessages, setKhatMessages] = useState([]);

    const { khatId, companionId } = useParams();

    useEffect(() => {
        async function fetchConfig() {
            const config = await fetchAppSettings();
            setConfig(config);

            const response = await fetch(
                `${config.ApiUrl}/Khat/GetKhatContent`,
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
                        KhatDate: new Date(khatId).toISOString(),
                    }),
                }
            );
            const khatsList = await response.json();
            setKhatMessages(khatsList.data.sort());
        }
        fetchConfig();
    }, []);

    return (
        <div>
            <h1>Khat Messages</h1>
            <br />
            <div>
                {khatMessages.length === 0 && <div>No Messages found</div>}
                {khatMessages.map((message) => (
                    <div key={message.khatId}>
                        <div>{message.message} &mdash; {new Date(message.createdOn).toLocaleTimeString()}</div>
                    </div>
                ))}
            </div>
            <NavBar />
        </div>
    );
};

export default withDeviceWidthCheck(ViewReceivedKhat);
