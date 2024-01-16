import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Add() {

    const [name , setName] = useState('');
    const [password , setPassword] = useState('');
    const [record , setRecord] = useState([]);
    const [status,setStatus] = useState("");
    const id = Math.floor(Math.random() * 100);
    const navigate = useNavigate()

    const handelSubmit = () => {
        if (!name || !password) {
            alert("All field are required");
            return false;
        }
        let obj = {name , password , id}
        let allData = [...record , obj];
        setRecord(allData);
        localStorage.setItem('user' , JSON.stringify(allData));
        setName('');
        setPassword('')
        navigate('/' , {state : allData});
    }

    useEffect(() => {
        let all = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : [];
        setRecord(all);
    },[])

    return (
        <center>
            <div className="wrapper">
                <div className="login_box">
                    <div className="login-header">
                        <span>Add</span>
                    </div>
                    <div className="input_box">
                        <input type="text" id="user" className="input-field" required value={name} onChange={ (e) => setName(e.target.value)}/>
                        <label htmlFor="user" className="label">Username</label>
                        <i className="bx bx-user icon" />
                    </div>
                    <div className="input_box">
                        <input type="password" id="pass" className="input-field" required value={password} onChange={ (e) => setPassword(e.target.value)}/>
                        <label htmlFor="pass" className="label">Password</label>
                        <i className="bx bx-lock-alt icon" />
                    </div>

                    <div className="input_box">
                    <label htmlFor="pass" className="label">Status</label>
                        <button className="input-status" >
                            <select style={{fontSize :'18px'}} value={status} onChange={ (e) => setStatus(e.target.value) }>
                                <option>---select status---</option>
                                <option value="Front-End">Front-End</option>
                                <option value="Back-End">Back-End</option>
                                <option value="Full-Stack">Full-Stack</option>
                            </select>
                        </button>
                    </div>

                    <div className="input_box">
                        <button type="submit" onClick={handelSubmit} className="input-submit" style={{color : 'black'}}>Submit</button>
                    </div>
                </div>
            <Link to={'/'} style={{color : 'black', fontSize : '32px'}}>View</Link>
            </div>

        </center>
    )
}

export default Add