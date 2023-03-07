import React from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import "./profile.css";

const Profile = () => {
  return (
    <>
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
              <h3>@Shlok Saraogi</h3>
              <br/>
              <h5><i className="fa-solid fa-window-maximize platformx"></i>&nbsp;:- <span>Internshala</span></h5>
              <h5><i className="fa-solid fa-headset stage"></i>&nbsp;:- <span>1st Round</span></h5>
              <h5><i className="fa-solid fa-circle-check statusx"></i>&nbsp;:- <span>Not-Active</span></h5>
              <h5><i className="fa-solid fa-calendar-days calender"></i>&nbsp;:- <span>01/10/2002</span></h5>
              <br/>
              <h5><i className="fa-solid fa-note-sticky notes"></i>&nbsp;:- <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ratione quis modi! Saepe voluptatum iste amet molestias. Quaerat velit dicta, at expedita vero similique suscipit numquam modi quibusdam sapiente quae!</span></h5>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default Profile