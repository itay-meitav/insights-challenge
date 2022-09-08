import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function SearchBox() {
  return (
    <>
      <Form className="d-flex" style={{ gap: 15 }}>
        <Dropdown>
          <Dropdown.Toggle variant="input" bsPrefix="p-0">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-1"
              aria-label="Search"
            />
          </Dropdown.Toggle>
        </Dropdown>
        <Button type="submit" variant="outline-dark">
          Search
        </Button>
      </Form>
    </>
  );
}

export default SearchBox;
