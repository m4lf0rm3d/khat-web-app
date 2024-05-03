import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck";
import { fetchAppSettings } from "../../utils/FetchAppSettings";
import { Link } from "react-router-dom";
import { NavBar } from "../../components/Navbar.jsx";

const Companions = () => {
    const [config, setConfig] = useState();
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
        <div>
            <h1>Companions</h1>
            <br />
            <div>
                {companionList.map((companion) => (
                    <div key={companion.userId}>
                        <Link
                            to={`/companions/${companion.companionId}/khats/`}
                        >
                            {companion.firstName} {companion.lastName}
                        </Link>
                        <hr />
                    </div>
                ))}
            </div>
            <NavBar />
        </div>
    );
};

export default withDeviceWidthCheck(Companions);
