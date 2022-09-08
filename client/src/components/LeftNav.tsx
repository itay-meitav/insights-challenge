import { Tooltip } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import SearchBox from "./SearchBox";

function LeftNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="nav-link">
            {/* <img
              src={logo}
              width="24"
              height="30"
              className="d-inline-block align-top"
              style={{ marginRight: 10 }}
            /> */}
            Posts Panel
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Item>
              <Link to="/" className="nav-link">
              </Link>
            </Nav.Item> */}
            <NavDropdown
              style={{ transition: "all 2s linear" }}
              title="Tools"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item
                as={Link}
                to={"/"}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Add New Item
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2"></Tooltip>}
              >
                <NavDropdown.Item>Reset Data</NavDropdown.Item>
              </OverlayTrigger>
            </NavDropdown>
          </Nav>
          <SearchBox />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LeftNav;
