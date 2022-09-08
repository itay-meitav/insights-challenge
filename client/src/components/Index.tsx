import React from "react";
import Accordion from "react-bootstrap/Accordion";

function Index() {
  return (
    <div className="posts" style={{ marginTop: 80, position: "relative" }}>
      <h5 style={{ marginBottom: 30 }}>Recent Posts</h5>
      <Accordion defaultActiveKey="0" style={{ width: 950 }}>
        <Accordion.Item eventKey="1" style={{ position: "relative" }}>
          <Accordion.Header>
            Accordion Item #1
            <br></br>
            <div style={{ position: "absolute", right: 60, fontSize: 12 }}>
              Posted by Anonymous at 08 Sep 2022, 10:32:10 UTC
            </div>
          </Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Index;
