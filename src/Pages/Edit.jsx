import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Edit() {

    const { id } = useParams();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [record, setRecord] = useState([]);
    const navigate = useNavigate()

    const handelSubmit = () => {
        if (!name || !password) {
            alert("All field are required");
            return false;
        }

        let updateData = record.map((val) => {
            if (val.id == id) {
                return {
                    ...val,
                    name: name,
                    password: password,
                }
            } return val;
        })
        setRecord(updateData);
        localStorage.setItem('user', JSON.stringify(updateData));
        // alert("Record Upadate");
        navigate('/')
    }

    useEffect(() => {
        let all = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : [];
        setRecord(all);
        let singale = all.find(val => val.id == id);
        setName(singale.name);
        setPassword(singale.password);
    }, [id])



    return (
        <center>
            <div className="wrapper">
                <div className="login_box">
                    <div className="login-header">
                        <span>Add</span>
                    </div>
                    <div className="input_box">
                        <input type="text" id="user" className="input-field" required value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="user" className="label">Username</label>
                        <i className="bx bx-user icon" />
                    </div>
                    <div className="input_box">
                        <input type="password" id="pass" className="input-field" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="pass" className="label">Password</label>
                        <i className="bx bx-lock-alt icon" />
                    </div>

                    <div className="input_box">
                        <button type="submit" onClick={handelSubmit} className="input-submit" style={{ color: 'black' }}>Submit</button>
                    </div>
                    <div className="register">
                        <span>Don't have an account? <a href="#">Register</a></span>
                    </div>
                </div>
                <Link to={'/'} style={{ color: 'black', fontSize: '32px' }}>View</Link>
            </div>

        </center>
    )
}

export default Edit