import React, { useEffect, useRef, useState } from "react";
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
  return data;
}

async function changeKeywords(keywords: string[]) {
  return await fetch(`${config.apiHost}keywords`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(keywords.map((x) => ({ keyword: x }))),
  }).then(async (res) => {
    return await res.json();
  });
}

function Keywords() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [marked, setMarked] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<number[]>([]);
  const [changed, setChanged] = useState<boolean>(false);
  const [changedContent, setChangedContent] = useState<string>("");
  const [listLength, setListLength] = useState<number>(0);
  const value = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      const list = await getKeywords();
      setListLength(list.length);
      setKeywords(list);
      (list as string[]).forEach((e, i) => {
        setDisabled((x) => [...x, i]);
      });
    })();
  }, []);

  return (
    <div className="keywords">
      <h5 style={{ marginBottom: 30 }}>Keywords List</h5>
      <ListGroup className="list">
        {keywords.map((x, i) => {
          return (
            <div key={i}>
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
                    onClick={async (e) => {
                      const el =
                        e.currentTarget.parentElement!.parentElement!
                          .parentElement!;
                      el.remove();
                      const arr = keywords.filter(
                        (el) => el !== value.current?.value
                      );
                      await changeKeywords(arr);
                    }}
                  >
                    Delete
                  </Dropdown.Item>
                </DropdownButton>
                <InputGroup.Checkbox
                  onChange={() => {
                    if (marked.includes(x)) {
                      setMarked(marked.filter((el) => el !== x));
                    } else {
                      setMarked([...marked, x]);
                    }
                  }}
                />
                <Form.Control
                  ref={value}
                  disabled={
                    disabled.includes(i) && i < listLength ? true : false
                  }
                  value={x}
                  onChange={(e) => {
                    const val = e.currentTarget.value;
                    setKeywords(
                      keywords.map((x, j) => {
                        if (j === i) x = val;
                        return x;
                      })
                    );
                  }}
                />
              </InputGroup>
            </div>
          );
        })}
      </ListGroup>
      <div className="buttons">
        <Button
          variant="success"
          onClick={async () => {
            const arr = keywords.filter((x) => x !== "");
            const data = await changeKeywords(arr);
            if (data.success) {
              setChanged(true);
              setChangedContent("Changes were saved successfully");
              setTimeout(() => {
                setChanged(false);
                setChangedContent("");
              }, 3000);
              keywords.forEach((e, i) => {
                setDisabled((x) => [...x, i]);
              });
              setListLength(arr.length);
            } else {
              setChanged(true);
              setChangedContent("Changes were not saved");
              setTimeout(() => {
                setChanged(false);
                setChangedContent("");
              }, 3000);
            }
          }}
        >
          Save Changes
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setKeywords([...keywords, ""]);
          }}
        >
          Add a word
        </Button>
        <Button
          variant="danger"
          onClick={async () => {
            const arr = keywords.filter((el) => !marked.includes(el));
            const data = await changeKeywords(arr);
            if (data.success) {
              setChanged(true);
              setKeywords(arr);
              setListLength(arr.length);
            } else {
              setChanged(true);
              setChangedContent("failed to remove");
              setTimeout(() => {
                setChanged(false);
                setChangedContent("");
              }, 1000);
            }
            setMarked([]);
          }}
        >
          Delete All Selected
        </Button>
      </div>
      {changed ? <h6 style={{ marginTop: 30 }}>{changedContent}</h6> : ""}
    </div>
  );
}

export default Keywords;
