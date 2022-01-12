import React, { useState } from 'react'
import { Card, Button, Divider, Table, Icon, } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import MaterialTable from 'material-table';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { toast } from 'react-toastify';


const Home = () => {

    const history = useHistory()

    const [res, setRes] = useState([])
    // const [ds, setDs] = useState([])
    console.log("res", res);


    useEffect(async () => {
        List()
    }, [])


    const List = async () => {
        const result = await axios.get('http://localhost:8000/employee/list')
        const Data = result.data.list
        setRes(Data)
    }

    const columns = [
        { title: "FullName", field: "fullName" },
        { title: "Email", field: "email" },
        { title: "City", field: "city" },
        { title: "Mobile Number", field: "mobile" },
        // { title: "ID", field: "_id" },
    ]

    return (
        <>
            <div className="home homeCard">
                <Card style={{marginTop:100}} className="p-3 ms-lg-5 me-lg-5">
                    <div className="row">
                        <Button variant="contained" color="default" className="text-capitalize col-auto ms-3"
                            startIcon={<AddIcon />}
                            onClick={() => {
                                history.push("/Insert")
                            }}>Create New
                        </Button>
                        <h4 className="col-auto">Employee List</h4>
                    </div>

                    <Divider variant="fullWidth" component="body" className="mt-2" />

                    {/* <Table className="table table-striped table-hover text-center table-secondary mt-2 table-bordered table-auto rounded-9">
                        <thead className="table-dark">
                            <tr>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>Mobile</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                res.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.fullName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.city}</td>
                                            <td>{item.mobile}</td>
                                            <td>
                                                <Button startIcon={<DeleteIcon className="ms-2" />} size="small" className="text-capitalize" onClick={
                                                    async () => {
                                                        if (window.confirm("Are you sure for delete?")) {
                                                            const responce = await axios.get(`http://localhost:8000/employee/delete/${item._id}`)
                                                            List()
                                                            toast.success("Delete Sucessfully",{
                                                                hideProgressBar:true,
                                                                autoClose: 2000,
                                                            })
                                                        }
                                                    }
                                                    }>
                                                </Button>
                                                <Button size="small" 
                                                    onClick={()=>{
                                                        history.push(`/update/${item._id}`)
                                                    }}
                                                startIcon={<Edit className="ms-2" />} >
                                                    
                                                </Button>
                                            </td>                                            
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table> */}

                    <MaterialTable
                        title="Employee List"
                        data={res}
                        columns={columns}

                        options={{
                            // search:false,
                            title: false,
                            // paging: false,
                            actionsColumnIndex: -1
                        }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit',
                                onClick: (event, rowData) => {
                                    history.push(`/update/${rowData._id}`)
                                }
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete',
                                onClick: async (event, rowData) => {
                                    const confirmBox = window.confirm("Do you really want to delete ")
                                    if (confirmBox === true) {
                                        const result = axios.get(`http://localhost:8000/employee/delete/${rowData._id}`)

                                        if ((await result).status === 200) {
                                            toast.success("Delete Sucessfully", {
                                                hideProgressBar: true,
                                                autoClose: 2000,
                                                theme:'colored',
                                            })
                                        }
                                        List()
                                    }
                                }
                            },  
                        ]}
                    />
                </Card>
            </div>
        </>
    )
}

export default Home
