import { useNavigate, useLocation } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header( { props: { isLoggedIn } } ) {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Navbar className="header" bg="light" expand="lg">
        <Container fluid>
            <Navbar.Brand>Social</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link 
                    onClick={ ()=>navigate('/') }
                    active={location.pathname === '/'}
                >Home</Nav.Link>
                {!isLoggedIn && 
                    <Nav.Link
                        onClick={ ()=>navigate('/login') }
                        active={location.pathname === '/login'}
                    >Login</Nav.Link>
                }
                {!isLoggedIn && 
                    <Nav.Link
                        onClick={ ()=>navigate('/register') }
                        active={location.pathname === '/register'}
                    >Register</Nav.Link>
                }   
            </Nav>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default Header;
