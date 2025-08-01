'use client'

import { CarCompanies, CarModel, CarModelModification } from "@/api/services/apiServices";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addSingleCategory } from "@/store/reducers/ProductSlice";

export default function Searchvehicle() {
    const { category_list, single_category } = useSelector((state) => ({
        ...state.products,
    }));

    const dispatch = useDispatch();
    const navigate = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);

    const [cateId, setCateId] = useState("");
    const [isOpen, setIsOpen] = useState(true);

    const [carCompanies, setCarCompanies] = useState([]);
    const [carModels, setCarModels] = useState([]);
    const [carModifications, setCarModifications] = useState([]);

    const [selectedCarCompany, setSelectedCarCompany] = useState(null);
    const [selectedCarModel, setSelectedCarModel] = useState(null);
    const [selectedCarModification, setSelectedCarModification] = useState(null);

    const [open, setOpen] = useState(false);
    const [number, setnumber] = useState("");
    const [openWindow, setopenWindow] = useState(false);

    useEffect(() => {
        CarCompanies().then((res) => {
            setCarCompanies(res?.data);
        });
    }, []);
    useEffect(() => {
        if (cateId) {
            CategoryProduct(cateId)
                .then((res) => {
                    if (res.success) {
                        dispatch(addSingleCategory(res?.data));
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [cateId]);
    const customStyles = {
        control: (defaultStyles, state) => ({
            ...defaultStyles,
            border: "1px solid #d1d5db", // Light gray border (Tailwind gray-300)
            borderRadius: "12px",
            padding: "4px 8px",
            backgroundColor: "#fff",
            boxShadow: state.isFocused ? "0 0 0 2px var(--primary-color)" : "none", // Blue ring on focus (Tailwind blue-500)
            transition: "all 0.2s ease",
            minHeight: "48px",
            fontSize: "16px",
            fontWeight: 500,
            cursor: "pointer",
            "&:hover": {
                borderColor: "var(--highlight-color)",
            },
        }),
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            backgroundColor: state.isSelected
                ? "#3b82f6"
                : state.isFocused
                    ? "#e0f2fe"
                    : "#fff",
            color: state.isSelected ? "#fff" : "#111827", // Tailwind gray-900
            padding: "12px 16px",
            cursor: "pointer",
            fontWeight: state.isSelected ? 600 : 400,
            fontSize: "15px",
            transition: "all 0.15s ease",
        }),
        placeholder: (provided) => ({
            ...provided,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "#9ca3af", // Tailwind gray-400
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#111827", // Tailwind gray-900
        }),
        dropdownIndicator: (defaultStyles) => ({
            ...defaultStyles,
            color: "#6b7280", // Tailwind gray-500
            "&:hover": {
                color: "#3b82f6",
            },
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: "10px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
            zIndex: 100,
        }),
    };

    const handleCarCompanyChange = async (selectedOption) => {
        if (!selectedCarCompany || selectedOption.value !== selectedCarCompany.value) {
            setSelectedCarCompany(selectedOption);
            try {
                // Fetch car models based on the selected car company
                const response = await CarModel(selectedOption.id);
                if (response.success && response.data) {
                    // Assuming the data property contains the array of models
                    setCarModels(response.data.data);
                } else {
                    console.error("Invalid response format for car models:", response);
                }
            } catch (error) {
                console.error("Error fetching car models:", error);
            }
            setSelectedCarModel(null); // Reset selected car model
            setSelectedCarModification(null); // Reset selected car modification
        }
    };

    const handleCarModelChange = async (selectedOption) => {
        if (!selectedCarModel || selectedOption.value !== selectedCarModel.value) {
            setSelectedCarModel(selectedOption);
            try {
                // console.log(selectedCarCompany.id, selectedOption.id);
                // Fetch car modifications based on the selected car model
                const response = await CarModelModification({
                    carValName: selectedCarCompany.id,
                    val: selectedOption.id,
                });
                if (response.success && response.data) {
                    // Assuming the data property contains the array of modifications
                    setCarModifications(response.data.data);
                } else {
                    console.error(
                        "Invalid response format for car modifications:",
                        response
                    );
                }
            } catch (error) {
                console.error("Error fetching car modifications:", error);
            }
            setSelectedCarModification(null); // Reset selected car modification
        }
    };

    const handleCarModificationChange = (selectedOption) => {
        setSelectedCarModification(selectedOption);
    };
    const openBrowser = () => {
        setopenWindow(true)
    };
    return (
        <div className="search-vehicle section--padding">
            <div className="container">
                <div className="search-vehicle__bg">
                    <div className="input-box">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-4 divider">
                                <div className="label">Select Car Marker</div>
                                <div className="date">
                                    {/* <select className="form-select form-select-md d-inline">
                                        <option value="1" disabled>Select Car Marker</option>
                                        <option>AUDI</option>
                                        <option>HOUND</option>
                                        <option>HYUNDAI</option>
                                        <option>HARUTI SUZUKI</option>
                                        <option>TATA</option>
                                        <option>VW</option>
                                    </select> */}
                                    <Select
                                        value={selectedCarCompany}
                                        styles={customStyles}
                                        placeholder="Select Car Maker"
                                        onChange={handleCarCompanyChange}
                                        isSearchable={false}
                                        autoFocus={true}
                                        options={carCompanies.map((company) => ({
                                            value: company.id,
                                            label: company.name,
                                            id: company.id,
                                        }))}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 divider">
                                <div className="label">Select Car Model</div>
                                <div className="date">
                                    {/* <select className="form-select form-select-sm d-inline">
                                        <option value="1" disabled>Select Car Model</option>
                                        <option>car model 1</option>
                                        <option>car model 2</option>
                                        <option>car model 3</option>
                                        <option>car model 4</option>
                                    </select> */}
                                    <Select
                                        value={selectedCarModel}
                                        onChange={handleCarModelChange}
                                        options={carModels.map((model) => ({
                                            value: model.id,
                                            label: model.name,
                                            id: model.id,
                                        }))}
                                        isSearchable={false}
                                        styles={customStyles}
                                        autoFocus={true}
                                        placeholder="Select Car Model"
                                        isDisabled={!selectedCarCompany}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 divider">
                                <div className="label">Select Car Modification</div>
                                <div className="date">
                                    {/* <select className="form-select form-select-sm d-inline">
                                        <option value="1" disabled>Select Car Modification</option>
                                        <option>2011</option>
                                        <option>2013</option>
                                        <option>2014</option>
                                        <option>2016</option>
                                        <option>2018</option>
                                    </select> */}
                                    <Select
                                        value={selectedCarModification}
                                        onChange={handleCarModificationChange}
                                        options={carModifications.map((modification) => ({
                                            value: modification.id,
                                            label: modification.name,
                                        }))}
                                        placeholder="Select Car Modification"
                                        autoFocus={true}
                                        isSearchable={false}
                                        styles={customStyles}
                                        isDisabled={!selectedCarModel}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12">
                                <a
                                    // href={`http://localhost:3000/${selectedCarCompany?.id}/${selectedCarModel?.id}/${selectedCarModification?.value}/?back_url_pn=http://localhost:3000/search/{pn}/2notYejtxG0H4WTy8CXw91WSLLcZLZZdjCc20HaacJM65pxh3m53pcd5XzAGZedUtI43LZ49M07gbk48DXve0ZAm1RmO93ZxhF70JID6im39vNcL834W5VDme2dS9aOJq2eVaA5yiy44xJR0QMaxXh59YN7261ncbBgsV2ZuXxou1NHFn8LKhVk8E2K35KweyHCgefPU/boodmo.com`}
                                    href={`https://boltbust.store/${selectedCarCompany?.id}/${selectedCarModel?.id}/${selectedCarModification?.value}`}
                                    // href={`http://localhost:3001/${selectedCarCompany?.id}/${selectedCarModel?.id}/${selectedCarModification?.value}`}
                                    target="_blank"
                                    className="w-100"
                                >
                                    <button className="btn-find" disabled={!selectedCarModification ? true : false} onClick={openBrowser}>  OEM CATALOG
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
