import { useState } from "react";
import api from "../api"
import {useNavigate} from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/form.css'
import LoadingIndicator from "./LoadingIndicator";

function Form({route, method}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState("")

    const name = method === "login" ? "Login" : "Register";

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault();
        try{
            const res = await api.post(route, {username, password});
            console.log(import.meta.env.VITE_API_URL);
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
                navigate("/");
            }else{
                navigate("/login");
            }
        }catch (err){
            console.log(err);
            console.log(" API ", import.meta.env.VITE_API_URL);
            alert(err);
        }
        finally{
            setLoading(false)
        }
    };
    
    return <div>
        <form onSubmit={handleSubmit} className="form-container" >
            <h1>{name}</h1>
            <input 
                className="form-input" 
                type="text" value={username} 
                onChange={(e)=>{setUsername(e.target.value)}}
                placeholder="Username"
            />
            <input 
                className="form-input" 
                type="password" value={password} 
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder="Password"
            />
            {loading && <LoadingIndicator /> }
            <button
                className="form-button" type="submit">
                {name}
            </button>
        </form>
    </div>
}

export default Form;