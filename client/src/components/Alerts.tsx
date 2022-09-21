import React, { useEffect, useState } from "react";
import { Accordion, Spinner } from "react-bootstrap";

function Alerts() {
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <div className="alerts">
      <Spinner
        animation="border"
        role="status"
        style={!loader ? { display: "none" } : { display: "unset" }}
        className="spinner"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <h5 style={{ marginBottom: 30 }}>Recent Alerts</h5>
      <Accordion
        className="list"
        style={!loader ? { visibility: "visible" } : { visibility: "hidden" }}
      ></Accordion>
    </div>
  );
}

export default Alerts;
