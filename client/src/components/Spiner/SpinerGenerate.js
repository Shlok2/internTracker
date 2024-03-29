import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const SpinerGenerating = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{width:"100%", height:"50vh"}}>
        <Spinner animation='border' variant='danger' />&nbsp;&nbsp; <h3 style={{color: "#a7a7ae"}}>Generating Text...</h3>
      </div>
    </>
  )
}

export default SpinerGenerating