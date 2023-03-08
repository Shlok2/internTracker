import React,{useState,useEffect,useContext} from 'react';
import "./home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from "react-bootstrap/Dropdown";
import Spiner from '../../components/Spiner/Spiner';
import {useNavigate} from 'react-router-dom';
import Tables from '../../components/Tables/Tables';
import Alert from 'react-bootstrap/Alert';
import { addData,updateData,dltdata } from '../../components/context/ContextProvider';
import { usergetfunc,deletfunc } from '../../services/Apis';
import {toast} from 'react-toastify';

const Home = () => {

  // This will store all the database content entries.
  const [userdata,setUserData] = useState([]);
  const [showspin,setShowSpin] = useState(true);

  const {useradd,setUseradd} = useContext(addData);
  const {update,setUpdate} = useContext(updateData);
  const {deldata,setDeldata} = useContext(dltdata);

  const navigate = useNavigate();

  const addintern = () => {
    navigate("/register");
  }

  // get user
  const userGet = async() => {
    const response = await usergetfunc()

    // Store all the data coming from db to userdata state
    if(response.status === 200){
      setUserData(response.data)
    }
    else{
      console.log("error for get user data");
    }
  }

  // delete user
  // This func is passes as props to Tables and will be called from there.
  const deleteUser = async(id) => {
    const response = await deletfunc(id);
    if(response.status === 200){
      userGet();
      setDeldata(response.data);
    }
    else{
      toast.error("error");
    }
  }

  useEffect(() => {
    userGet()
    setTimeout(() => {
      setShowSpin(false);
    },1200)
  },[])

  return (
    <>
    {/* When comany/user added -> then show this Alert message.*/}
    {
      useradd ? <Alert variant='success' onClose={() => setUseradd("")} dismissible>{useradd.name.toUpperCase()} Added Successfully</Alert> : ""
    }
    {
      update ? <Alert variant='primary' onClose={() => setUpdate("")} dismissible>{update.name.toUpperCase()}  Updated Successfully</Alert> : ""
    }
    {
      deldata ? <Alert variant='danger' onClose={() => setDeldata("")} dismissible>{deldata.name.toUpperCase()}  Deleted Successfully</Alert> : ""
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
          showspin ? <Spiner/> : <Tables
                                    userdata={userdata}
                                    deleteUser={deleteUser}
                                  />
        } 

      </div>
    </>
  )
}

export default Home