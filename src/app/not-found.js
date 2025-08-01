'use client'
import Link from "next/link";
const NotFound = () => {
    return (
        <div className="margin_top_all">
            <main className="main__content_wrapper section--padding">
                {/* Start error section */}
                <section className="error__section section--padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto text-center">
                                <h1 className="error__code">404</h1>
                                <h2 className="error__content--title">Page Not Found</h2>
                                <p className="error__content--desc">
                                    Page not available. Please search again or <br /> navigate using the menu.
                                </p>
                                <div className="error__content--btn text-center">
                                    <Link href="/" className="btn">
                                        <img src="/assets/img/icons/arrow-left.svg" alt="Back" /> Back to Home
                                    </Link>
                                </div>
                                <div className="error__content--img">
                                    <img src="/assets/img/others/404.png" alt="404 illustration" />
                                </div>
                            </div>
                        </div>

                        {/* <div className="row row-cols-1">
                            <div className="col">
                                <div className="error__content text-center">
                                    <img
                                        src="/assets/img/others/image.png"
                                        className="error__content--img display-block mb-50"
                                        alt="404 image" />
                                    <h2 className="error__content--title">
                                        Opps ! We,ar Not Found This Page{" "}
                                    </h2>
                                    <p className="error__content--desc">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        Excepturi animi aliquid minima assumenda.
                                    </p>
                                    <Link className="error__content--btn bg-black" href="/">
                                        Back To Home
                                    </Link>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default NotFound
