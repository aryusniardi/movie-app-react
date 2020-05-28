import React, {useState} from 'react';
import { useHistory } from "react-router-dom"
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    FormGroup,
    Label,
    Button
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Logo from '../../assets/logo.png'

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const rememberMe = localStorage.getItem('rememberMe') === 'true'
  const token = rememberMe ? localStorage.getItem('token') : ''
  let history = useHistory()
  console.log(token)

  return (
    <React.Fragment>
      <Navbar className="navigation" dark expand="md">
        <Container fluid={true}>
          <NavbarBrand href="/">
            <img alt="img" src={Logo} />
            Movies
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem>
                <NavLink href="/">Top Rating</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/latest/">Latest</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/movie/">Movies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/tvshow/">TV Show</NavLink>
              </NavItem>
            </Nav>
            <FormGroup className="navbar-form">
                <input type="text" id="searchInput" placeholder="Search" className="navbar-input"/>
                <Label for="searchInput" className="input-label"><FontAwesomeIcon icon={faSearch} mask={'fab'} className="mr-2 centered v-50"/></Label>
            </FormGroup>
            <Button color="danger"
              className="mx-3"
              onClick={() => {
                localStorage.setItem('token', '')
                history.push('/login')
              }}
            >Log Out</Button>
          </Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Navigation;