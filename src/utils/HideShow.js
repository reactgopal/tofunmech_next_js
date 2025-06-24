import React from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const HideShow = ({ passwordShown, setPasswordShown, children }) => {
    // console.log(passwordShown, "passwordShown")
    console.log(children, "children")
    const handleClick = () => {
        console.log(passwordShown, " outer handle click passwordShown")

        if (passwordShown) {
            console.log(passwordShown, "inner if condition is called handle click passwordShown")
            setPasswordShown(false)
        }
        else {
            console.log(passwordShown, "inner else condition is called handle click passwordShown")
            setPasswordShown(true)
        }
    }

    return (
        <div className='relative' style={{ position: "relative" }}>
            {children}
            <button type='button' className="absolute bottom-1 top-1 right-1" style={{
                position: "absolute",
                top: "22%",
                right: "3%",
                background: "none",
                border: "0"
            }} onClick={handleClick}>
                {passwordShown ? <AiFillEye style={{ fontSize: "24px" }} /> : <AiFillEyeInvisible style={{ fontSize: "24px" }} />}
            </button >
        </div>
    )
}

export default HideShow