import React from 'react'
import { TextField, Card, Button } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StorageIcon from '@mui/icons-material/Storage';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';



const Update = () => {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [city, setCity] = useState("")

    // const [user,setUser] = useState("")

    const history = useHistory()

    const { _id } = useParams()
    // console.log("idddd",_id);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = { fullName: fullName, email: email, mobile: mobile, city: city, _id: _id }

        const responce = axios.post('http://localhost:8000/employee/update', body)
    
        if((await responce).status===200){
            history.push("/")
                toast.success("Updated Sucessfully",{
                    hideProgressBar:true,
                    autoClose: 2000    
                })
        }
    }

    useEffect(() => {
        if (_id) {
            getSingleUser(_id)
        }
    }, [_id])

    const getSingleUser = async (_id) => {
        const result = await axios.get(`http://localhost:8000/employee/${_id}`)
        const Data = result.data.employee
        setFullName(Data.fullName)
        setEmail(Data.email)
        setMobile(Data.mobile)
        setCity(Data.city)
        
    }

    return (
        <>
            <div className="home">
                <Card className="p-3 mt-5 ms-lg-5 me-lg-5">
                    <h5>Update Employee</h5>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="mt-2">Full Name</label>
                            <TextField size="small" type="text" variant="outlined" label="Enter name" className="mt-2" fullWidth required name="fullName" value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
                        </div>
                        <div className="mt-3">
                            <label>Email</label>
                            <TextField size="small" type="email" variant="outlined" label="Enter Email" className="mt-2" fullWidth required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="mt-3 row">
                            <div className="col">
                                <label>Mobile Number</label>
                                <TextField size="small" type="number" variant="outlined" label="Enter Mobile Number" className="mt-2" fullWidth required value={mobile} onChange={(e) => { setMobile(e.target.value) }} />
                            </div>
                            <div className="col">
                                <label>City</label>
                                <TextField size="small" type="text" variant="outlined" label="Enter City" className="mt-2" fullWidth required value={city} onChange={(e) => { setCity(e.target.value) }} />
                            </div>
                        </div>
                        <div className="mt-4 row">
                            <Button variant="contained" startIcon={<ThumbUpIcon />} className="col-1 ms-3 text-capitalize" type="submit">Submit</Button>
                            <Button variant="contained" startIcon={<StorageIcon />} className="col-1 ms-3 text-capitalize" color="warning">ViewAll</Button>
                        </div>

                    </form>

                </Card>
            </div>
        </>
    )
}

export default Update
