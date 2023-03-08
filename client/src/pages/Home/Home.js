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
import { usergetfunc,deletfunc,exporttocsvfunc } from '../../services/Apis';
import {toast} from 'react-toastify';

const Home = () => {

  // This will store all the database content entries.
  const [userdata,setUserData] = useState([]);
  const [showspin,setShowSpin] = useState(true);
  const [search,setSearch] = useState("");
  const [platform,setPlatform] = useState("All");
  const [status,setStatus] = useState("All");
  const [sort,setSort] = useState("new");
  const [page,setPage] = useState(1);
  const [pageCount,setPageCount] = useState(0);

  const {useradd,setUseradd} = useContext(addData);
  const {update,setUpdate} = useContext(updateData);
  const {deldata,setDeldata} = useContext(dltdata);

  const navigate = useNavigate();

  const addintern = () => {
    navigate("/register");
  }

  // get user
  const userGet = async() => {
    const response = await usergetfunc(search,platform,status,sort,page)
    // Store all the data coming from db to userdata state
    if(response.status === 200){
      setUserData(response.data.usersdata);
      setPageCount(response.data.Pagination.pageCount);
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

  // export User
  const exportuser = async() => {
    const response = await exporttocsvfunc();
    if(response.status === 200){
      window.open(response.data.downloadUrl,"blank");
    }
    else{
      toast.error("Error !");
    }
  }

  // Pagination
  // handle previous button
  const handlePrevious = () => {
    setPage(() => {
      if(page === 1) return page;
      return page - 1;
    })
  }

  // handle next button
  const handleNext = () => {
    setPage(() => {
      if(page === pageCount) return page;
      return page + 1;
    })
  }

  useEffect(() => {
    userGet()
    setTimeout(() => {
      setShowSpin(false);
    },1200)
  },[search,platform,status,sort,page])

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
                  onChange={(e) => setSearch(e.target.value)}
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
              <Button className='export_btn' onClick={exportuser}>Export To CSV</Button>
            </div>
            <div className="filter_platform">
              <div className="filter">
                <h3>Filter By Platform</h3>
                <div className=" d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="platform"
                    value="All"
                    onChange={(e) => setPlatform(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Internshala`}
                    name="platform"
                    value="Internshala"
                    onChange={(e) => setPlatform(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`AngelList`}
                    name="platform"
                    value="AngelList"
                    onChange={(e) => setPlatform(e.target.value)}
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
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>setSort("new")}>New</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setSort("edited")}>Last Edited</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setSort("old")}>Old</Dropdown.Item>
                </Dropdown.Menu>
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
                    <Dropdown.Item onClick={()=>setStatus("All")}>All</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setStatus("Applied")}>Applied</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setStatus("Not-Applied")}>Not-Applied</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setStatus("In-Contact")}>In-Contact</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setStatus("Rejected")}>Rejected</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
        {
          showspin ? <Spiner/> : <Tables
                                    userdata={userdata}
                                    deleteUser={deleteUser}
                                    userGet={userGet}
                                    handlePrevious = {handlePrevious}
                                    handleNext = {handleNext}
                                    page = {page}
                                    pageCount = {pageCount}
                                    setPage = {setPage}
                                  />
        } 

      </div>
    </>
  )
}

export default Home