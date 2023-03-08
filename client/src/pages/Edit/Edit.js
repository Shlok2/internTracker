import React,{useState,useEffect,useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./edit.css"
import Card from "react-bootstrap/Card";
import {Button,Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import TextField from '@material-ui/core/TextField';
import { ToastContainer,toast } from 'react-toastify';
import Spiner from '../../components/Spiner/Spiner';
import { singleUsergetfunc,editfunc } from '../../services/Apis';
import 'react-toastify/dist/ReactToastify.css';
import { updateData } from '../../components/context/ContextProvider';

const Edit = () => {

  const [inputData,setInputData] = useState({
    name: "",
    stage: "",
    platform: "",
    notes: ""
  });

  const [status,setStatus] = useState("");
  const [date,setDate] = useState(new Date());
  const [showspin,setShowSpin] = useState(true);

  const {update,setUpdate} = useContext(updateData);
  
  const navigate = useNavigate();
  const {id} = useParams();

  // Status Options
  const options = [
    { value: 'Applied', label: 'Applied' },
    { value: 'Not-Applied', label: 'Not-Applied' },
    { value: 'In-Contact', label: 'In-Contact' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  // Set Input Values
  const setInputValue = (e) => {
    const {name,value} = e.target;
    setInputData({...inputData,[name]:value})
  }

  const setStatusValue = (e) => {
    setStatus(e.value);
  } 

  const setDateValue = (e) => {
    setDate(e);
  }

  // This function is use to get data for which we presses edit button 
  // (from backend).
  // Same details to fetch as clicking on 'View' button in frontend.
  const userProfileGet = async() => {
    const response = await singleUsergetfunc(id);

    if(response.status === 200){
      setInputData(response.data);
      setStatus(response.data.status);
      setDate(response.data.date);
    }else{
      console.log("error");
    }
  }

  const submitUserData = async(e) => {
    e.preventDefault();
    const {name,stage,platform,notes} = inputData;

    if(name === ""){
      toast.error("Company Name is required !");
    }
    else if(stage === ""){
      toast.error("Stage is required !");
    }
    else if(platform === ""){
      toast.error("Platform is required !");
    }
    else if(status === ""){
      toast.error("Status is required !");
    }
    else{
      const data =  new FormData();
      // toast.success("Job Profile Successfully Added !");
      data.append("name",name);
      data.append("stage",stage);
      data.append("platform",platform);
      data.append("notes",notes);
      data.append("status",status);
      data.append("date",date.toString());

      const config = {
        "Content-Type": "multipart"/"form-data"
      }

      const response = await editfunc(id,data,config);
      if(response.status === 200){
        setUpdate(response.data)
        navigate("/");
      }
    }
  }

  useEffect(() =>{
    userProfileGet();
  },[id])

  useEffect(() => {
    
    setTimeout(() => {
      setShowSpin(false);
    },1200)
  },[])

  return (
    <>
      {
        showspin ? <Spiner/> : 
          <div className="container">
          <h2 className='text-center mt-1'>Update Your Details</h2>
          <Card className='shadow mt-3 p-3'>
            <div className="profile_div text-center">
              <img src="/man.png" alt="img" />
            </div>

            <Form>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" name="name" value={inputData.name} onChange={setInputValue} placeholder="Enter Company Name" />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Stage</Form.Label>
                  <Form.Control type="text" name="stage" value={inputData.stage} onChange={setInputValue} placeholder="Enter Stage" />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Platform</Form.Label>
                  <Form.Check
                    className='col-lg-3'
                    type={"radio"}
                    label={`Internshala`}
                    name="platform"
                    value="Internshala"
                    checked={inputData.platform === "Internshala" ? true: false}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    className='col-lg-3'
                    type={"radio"}
                    label={`AngelList`}
                    name="platform"
                    value="AngelList"
                    checked={inputData.platform === "AngelList" ? true: false}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    className='col-lg-3'
                    type={"radio"}
                    label={`Other`}
                    name="platform"
                    value="Other"
                    checked={inputData.platform === "Other" ? true: false}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Status</Form.Label>
                  <Select onChange={setStatusValue} default={status} options={options}/>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Last Date</Form.Label><br/>
                  <DatePicker onChange={setDateValue} value={date} />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-12" controlId="formBasicEmail">
                  <Form.Label>Notes</Form.Label>
                  <TextField
                    value={inputData.notes}
                    name='notes'
                    onChange={setInputValue}
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Enter Special Points"
                    multiline
                    maxRows={5}
                  />
                </Form.Group>
              
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" onClick={submitUserData}> 
                    Submit
                  </Button>
                </div>

              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-center"/>
        </div>
      }
      
    </>
  )
}

export default Edit