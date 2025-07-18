
'use client'
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal } from '@mui/material';
import { IoCloseSharp } from "react-icons/io5";
import { add_ship_details, removeAddress } from "@/store/reducers/ProductSlice";
import { AddAddressUser, DeleteAddress, GetAddressUser } from "@/api/services/apiServices";
import { motion } from "framer-motion";
import { MapPin, User, Phone, Home, Globe, Hash, Edit3, Trash2 } from 'lucide-react';

export default function MyAddress() {
    const dispatch = useDispatch();
    const { add_ship } = useSelector((state) => ({ ...state.products }));
    const [isOpen, setIsOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSaveId, setOpenSaveId] = useState('');
    const [formValues, setFormValues] = useState({
        fname: '',
        lname: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        add_title: '',
    });
    const [errors, setErrors] = useState('');

    const handleAddressRemove = () => {
        dispatch(removeAddress(openSaveId))
        DeleteAddress(openSaveId).then((res) => {
            console.log(res);
        })
        setOpenDelete(false);
    }

    useEffect(() => {
        GetAddress();
        window.scrollTo(0, 0);
    }, [])

    const GetAddress = () => {
        GetAddressUser().then((res) => {
            if (res?.success) {
                dispatch(add_ship_details(res?.data))
            } else {
                console.log("hello");
            }
        })
    }

    const validateForm = () => {
        const newErrors = {};

        if (!formValues.fname) {
            newErrors.fname = 'First name is required';
        }
        if (!formValues.lname) {
            newErrors.lname = 'Last name is required';
        }
        if (!formValues.mobile) {
            newErrors.mobile = 'Mobile is required';
        }
        if (!formValues.address) {
            newErrors.address = 'Address is required';
        }
        if (!formValues.pincode) {
            newErrors.pincode = 'Pincode is required';
        }
        if (!formValues.state) {
            newErrors.state = 'State is required';
        }
        if (!formValues.city) {
            newErrors.city = 'City is required';
        }
        if (!formValues.add_title) {
            newErrors.add_title = 'Landmark is required';
        }
        if (!formValues.country) {
            newErrors.country = 'Country is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            let data = {
                first_name: formValues.fname,
                last_name: formValues.lname,
                mobile: formValues.mobile,
                address: formValues.address,
                pincode: formValues.pincode,
                state: formValues.state,
                city: formValues.city,
                address_title: formValues.add_title,
                country: formValues.country
            }
            AddAddressUser(data).then((res) => {
                GetAddress();
                setIsOpen(false)
            })
            setFormValues({
                fname: '',
                lname: '',
                mobile: '',
                address: '',
                city: '',
                state: '',
                country: '',
                pincode: '',
                add_title: ''
            })
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors("")
    };

    const handleOpenNewAddress = () => {
        setIsOpen(!isOpen);
    }

    const handleOpenDelete = (id) => {
        setOpenDelete(true);
        setOpenSaveId(id);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    return (
        <div className="addrees__main">
            <div className="container py-5">
                <div className="my__account--section__inner">

                    <div className="shipping__address__inner">
                        <div className="shipping__address__header">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Shipping Details</h1>
                            <p className="text-gray-600">Manage your delivery addresses</p>
                        </div>


                        {/* Add New Address Button */}
                        <div className="shipping__add__btn__wrapper">
                            <button className="shipping__add__btn" onClick={handleOpenNewAddress}>
                                <AiOutlinePlus />
                                Add New Address
                            </button>
                        </div>

                        {/* Address List */}
                        <div className="shipping__card__grid">
                            {add_ship?.map((address, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
                                    className="shipping__card"
                                >
                                    <div className="shipping__card__inner">
                                        <div className="shipping__card__header">
                                            <div className="shipping__card__user">
                                                <div className="user__icon">
                                                    <User className="user__icon__svg" />
                                                </div>
                                                <h3>{address?.first_name} {address?.last_name}</h3>
                                            </div>

                                            <button onClick={() => handleOpenDelete(address?.id)} className="delete__btn">
                                                <Trash2 className="delete__icon" />
                                            </button>
                                        </div>

                                        <div className="shipping__card__body">
                                            <div className="card__line">
                                                <Phone className="line__icon" />
                                                <span>{address?.mobile}</span>
                                            </div>

                                            <div className="card__line multiline">
                                                <MapPin className="line__icon" />
                                                <div>
                                                    <p>
                                                        {address?.address}
                                                        {address?.address_title && `, ${address?.address_title}`}
                                                    </p>
                                                    <p>{address?.city}, {address?.state} - {address?.pincode}</p>
                                                    <p>{address?.country}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>


                        {/* Address Form */}
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="shipping__form__wrapper"
                            >
                                {/* <div className="shipping__form__header">
                                    <h2 className="shipping__form__title">
                                        <MapPin className="shipping__form__icon" />
                                        Add New Address
                                    </h2>
                                    <p className="shipping__form__subtitle">Fill in your shipping details</p>
                                </div> */}

                                <form onSubmit={handleSubmit} className="shipping__form">
                                    {/* First & Last Name */}
                                    <div className="shipping__form__row">
                                        <div className="shipping__form__group">
                                            <label className="shipping__form__label">
                                                <User className="shipping__form__label__icon" />
                                                First Name *
                                            </label>
                                            <input
                                                className={`shipping__form__input ${errors.fname ? 'shipping__form__input--error' : ''}`}
                                                placeholder="Enter your first name"
                                                type="text"
                                                name="fname"
                                                value={formValues.fname}
                                                onChange={handleChange}
                                            />
                                            {errors.fname && <p className="shipping__form__error">{errors.fname}</p>}
                                        </div>

                                        <div className="shipping__form__group">
                                            <label className="shipping__form__label">
                                                <User className="shipping__form__label__icon" />
                                                Last Name *
                                            </label>
                                            <input
                                                className={`shipping__form__input ${errors.lname ? 'shipping__form__input--error' : ''}`}
                                                placeholder="Enter your last name"
                                                type="text"
                                                name="lname"
                                                value={formValues.lname}
                                                onChange={handleChange}
                                            />
                                            {errors.lname && <p className="shipping__form__error">{errors.lname}</p>}
                                        </div>
                                    </div>

                                    {/* Mobile & Landmark */}
                                    <div className="shipping__form__row">
                                        <div className="shipping__form__group">
                                            <label className="shipping__form__label">
                                                <Phone className="shipping__form__label__icon" />
                                                Mobile Number *
                                            </label>
                                            <input
                                                className={`shipping__form__input ${errors.mobile ? 'shipping__form__input--error' : ''}`}
                                                placeholder="Enter mobile number"
                                                type="text"
                                                name="mobile"
                                                value={formValues.mobile}
                                                onChange={handleChange}
                                            />
                                            {errors.mobile && <p className="shipping__form__error">{errors.mobile}</p>}
                                        </div>

                                        <div className="shipping__form__group">
                                            <label className="shipping__form__label">Landmark *</label>
                                            <input
                                                className={`shipping__form__input ${errors.add_title ? 'shipping__form__input--error' : ''}`}
                                                placeholder="Nearby landmark"
                                                type="text"
                                                name="add_title"
                                                value={formValues.add_title}
                                                onChange={handleChange}
                                            />
                                            {errors.add_title && <p className="shipping__form__error">{errors.add_title}</p>}
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="shipping__form__group">
                                        <label className="shipping__form__label">
                                            <Home className="shipping__form__label__icon" />
                                            Address *
                                        </label>
                                        <textarea
                                            className={`shipping__form__textarea ${errors.address ? 'shipping__form__input--error' : ''}`}
                                            placeholder="Enter your complete address"
                                            name="address"
                                            value={formValues.address}
                                            onChange={handleChange}
                                        />
                                        {errors.address && <p className="shipping__form__error">{errors.address}</p>}
                                    </div>

                                    {/* City & State */}
                                    <div className="shipping__form__row">
                                        <div className="shipping__form__group">
                                            <label className="shipping__form__label">City *</label>
                                            <input
                                                className={`shipping__form__input ${errors.city ? 'shipping__form__input--error' : ''}`}
                                                placeholder="Enter city"
                                                type="text"
                                                name="city"
                                                value={formValues.city}
                                                onChange={handleChange}
                                            />
                                            {errors.city && <p className="shipping__form__error">{errors.city}</p>}
                                        </div>

                                        <div className="shipping__form__group">
                                            <label className="shipping__form__label">State *</label>
                                            <input
                                                className={`shipping__form__input ${errors.state ? 'shipping__form__input--error' : ''}`}
                                                placeholder="Enter state"
                                                type="text"
                                                name="state"
                                                value={formValues.state}
                                                onChange={handleChange}
                                            />
                                            {errors.state && <p className="shipping__form__error">{errors.state}</p>}
                                        </div>
                                    </div>

                                    {/* Country & Pincode */}
                                    <div className="shipping__form__row">
                                        <div className="shipping__form__group">
                                            <label className="shipping__form__label">
                                                <Globe className="shipping__form__label__icon" />
                                                Country *
                                            </label>
                                            <input
                                                className={`shipping__form__input ${errors.country ? 'shipping__form__input--error' : ''}`}
                                                placeholder="Enter country"
                                                type="text"
                                                name="country"
                                                value={formValues.country}
                                                onChange={handleChange}
                                            />
                                            {errors.country && <p className="shipping__form__error">{errors.country}</p>}
                                        </div>

                                        <div className="shipping__form__group">
                                            <label className="shipping__form__label">
                                                <Hash className="shipping__form__label__icon" />
                                                Pin Code *
                                            </label>
                                            <input
                                                className={`shipping__form__input ${errors.pincode ? 'shipping__form__input--error' : ''}`}
                                                placeholder="Enter pin code"
                                                type="number"
                                                name="pincode"
                                                value={formValues.pincode}
                                                onChange={handleChange}
                                            />
                                            {errors.pincode && <p className="shipping__form__error">{errors.pincode}</p>}
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="shipping__form__actions">
                                        <button type="button" onClick={() => setIsOpen(false)} className="shipping__form__cancel">
                                            Cancel
                                        </button>
                                        <button type="submit" className="shipping__form__submit">
                                            Save Address
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}


                        {/* Empty State */}
                        {/* {(!add_ship || add_ship.length === 0) && (
                            <div className="shipping__empty__state">
                                <div className="shipping__empty__icon">
                                    <Home className="shipping__empty__icon__svg" />
                                </div>
                                <h3 className="shipping__empty__title">No addresses found</h3>
                                <p className="shipping__empty__subtitle">Add your first shipping address to get started</p>
                                <button onClick={handleOpenNewAddress} className="shipping__empty__button">
                                    <AiOutlinePlus className="shipping__empty__button__icon" />
                                    Add Address
                                </button>
                            </div>
                        )} */}

                    </div>

                    {/* Delete Confirmation Modal */}
                    <Modal
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <div className="shipping__delete__modal">
                            <h2 className="shipping__delete__title">Delete Address?</h2>
                            <p className="shipping__delete__desc">
                                Are you sure you want to delete this address? This action cannot be undone.
                            </p>

                            <IoCloseSharp
                                className="shipping__delete__close"
                                onClick={handleCloseDelete}
                            />

                            <div className="shipping__delete__actions">
                                <button onClick={handleCloseDelete} className="shipping__cancel__btn">
                                    Cancel
                                </button>
                                <button onClick={handleAddressRemove} className="shipping__delete__btn">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </Modal>

                </div>
            </div>
        </div>
    );
}
