import React from 'react'
import { TextField, Card, Button } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StorageIcon from '@mui/icons-material/Storage';
// import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 
import * as Yup from 'yup';
import { useFormik } from "formik"


const Validation = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const history = useHistory()


    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            mobile: '',
            city: ''
        },
        onSubmit:async (val) => {
                // e.preventDefault()        
                const body = { fullName: val.fullName, email: val.email, mobile: val.mobile, city: val.city }
                const result = axios.post('http://localhost:8000/employee/add', body)
        
                console.log("gfgv",result);
        
                if((await result).status===200){
                    history.push("/")
                    toast.success("Added Sucessfully",{
                        hideProgressBar:true,
                        autoClose: 2000,
                    })
                  }       
                console.log(val);
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Required!!').max(15),
            email: Yup.string().email('Invalid Email').required('Required!!'),
            mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required!!').length(10),
            city:Yup.string().required("Required!!").max(10)
        })
    })

    

    // console.log(formik.values);

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
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullName} />
                            <div>
                                {
                                    formik.touched.fullName && formik.errors.fullName ? (
                                        <div className="text-danger">
                                            {formik.errors.fullName}
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                        <div className="mt-3">
                            <label>Email</label>
                            <TextField size="small" type="email" variant="outlined"
                                id="email" name="email" label="Enter Email"
                                className="mt-2" fullWidth
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            <div>
                                {
                                    formik.touched.email && formik.errors.email ? (
                                        <div className="text-danger">
                                            {formik.errors.email}
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label className="mt-2">Mobile Number</label>
                                <TextField size="small" type="number" variant="outlined" id="mobile"
                                    name="mobile"
                                    label="Enter name" className="mt-2" fullWidth
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobile} />
                                <div>
                                    {
                                        formik.touched.mobile && formik.errors.mobile ? (
                                            <div className="text-danger">
                                                {formik.errors.mobile}
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </div>
                            <div className="col">
                                <label className="mt-2">City</label>
                                <TextField size="small" type="text" variant="outlined" id="city"
                                    name="city"
                                    label="Enter name" className="mt-2" fullWidth
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
                                <div>
                                    {
                                        formik.touched.city && formik.errors.city ? (
                                            <div className="text-danger">
                                                {formik.errors.city}
                                            </div>
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

export default Validation
