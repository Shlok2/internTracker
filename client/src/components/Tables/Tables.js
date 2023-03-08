import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { NavLink } from 'react-router-dom';
import './table.css';

const Tables = ({userdata}) => {
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
                                <Badge bg={(element.status === "Applied" || element.status === "In-Contact") ? "primary":"danger"}>
                                  {element.status} <i className="fa-solid fa-angle-down"></i>
                                </Badge>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>Applied</Dropdown.Item>
                                <Dropdown.Item>Not-Applied</Dropdown.Item>
                                <Dropdown.Item>In-Contact</Dropdown.Item>
                                <Dropdown.Item>Rejected</Dropdown.Item>
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
                                  <i className="fa-solid fa-trash" style={{color:"red"}}></i>&nbsp; <span>Delete</span>
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
      </div>
    </>
  )
}

export default Tables