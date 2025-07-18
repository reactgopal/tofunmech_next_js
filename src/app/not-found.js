'use client'
import Link from "next/link";
const NotFound = () => {
    return (
        <div>
            <main className="main__content_wrapper">
                {/* Start error section */}
                <section className="error__section section--padding">
                    <div className="container">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="error__content text-center">
                                    {/* <img
                                        className="error__content--img display-block mb-50"
                                        src={thumb404}
                                        alt="error-img"
                                    /> */}
                                    <img src="/assets/img/others/image.png" alt="404 image" />
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
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )
}

export default NotFound
