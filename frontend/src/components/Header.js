import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {logout} from '../actions/userActions'

function Header() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () =>{
    dispatch(logout())
  }

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/cart">
                <Nav.Link href="/cart">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.email}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                    <i className="fas fa-user" style={{margin: '0 5px 0 0'}}></i>
                    Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt" style={{margin: '0 5px 0 0'}}></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <i className="fas fa-user"></i> login
                  </Nav.Link>
                </LinkContainer>
              )}
              {
                userInfo && userInfo.is_staff && (
                  <NavDropdown title='admin'id='admin_menu'>
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>
                    <i className="fas fa-user" style={{margin: '0 5px 0 0'}}></i>
                    Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/prodcuts">
                    <NavDropdown.Item>
                    <i className="fas fa-shopping-basket" style={{margin: '0 5px 0 0'}}></i>
                    Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>
                    <i className="fas fa-file-invoice-dollar" style={{margin: '0 5px 0 0'}}></i>
                    Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
