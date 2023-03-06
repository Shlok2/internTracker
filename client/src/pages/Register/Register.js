import React,{useState,useEffect} from 'react';
import "./register.css";
import Card from "react-bootstrap/Card";
import {Button,Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import TextField from '@material-ui/core/TextField';
import Spiner from '../../components/Spiner/Spiner';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [inputData,setInputData] = useState({
    name: "",
    stage: "",
    platform: "",
    notes: ""
  });
  // console.log(inputData);

  const [status,setStatus] = useState("");

  const [date,setDate] = useState(new Date());

  const [showspin,setShowSpin] = useState(true);

  // Status Options
  const options = [
    { value: 'Applied', label: 'Applied' },
    { value: 'Not-Applied', label: 'Not-Applied' },
    { value: 'In-Contact', label: 'In-Contact' },
    { value: 'Rejected', label: 'Rejected' },
  ];
  // console.log(inputData);
  // console.log(date);
  // console.log(status);

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

  const submitUserData = (e) => {
    e.preventDefault();
    const {name,stage,platform} = inputData;

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
      toast.success("Added Successfully !")
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      setShowSpin(false);
    },1200)
  },[])
  
  return (
    <>
      {
        showspin ? <Spiner/> : 
        <div className="container">
          <h2 className='text-center mt-1'>Register Your Details</h2>
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
                    onChange={setInputValue}
                  />
                  <Form.Check
                    className='col-lg-3'
                    type={"radio"}
                    label={`AngelList`}
                    name="platform"
                    value="AngelList"
                    onChange={setInputValue}
                  />
                  <Form.Check
                    className='col-lg-3'
                    type={"radio"}
                    label={`Other`}
                    name="platform"
                    value="Other"
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Status</Form.Label>
                  <Select onChange={setStatusValue} value={status} options={options}/>
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

export default Register