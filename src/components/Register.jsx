import "./register.css";
import { useState, useRef } from "react";
import ExploreIcon from "@material-ui/icons/Explore";
import { Cancel } from "@material-ui/icons";
import axios from "axios";

export default function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        try {
            await axios.post("/users/register", newUser);
            setFailure(false);
            setSuccess(true);

        } catch (err) {
           setFailure(true); 
        }
    }
    return (
        <div className="registerContainer">
            <div className="logo">
                <ExploreIcon />
                MaPPin'
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={nameRef} />
                <input type="email" placeholder="email" ref={emailRef}/>
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button className="register">Become a member!</button>
                {success && (<span className="success">Success. You can start mappin'</span>)}
                {failure && (<span className="failure">Oops! Something went wrong</span>)}
            </form>
            <Cancel className="registerCancel" onClick={() => setShowRegister(false)}></Cancel>
        </div>
    )
}