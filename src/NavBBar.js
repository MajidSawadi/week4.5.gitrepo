
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { FormControl, Navbar, Button , Form} from 'react-bootstrap';

function NavBBar(){
    return (
       <div>
        <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">GitSearch</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
       
    <Form inline>
      <FormControl  type="text" placeholder="Search"  className="mr-sm-1" />
    
    
      <Button variant="outline-success" >Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
</div>
    );
}

export default NavBBar;