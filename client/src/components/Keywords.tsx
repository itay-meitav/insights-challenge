import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import config from "../assets/config";

async function getKeywords() {
  const data = await fetch(`${config.apiHost}keywords`).then((res) =>
    res.json()
  );
  return data.map((x: any) => x.word);
}

function Keywords() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [marked, setMarked] = useState<number[]>([]);
  const [disabled, setDisabled] = useState<number[]>([]);
  const [deleteMarked, setDeleteMarked] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const list = await getKeywords();
      setKeywords(list);
    })();
  }, []);

  useEffect(() => {
    keywords.forEach((e, i) => {
      setDisabled((x) => [...x, i]);
    });
  }, [keywords]);

  return (
    <div className="keywords">
      <h5 style={{ marginBottom: 30 }}>Keywords List</h5>
      <ListGroup className="list">
        {keywords.map((x, i) => {
          return (
            <div
              key={i}
              style={
                marked.includes(i) && deleteMarked
                  ? { display: "none" }
                  : { display: "unset" }
              }
            >
              <InputGroup className="mb-3">
                <DropdownButton
                  id="dropdown-button-drop-start"
                  variant="secondary"
                  title=""
                  drop={"start"}
                >
                  <Dropdown.Item
                    onClick={() => {
                      if (disabled.includes(i)) {
                        setDisabled(disabled.filter((x) => x !== i));
                      } else {
                        return false;
                      }
                    }}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={(e) => {
                      const el =
                        e.currentTarget.parentElement!.parentElement!
                          .parentElement!;
                      el.remove();
                    }}
                  >
                    Delete
                  </Dropdown.Item>
                </DropdownButton>
                <InputGroup.Checkbox
                  onChange={() => {
                    if (marked.includes(i)) {
                      setMarked(marked.filter((x) => x !== i));
                    } else {
                      setMarked([...marked, i]);
                    }
                  }}
                />
                <Form.Control
                  disabled={disabled.includes(i) ? true : false}
                  value={x}
                  onChange={() => {}}
                />
              </InputGroup>
            </div>
          );
        })}
      </ListGroup>
      <div className="buttons">
        <Button variant="success">Save Changes</Button>
        <Button
          variant="danger"
          onClick={() => {
            setDeleteMarked(true);
          }}
        >
          Delete All Selected
        </Button>
      </div>
    </div>
  );
}

export default Keywords;
