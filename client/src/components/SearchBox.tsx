import config from "../assets/config";
import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function getOptions() {
  return fetch(config.apiHost + "search-options")
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error("something went wrong");
    })
    .then((data) => {
      return data;
    });
}

function SearchBox() {
  const [options, setOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const submitSearch = (val: string | undefined = undefined) => {
    const keys = searchParams.keys();
    let next = keys.next();
    while (next?.value) {
      searchParams.delete(next.value);
      next = keys.next();
    }
    const value = typeof val == "string" ? val : searchValue;
    if (value) searchParams.set("search", value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
    getOptions()
      .then((data) => {
        const arr = data.map((x: any) => x.title);
        setOptions(arr);
      })
      .catch((err) => {
        console.log("error while fetching search options");
      });
  }, []);

  useEffect(() => {
    if (!searchValue) {
      submitSearch("");
    }
  }, [searchValue]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Form
        className="d-flex"
        ref={form}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setShowOptions(false);
        }}
        style={{ gap: 15 }}
      >
        <Dropdown>
          <Dropdown.Toggle variant="input" bsPrefix="p-0">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-1"
              aria-label="Search"
              value={searchValue}
              onFocus={() => setShowOptions(true)}
              onChange={(e) => {
                const val = e.currentTarget.value;
                setSearchValue(val);
              }}
            />
          </Dropdown.Toggle>
          {filteredOptions.length ? (
            <Dropdown.Menu
              style={{
                width: "100%",
                height: "fit-content",
                maxHeight: 200,
                overflowY: "auto",
                display:
                  searchValue.length > 0 && showOptions == true
                    ? "unset"
                    : "none",
              }}
            >
              {showOptions
                ? filteredOptions.map((el, i) => (
                    <Dropdown.Item
                      onClick={() => {
                        const val = el;
                        setSearchValue(val);
                        submitSearch(val);
                        setShowOptions(false);
                      }}
                      style={{ whiteSpace: "initial" }}
                      key={i}
                    >
                      {el}
                    </Dropdown.Item>
                  ))
                : ""}
            </Dropdown.Menu>
          ) : (
            <></>
          )}
        </Dropdown>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            // setSubmit(!submit);
            submitSearch();
          }}
          variant="outline-dark"
        >
          Search
        </Button>
      </Form>
    </>
  );
}

export default SearchBox;
