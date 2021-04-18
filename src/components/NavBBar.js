import React from "react";
import { Navbar, Nav } from "react-bootstrap";



const NavBBar = () => {
  return (
    <Navbar bg="light" expand="lg">
    
      <Nav className="mr-auto"></Nav>
      <Nav>
        <a
          href="https://github.com/coderschool/ftw_w5_github_issues"
          target="_blank"
          rel="noopener noreferrer"
        >
         
        </a>
      </Nav>
    </Navbar>
  );
};

export default NavBBar;