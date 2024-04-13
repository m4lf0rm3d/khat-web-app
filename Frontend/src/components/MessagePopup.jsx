export const MessagePopup = ({ message, icon, messageHeader }) => {

    return(

        <section className="messagePopup">
            <div className="messagePopupMain">
                <div className="messagePopupHeader">
                    <i className={icon}></i>
                    <h1>{messageHeader}</h1>
                </div>
                <p>{message}</p>
            </div>
        </section>

    );

};
