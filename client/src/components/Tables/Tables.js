import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { NavLink } from 'react-router-dom';
import { statusChangefunc } from '../../services/Apis';
import {ToastContainer,toast} from "react-toastify";
import './table.css';

const Tables = ({userdata,deleteUser,userGet}) => {
  const selectColor = (ele) => {
    if (ele === "Applied"){
      // setCol("primary");
      return "primary";
    }
    else if (ele === "Not-Applied"){
      // setCol("primary");
      return "secondary";
    }
    else if (ele === "In-Contact"){
      // setCol("primary");
      return "success";
    }
    else{
      return "danger";
    }
  }

  const handleChange = async(id,status) => {
    const response = await statusChangefunc(id,status);

    if(response.status === 200){
      userGet();
      toast.success("Status Updated");
    }
    else{
      toast.error("Error");
    }
  }

  return (

    <>
      <div className='container'>
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive='sm'>
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>Id</th>
                    <th>CompanyName</th>
                    <th>Platform</th>
                    <th>LastDate</th>
                    <th>Stage</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                  userdata.length > 0 ? userdata.map((element,index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{element.name}</td>
                          <td>{element.platform}</td>
                          <td>{element.date.slice(0,10)}</td>
                          <td>{element.stage}</td>
                          <td className='d-flex align-items-center'>
                            <Dropdown className='text-center'>
                              <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                {/* <Badge bg={(element.status === "Applied" || element.status === "In-Contact") ? "primary":"danger"}> */}
                                <Badge bg={selectColor(element.status)}>
                                  {element.status} <i className="fa-solid fa-angle-down"></i>
                                </Badge>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>handleChange(element._id,"Applied")}>Applied</Dropdown.Item>
                                <Dropdown.Item onClick={()=>handleChange(element._id,"Not-Applied")}>Not-Applied</Dropdown.Item>
                                <Dropdown.Item onClick={()=>handleChange(element._id,"In-Contact")}>In-Contact</Dropdown.Item>
                                <Dropdown.Item onClick={()=>handleChange(element._id,"Rejected")}>Rejected</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>
                          <Dropdown className='text-center'>
                              <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                  <i className="fa-solid fa-ellipsis-vertical"></i>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none">
                                    <i className="fa-solid fa-eye" style={{color:"green"}}></i>&nbsp; <span>View</span>
                                  </NavLink>                                
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <NavLink to={`/edit/${element._id}`} className="text-decoration-none">
                                    <i className="fa-solid fa-pen-to-square" style={{color:"blue"}}></i>&nbsp; <span>Edit</span>
                                  </NavLink> 
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <div onClick={()=>deleteUser(element._id)}>
                                    <i className="fa-solid fa-trash" style={{color:"red"}}></i>&nbsp; <span>Delete</span>
                                  </div>
                                </Dropdown.Item>
                                
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      </>
                    )
                  }) : <div className='no_data text-center'>No Data Found</div>
                }
                  
                </tbody>      
              </Table>
            </Card>
          </div>
        </Row>
        <ToastContainer/>
      </div>
    </>
  )
}

export default Tables