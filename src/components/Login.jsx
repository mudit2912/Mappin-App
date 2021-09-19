import { useState, useRef } from "react";
import ExploreIcon from "@material-ui/icons/Explore";
import { Cancel } from "@material-ui/icons";
import axios from "axios";
import "./login.css";

export default function Login({setShowLogin, myStorage, setCurrUser}) {
    const [failure, setFailure] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value
        };
        try {
            const res = await axios.post("/users/login", user);
            setCurrUser(res.data.username);
            myStorage.setItem("user", res.data.username)
            setShowLogin(false);

        } catch (err) {
           setFailure(true); 
        }
    }
    return (
        <div className="loginContainer">
            <div className="logo">
                <ExploreIcon />
                MaPPin'
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={nameRef} />
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button className="login">Login</button>
                {failure && <span className="failure">Oops! Something went wrong</span>}
            </form>
            <Cancel className="loginCancel" onClick={() => setShowLogin(false)}></Cancel>
        </div>
    )
}