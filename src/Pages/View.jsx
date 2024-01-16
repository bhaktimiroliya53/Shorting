import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function View() {

    const [record, setRecord] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [sort, setSort] = useState("");
    const [status, setStatus] = useState("");
    const [filterdata, setfilterData] = useState([]);

    useEffect(() => {
        let all = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : [];
        setRecord(all);
    }, [])

    //Searching 

    useEffect(() => {
        if (searchName != "") {
            const searchData = record.filter(val => val.name.toLowerCase().includes(searchName.toLowerCase()))
            setRecord(searchData)
        } else if (searchName.length === 0) {
            let all = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : [];
            setRecord(all)
        }



    }, [searchName])

    // Shorting

    useEffect(() => {
        let result = [...record];
        if (sort != "") {
            if (sort === "descending") {
                result = [...record].sort((a, b) => {
                    return b.name.localeCompare(a.name);
                });
            } else if (sort === "ascending") {
                result = [...record].sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }
            else if (sort === 'Numberascending') {
                result = [...record].sort((a, b) => a.id - b.id);
            }
            setRecord(result);
            console.log(result);
        }
    }, [sort])

    //status record
    useEffect(() => {
        if (status != "") {
            let original = [...record];
            original.filter((val) => {
                return val.status === status
            })
            setfilterData(original)
            
        }
    }, [status])

    const resetFilter = () => {
        let all = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []
        setRecord(all);
        setSearchName("");
    }
    const deleteRecod = (id) => {
        let deleteData = record.filter(val => val.id != id);
        setRecord(deleteData);
        localStorage.setItem('user', JSON.stringify(deleteData))
    }

    return (
        <center>
            <h1 className='my-4'>View Page</h1>
            <div className="container">

                <form className="d-flex my-4">

                    <input className="form-control me-2" type="search" placeholder="Search" onChange={(e) => setSearchName(e.target.value)} value={searchName} />

                    <button className="btn btn-outline-success" onClick={() => resetFilter()}>Reset</button>
                </form>

                {
                    record.length == 0 ? (<p>Record not found</p>) : ""
                }

                <h2>Name wise sort :-</h2>
                <select style={{ fontSize: '18px' }} onChange={(e) => setSort(e.target.value)}>
                    <option>---sort---</option>
                    <option value="ascending">Accending</option>
                    <option value="descending">Decending</option>
                    <option value="Numberascending">NumberAscending</option>
                </select>
                <br></br><br></br>

                <h2> Status wise filter :-</h2>
                <select style={{ fontSize: '18px' }} onChange={(e) => setStatus(e.target.value)} >
                    <option>---status---</option>
                    <option value="Front-End">Front-End</option>
                    <option value="Back-End">Back-End</option>
                    <option value="Full-Stack">Full-Stack</option>

                </select><br></br><br></br>

                <div className="wrapper-tbl">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">UserName</th>
                                <th scope="col">Password</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterdata.length != 0 ? (

                                    filterdata.map((val) => {
                                        return (
                                            <tr key={val.id}>
                                                <td>{val.id}</td>
                                                <td>{val.name}</td>
                                                <td>{val.password}</td>
                                                <td>{val.status}</td>
                                                <td>
                                                    <button className='btn btn-primary' onClick={() =>  deleteRecod(val.id)}>Delete</button>


                                                    <Link to={`/Edit/${val.id}`}>
                                                        <button className='btn btn-danger ms-3' >Edit</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    record.map((val) => {
                                        return (
                                            <tr key={val.id}>
                                                <td>{val.id}</td>
                                                <td>{val.name}</td>
                                                <td>{val.password}</td>
                                                <td>{val.status}</td>
                                                <td>
                                                    <button className='btn btn-primary' onClick={() => deleteRecod(val.id)}>Delete</button>


                                                    <Link to={`/Edit/${val.id}`}>
                                                        <button className='btn btn-danger ms-3' >Edit</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Link to={'/Add'} style={{ color: 'black', fontSize: '32px' }} >Add</Link>
        </center>
    )
}

export default View