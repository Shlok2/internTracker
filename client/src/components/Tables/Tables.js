import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import './table.css';

const Tables = () => {
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
                  <tr>
                    <td>1</td>
                    <td>Amazon</td>
                    <td>Internshala</td>
                    <td>20/10/2002</td>
                    <td>1st Round</td>
                    <td className='d-flex align-items-center'>
                      <Dropdown className='text-center'>
                        <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                          <Badge bg="primary">
                            Applied <i class="fa-solid fa-angle-down"></i>
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
                          {/* <Badge bg="primary"> */}
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                          {/* </Badge> */}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <i class="fa-solid fa-eye" style={{color:"green"}}></i>&nbsp; <span>View</span>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <i class="fa-solid fa-pen-to-square" style={{color:"blue"}}></i>&nbsp; <span>Edit</span>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <i class="fa-solid fa-trash" style={{color:"red"}}></i>&nbsp; <span>Delete</span>
                          </Dropdown.Item>
                          
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
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