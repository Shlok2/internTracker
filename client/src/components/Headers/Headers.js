import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Headers = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Intern Tracker</Navbar.Brand>
          {/* <Navbar.Brand href="/"><img style={{height:"40px",width:"150px"}} src="./logo.png" alt="Image description"/></Navbar.Brand> */}
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/openai">Ask Questions</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Headers