import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function LoginNav() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" expand={"md"}>
                <Container>
                    <Navbar.Brand href="/">Budget Buddy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/incomes">Incomes</Nav.Link>
                            <Nav.Link href="/categories">Categories</Nav.Link>
                            <Nav.Link href="/expenses">Expenses</Nav.Link>
                            <Nav.Link href="/bills">Bills</Nav.Link>
                            <Nav.Link href="/savings">Saving Goals</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="me-aut">
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
