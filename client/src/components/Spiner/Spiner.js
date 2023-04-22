import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Spiner = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{width:"100%", height:"50vh"}}>
        <Spinner animation='border' variant='danger' />&nbsp; <span style={{color: "#a7a7ae"}}>Loading...</span>
      </div>
    </>
  )
}

export default Spiner