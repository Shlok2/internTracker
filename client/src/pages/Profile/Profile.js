import React,{useState,useEffect} from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Spiner from '../../components/Spiner/Spiner';
import {singleUsergetfunc} from "../../services/Apis";
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import moment from "moment";
import "./profile.css";

const Profile = () => {

  const [userprofile,setUserProfile] = useState({});
  const [showspin,setShowSpin] = useState(true);

  const {id} = useParams();
  const navigate = useNavigate();

  const userProfileGet = async() => {
    const response = await singleUsergetfunc(id);

    if(response.status === 200){
      setUserProfile(response.data);
    }else{
      console.log("error");
    }
  }

  const ViewPage = () => {
    navigate(`/edit/${userprofile._id}`)
  }

  useEffect(() => {
    userProfileGet();
    setTimeout(()=>{
      setShowSpin(false);
    },1200)
  },[id])
  return (
    <>
    {
      showspin ? <Spiner/> :
       <div className="container">
        <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
          <Card.Body>
            <Row>
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center">
                    <img src="/man.png" alt="img"/>
                </div>
              </div>
            </Row>
            <div className='text-center'>
              <Button onClick={ViewPage} variant="primary" className='edit_btn'><i class="fa-solid fa-pen-to-square"></i></Button>
              <h3><strong><i># {userprofile.name[0].toUpperCase() + userprofile.name.slice(1,)}</i></strong></h3>
              <br/>
              <h5><i className="fa-solid fa-window-maximize platformx"></i>&nbsp;<strong>Platform</strong> :- <span>{userprofile.platform}</span></h5>
              <h5><i className="fa-solid fa-headset stage"></i>&nbsp;<strong>Stage</strong> :- <span>{userprofile.stage}</span></h5>
              <h5><i className="fa-solid fa-circle-check statusx"></i>&nbsp;<strong>Status</strong> :- <span>{userprofile.status}</span></h5>
              <h5><i className="fa-solid fa-calendar-days calender"></i>&nbsp;<strong>Last Date</strong> :- <span>{moment(userprofile.date).format("DD-MM-YYYY")}</span></h5>
              <h5><i className="fa-solid fa-calendar-days calender"></i>&nbsp;<strong>Created</strong> :- <span>{moment(userprofile.datecreated).format("DD-MM-YYYY")}</span></h5>
              <br/>
              <h5><i className="fa-solid fa-note-sticky notes"></i>&nbsp;<strong>Notes</strong> :- <span>{userprofile.notes}</span></h5>
            </div>
          </Card.Body>
        </Card>
      </div>
    }
      
    </>
  )
}

export default Profile