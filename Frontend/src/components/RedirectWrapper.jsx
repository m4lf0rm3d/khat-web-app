import { useNavigate } from "react-router-dom";

export const RedirectWrapper = ({ url, softRedirect }) => {
    if (softRedirect) {
        const navigate = useNavigate();
        navigate(url);
    } else {
        window.location.href = url;
    }
    
    return <></>;
};
