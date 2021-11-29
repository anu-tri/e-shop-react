import React, { Component } from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'


export default class NavBar extends Component {
    render() {
        return (
                <Navbar  expand="lg" style={{marginBottom:"20px", backgroundColor: "white"}}>
                    <Container>
                        <img src="https://res.cloudinary.com/dzzbwxwsv/image/upload/v1638061416/bag_zrllx3.png" width="50px" height="50px"></img>
                        <Navbar.Brand as={Link} to="/">Store</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {this.props.token ?
                            <>
                                
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                
                                
                                {/* admin dropdown area */}
                                {/* <NavDropdown title="Manage" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/createitems">Create Item</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/edititems">Edit Items</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/deleteitems">Delete Items</NavDropdown.Item>
                                </NavDropdown> */}
                                {/* end admin dropdown */}
                            </>
                            :
                            <Nav.Link as={Link} to="/">Login</Nav.Link>
                            }
                        </Nav>

                        {/* <p style={{color:'#FB4807',marginRight:"70px", marginTop:"19px"}}>User:{this.props.userFullName ? this.props.userFullName : localStorage.getItem("userfullname")}</p>                 */}
                        <p style={{color:'#FB4807',marginRight:"70px", marginTop:"19px"}}>{this.props.userFullName ? this.props.userFullName : localStorage.getItem("name")}</p>            
                        <span style={{color:'black',marginRight:"40px"}}>Cart:${this.props.getCartTotalPrice().toFixed(2)}, items:{this.props.getCartItemTotal()}</span>
                
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        )
    }
}
