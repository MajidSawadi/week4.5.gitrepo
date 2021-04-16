import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Navbar, Form, FormControl, Button} from 'react-bootstrap';

function NavBBar(){
    const [searchBu, setsearchBu]= useState("");

const searchFunc= async ()=>{

}
    return (
       <div>
        <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">GitSearch</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
       
    <Form inline>
      <FormControl  type="text" placeholder="Search"  className="mr-sm-1" onChange={(e)=>
    {setsearchBu(e.target.value)}}/>
      <Button variant="outline-success" >Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
</div>
    );
}

export default NavBBar;