'use client'

export default function Searchvehicle() {
    return (
        <div className="search-vehicle section--padding">
            <div className="container">
                <div className="search-vehicle__bg">
                    <div className="input-box">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-4 divider">
                                <div className="label">Select Car Marker</div>
                                <div className="date">
                                    <select className="form-select form-select-md d-inline">
                                        <option value="1" disabled>Select Car Marker</option>
                                        <option>AUDI</option>
                                        <option>HOUND</option>
                                        <option>HYUNDAI</option>
                                        <option>HARUTI SUZUKI</option>
                                        <option>TATA</option>
                                        <option>VW</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 divider">
                                <div className="label">Select Car Model</div>
                                <div className="date">
                                    <select className="form-select form-select-sm d-inline">
                                        <option value="1" disabled>Select Car Model</option>
                                        <option>car model 1</option>
                                        <option>car model 2</option>
                                        <option>car model 3</option>
                                        <option>car model 4</option>

                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 divider">
                                <div className="label">Select Car Modification</div>
                                <div className="date">
                                    <select className="form-select form-select-sm d-inline">
                                        <option value="1" disabled>Select Car Modification</option>
                                        <option>2011</option>
                                        <option>2013</option>
                                        <option>2014</option>
                                        <option>2016</option>
                                        <option>2018</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12">
                                <button className="btn-find"> OEM CATALOG
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
