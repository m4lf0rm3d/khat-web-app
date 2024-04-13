import LoaderVideo from "../assets/Loader.mp4";

export const Loader = ({message}) => {
    return(

        <section className="loader">
            <div className="loaderMain">

                <video autoPlay loop muted  >
                    <source src={LoaderVideo} type="video/mp4" />
                </video>
                <h1>{message}</h1>
            </div>
        </section>

    );
}