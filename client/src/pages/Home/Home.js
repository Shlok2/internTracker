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
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
  },[search,platform,status,sort,page]) // eslint-disable-line react-hooks/exhaustive-deps

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
            <Card className='shadow'>
              <Card.Header style={{width:"266px"}} className="text-center">
                <h3>Export To Csv</h3>
              </Card.Header>
              <div className="export_csv text-center mt-2">
                <Button className='export_btn' onClick={exportuser}>Export</Button>
              </div>
            </Card>

            <Card className='shadow'>
            <div className="filter_platform">
              <div className="filter">
                <Card.Header className="text-center">
                  <h3>Filter By Platform</h3>
                </Card.Header>
                <Card.Body>
                <div className="d-flex justify-content-between">
                  <Form.Check
                    inline
                    type={"radio"}
                    label={`All`}
                    name="platform"
                    value="All"
                    onChange={(e) => setPlatform(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    inline
                    type={"radio"}
                    label={`Internshala`}
                    name="platform"
                    value="Internshala"
                    onChange={(e) => setPlatform(e.target.value)}
                  />
                  <Form.Check
                    inline
                    type={"radio"}
                    label={`AngelList`}
                    name="platform"
                    value="AngelList"
                    onChange={(e) => setPlatform(e.target.value)}
                  />
                </div>
                </Card.Body>
              </div>
            </div>
            </Card>

            {/* Sort by value */}
            <Card className='shadow' style={{width:"266px"}}>
            <div className="filter_newold">
              <Card.Header className="text-center">
              <h3>Sort By Date</h3>
              </Card.Header>
              {/* <Dropdown className='text-center mt-2'> */}
              <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="light"
                    menuVariant="dark"
                    title=<i className="fa-solid fa-sort"></i>
                    className="text-center mt-2 dropdown_btn"
                  >    
                  <Dropdown.Item onClick={()=>setSort("new")}>New</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setSort("edited")}>Last Edited</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setSort("old")}>Old</Dropdown.Item>
              </DropdownButton>
            </div>
            </Card>

            {/* Filter By Status */}
            <Card className='shadow' style={{width:"266px"}}>
            <div className="filter_status">
              <div className="status">
                <Card.Header className="text-center">
                <h3>Filter By Status</h3>
                </Card.Header>
                <div className="status_radio d-flex justify-content-around flex-wrap">
                
                  <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="success"
                    menuVariant="dark"
                    title="Select Status"
                    className="text-center mt-2"
                  >
                    <Dropdown.Item onClick={()=>setStatus("All")}>All</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setStatus("Applied")}>Applied</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setStatus("Not-Applied")}>Not-Applied</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setStatus("In-Contact")}>In-Contact</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setStatus("Rejected")}>Rejected</Dropdown.Item>
                </DropdownButton>
                </div>
              </div>
            </div>
            </Card>
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