'use client'
import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';
import { FaLocationArrow } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import { MdLocalPhone } from 'react-icons/md';

const SupportPage = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className='support_page'>
                <button onClick={handleOpen}>
                    Support
                </button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className='model_support_box'>
                    <div className='d-flex justify-content-between'>
                        <h2 style={{ fontSize: "40px" }}>Help & <span >Support</span></h2>
                        <IoMdClose style={{ fontSize: "24px", cursor: "pointer" }} onClick={handleClose} />
                    </div>
                    <div className='d-flex gap-5 flex-wrap'>
                        <div>
                            <div className='d-flex gap-3 mt-5'>
                                <div>
                                    <FaLocationArrow className='mt-1' style={{ fontSize: "30px" }} />
                                </div>
                                <div>
                                    <h2 className='mb-3' >Location</h2>
                                    <p style={{ color: "#737373" }}>Autoholic Parts Online Pvt. Ltd. <br />
                                        (Plot No. 2420 & 2430),<br /> Ground floor
                                        , Udyog Vihar Phase,<br /> Nikol,
                                        Bihar-122015, India.
                                    </p>
                                </div>
                            </div>
                            <div className='d-flex gap-3 mt-5'>
                                <div>
                                    <MdLocalPhone className='mt-1' style={{ fontSize: "30px" }} />
                                </div>
                                <div>
                                    <h2 className='mb-3' >Phone</h2>
                                    <p style={{ color: "#737373" }}>+91 98986 89569</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <form className='support_box'>
                                <input type="email" name="" placeholder='Email' /> <br />
                                <input type="name" name="" placeholder='Name' /><br />
                                <select>
                                    <option value=""> Question type </option>
                                    <option value=""> Help me find spare part for my car </option>
                                    <option value=""> Order related query </option>
                                    <option value="">  Refund and return related  </option>
                                    <option value="">  I want to become seller  </option>
                                    <option value="">  I want to become B2B customer   </option>
                                </select><br />
                                <textarea name="" id="" cols="10" rows="0" placeholder='Comment'></textarea><br />
                                <button disabled className='btn__cart mx-auto'>Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className='support_note'>
                        <h2>Note</h2>
                        <p className='mt-3' style={{ color: "#737373" }}>For assistance, please reach out to our customer support team, available every day from 10:00 AM to 7:00 PM. You can contact us through the Help & Support Form on our website and application. You can also use our IVR number: +91 98986 89569 </p>
                        <p style={{ color: "#737373" }}><span style={{ color: "red" }}>!WARNING!</span>  Do not call any other number except mentioned above. Please note, boodmo never calls & asks for bank account details, UPI id, OTP, etc. from the customer. We urge you not to share such information with anyone. In case of any fraudulent transaction, immediately notify your bank.</p>
                        <b>Our head office address:</b> <br />
                        <strong >Autoholic Parts Online Pvt. Ltd..
                            (Plot No. 2420 & 2430),<br /> Ground floor
                            , Udyog Vihar Phase,<br /> Nikol,
                            Bihar-122015, India.
                        </strong>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default SupportPage