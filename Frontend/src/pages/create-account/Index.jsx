import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";

const CreateAccount = ({ deviceWidth, location }) => {
    // Your component logic here
    return (
        <div>
            <p>Device Width: {deviceWidth}</p>
            <p>Current Location: {location.pathname}</p>
        </div>
    );
};

export default withDeviceWidthCheck(CreateAccount);
