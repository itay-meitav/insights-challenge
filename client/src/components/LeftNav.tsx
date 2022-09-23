import { NavbarBrand, NavItem, Tooltip } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useSearchParams } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import SearchBox from "./SearchBox";
import config from "../assets/config";
import { createContext, useState } from "react";
import Notifications from "./Notifications";
var logo = require("../assets/logo.png");

export const NotificationsContext = createContext("");

function LeftNav() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showA, setShowA] = useState<boolean>(false);
  const orderBy = searchParams.get("orderBy");

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="nav-link">
            <img
              src={logo}
              width="24"
              height="26"
              className="d-inline-block align-top"
              style={{ marginRight: 10 }}
            />
            Posts Panel
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              style={{ transition: "all 2s linear" }}
              title="Tools"
              id="collasible-nav-dropdown"
              disabled={
                ["/", "/alerts"].includes(window.location.pathname)
                  ? false
                  : true
              }
            >
              <NavDropdown
                style={{ transition: "all 2s linear" }}
                title="Filters..."
                drop={"end"}
                id="dropdown-menu-align-end"
              >
                <NavDropdown.Item
                  onClick={() => {
                    searchParams.set("orderBy", "title");
                    setSearchParams(searchParams);
                  }}
                  disabled={
                    ["/"].includes(window.location.pathname) ? false : true
                  }
                >
                  By title
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    searchParams.set("orderBy", "author");
                    setSearchParams(searchParams);
                  }}
                  disabled={
                    ["/"].includes(window.location.pathname) ? false : true
                  }
                >
                  By author's name
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    if (["/alerts"].includes(window.location.pathname)) {
                      if (orderBy == "1") {
                        searchParams.set("orderBy", "-1");
                        setSearchParams(searchParams);
                      } else {
                        searchParams.set("orderBy", "1");
                        setSearchParams(searchParams);
                      }
                    } else {
                      searchParams.set("orderBy", "date");
                      setSearchParams(searchParams);
                    }
                  }}
                >
                  By date posted
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    // searchParams.get("search")
                    searchParams.delete("search");
                    searchParams.set("keywords", "true");
                    setSearchParams(searchParams);
                  }}
                  disabled={
                    ["/"].includes(window.location.pathname) ? false : true
                  }
                >
                  By keywords
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown.Divider />
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    This action may take a few seconds. When finished, <br />
                    the page will refresh.
                  </Tooltip>
                }
              >
                <NavDropdown.Item
                  onClick={() => {
                    fetch(config.apiHost + "new")
                      .then((res) => {
                        if (res.ok) window.location.reload();
                      })
                      .catch((e) => {
                        console.error(e);
                      });
                  }}
                  disabled={
                    ["/"].includes(window.location.pathname) ? false : true
                  }
                >
                  Refresh Data
                </NavDropdown.Item>
              </OverlayTrigger>
            </NavDropdown>
            <Nav.Item>
              <Link to="/statistics" className="nav-link">
                Statistics
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/keywords" className="nav-link">
                Keywords
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/alerts" className="nav-link">
                Alerts
              </Link>
            </Nav.Item>
          </Nav>
          <SearchBox />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LeftNav;
