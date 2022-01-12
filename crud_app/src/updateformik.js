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
import * as Yup from 'yup';
import { useFormik } from "formik"


const Update = () => {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [city, setCity] = useState("")
    const [Data ,setData] = useState("")

    // const [fullName] = useField(Data.fullName)

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    // const [user,setUser] = useState("")

    const history = useHistory()

    const { _id } = useParams()
    // console.log("idddd",_id);

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            fullName: fullName,
            email: email,
            mobile: mobile,
            city: city
        },
        onSubmit:async (val) => {

            const body = { fullName: val.fullName, email: val.email, mobile: val.mobile, city: val.city, _id: _id }

                const responce = axios.post('http://localhost:8000/employee/update', body)
            
                if((await responce).status===200){
                    history.push("/")
                        toast.success("Updated Sucessfully",{
                            hideProgressBar:true,
                            autoClose: 2000,
                            theme:'colored'    
                        })
                }
               
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Required!!').max(15),
            email: Yup.string().email('Invalid Email').required('Required!!'),
            mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required!!').length(10),
            city:Yup.string().required("Required!!").max(10)
        }),
        
    })

    useEffect(() => {
        if (_id) {
            getSingleUser(_id)
        }
    }, [_id])

    const getSingleUser = async (_id) => {
        const result = await axios.get(`http://localhost:8000/employee/${_id}`)
        const Data = result.data.employee
        setData(Data)
        setFullName(Data.fullName)
        setEmail(Data.email)
        setMobile(Data.mobile)
        setCity(Data.city)
    }

    return (
        <>
          <div className="home">
                <Card className="p-3 mt-5 ms-lg-5 me-lg-5">
                    <h5>Insert Employee</h5>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label className="mt-2">Full Name</label>
                            <TextField size="small" type="text" variant="outlined" id="fullName"
                                name="fullName"
                                label="Enter name" className="mt-2" fullWidth
                                autoComplete='off'
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullName} />
                            <div>
                                {
                                    formik.touched.fullName && formik.errors.fullName ? (
                                        <small className="text-danger">
                                            {formik.errors.fullName}
                                        </small>
                                    ) : null
                                }
                            </div>
                        </div>
                        <div className="mt-3">
                            <label>Email</label>
                            <TextField size="small" type="email" variant="outlined"
                                id="email" name="email" label="Enter Email"
                                className="mt-2" fullWidth
                                autoComplete='off'
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            <div>
                                {
                                    formik.touched.email && formik.errors.email ? (
                                        <small className="text-danger">
                                            {formik.errors.email}
                                        </small>
                                    ) : null
                                }
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="mt-2">Mobile Number</label>
                                <TextField size="small" type="number" variant="outlined" id="mobile"
                                    name="mobile"
                                    label="Enter name" className="mt-2" fullWidth
                                    autoComplete='off'
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobile} />
                                <div>
                                    {
                                        formik.touched.mobile && formik.errors.mobile ? (
                                            <small className="text-danger">
                                                {formik.errors.mobile}
                                            </small>
                                        ) : null
                                    }
                                </div>
                            </div>
                            <div className="col">
                                <label className="mt-2">City</label>
                                <TextField size="small" type="text" variant="outlined" id="city"
                                    name="city"
                                    label="Enter name" className="mt-2" fullWidth
                                    autoComplete='off'
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
                                <div>
                                    {
                                        formik.touched.city && formik.errors.city ? (
                                            <small className="text-danger">
                                                {formik.errors.city}
                                            </small>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 row">
                            <Button variant="contained" startIcon={<ThumbUpIcon />} className="col-1 ms-3 text-capitalize" type="submit" >Submit</Button>
                            <Button variant="contained" startIcon={<StorageIcon />} className="col-1 ms-3 text-capitalize" color="warning">ViewAll</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    )
}

export default Update
