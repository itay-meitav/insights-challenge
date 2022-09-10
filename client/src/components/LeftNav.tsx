import { Tooltip } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import SearchBox from "./SearchBox";
import config from "../assets/config";
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState } from "react";
import Notifications from "./Notifications";

function LeftNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showA, setShowA] = useState<boolean>(false);
  const toggleShowA = () => setShowA(!showA);
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
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
                Add New Post
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    This action may take up to 2 minutes! When finished, <br />
                    the page will refresh.
                  </Tooltip>
                }
              >
                <NavDropdown.Item
                  onClick={() => {
                    fetch(config.apiHost + "reload", {
                      method: "POST",
                    })
                      .then((res) => {
                        if (res.ok) window.location.reload();
                      })
                      .catch((e) => {
                        console.error(e);
                      });
                  }}
                >
                  Refresh Data
                </NavDropdown.Item>
              </OverlayTrigger>
            </NavDropdown>
          </Nav>
          <SearchBox />
          <IconButton onClick={toggleShowA} style={{ marginLeft: 10 }}>
            <NotificationsIcon />
          </IconButton>
          <Notifications content={""} showA={showA} toggleShowA={toggleShowA} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LeftNav;
