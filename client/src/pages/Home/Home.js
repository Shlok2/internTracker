import React,{useState,useEffect,useContext} from 'react';
import "./home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from "react-bootstrap/Dropdown";
import Spiner from '../../components/Spiner/Spiner';
import {useNavigate} from 'react-router-dom';
import Tables from '../../components/Tables/Tables';
import Alert from 'react-bootstrap/Alert';
import { addData } from '../../components/context/ContextProvider';

const Home = () => {

  const [showspin,setShowSpin] = useState(true);

  const {useradd,setUseradd} = useContext(addData);

  const navigate = useNavigate();

  const addintern = () => {
    navigate("/register");
  }

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    },1200)
  },[])

  return (
    <>
    {/* When comany/user added -> then show this Alert message.*/}
    {
      useradd ? <Alert variant='success' onClose={() => setUseradd("")} dismissible>{useradd.name.toUpperCase()} Successfully Added</Alert> : ""
    }
      <div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="success" className='search_btn'>Search</Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={addintern}><i className="fa-solid fa-plus"></i>&nbsp; Add Internship</Button>
            </div>
          </div>

          {/* export to csv, filter by Platform, sort by date/time, filter by status */}
          <div className='filter_div mt-5 d-flex justify-content-between flex-wrap'>
            <div className="export_csv">
              <Button className='export_btn'>Export To CSV</Button>
            </div>
            <div className="filter_platform">
              <div className="filter">
                <h3>Filter By Platform</h3>
                <div className=" d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="platform"
                    value="ALL"
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Internshala`}
                    name="platform"
                    value="Internshala"
                  />
                  <Form.Check
                    type={"radio"}
                    label={`AngelList`}
                    name="platform"
                    value="AngelList"
                  />
                </div>
              </div>
            </div>

            {/* Sort by value */}
            <div className="filter_newold">
              <h3>Sort By Date</h3>
              <Dropdown className='text-center'>
                <Dropdown.Toggle variant='light' className='dropdown_btn' id="dropdown-basic">
                  <i className="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
              </Dropdown>
            </div>

            {/* Filter By Status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-around flex-wrap">
                <Dropdown className='text-center'>
                  <Dropdown.Toggle variant='success' id="dropdown-basic">
                    Select Status
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Applied</Dropdown.Item>
                    <Dropdown.Item>Not-Applied</Dropdown.Item>
                    <Dropdown.Item>In-Contact</Dropdown.Item>
                    <Dropdown.Item>Rejected</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          showspin ? <Spiner/> : <Tables/>
        } 

      </div>
    </>
  )
}

export default Home