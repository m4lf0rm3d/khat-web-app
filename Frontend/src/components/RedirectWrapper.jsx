import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RedirectWrapper = ({ url, hardRedirect }) => {

    const navigator = useNavigate();

    useEffect(() => {
        navigator(url);
    }, [hardRedirect, url]);

    return <></>;
};
