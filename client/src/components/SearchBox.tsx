import { useContext, useEffect, useRef, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PageContext } from "../App";
import config from "../assets/config";
import { getUniq } from "../assets/functions";

type IInputOptions = {
  id: number;
  label: string;
};
const validPages = ["socks", "locations", "officers"];

function getOptions(page: string) {
  if (!validPages.includes(page)) {
    return Promise.reject("cant search for this page");
  }
  return fetch(config.apiHost + "/api/get/search-options/" + page)
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error("something went wrong");
    })
    .then((data) => {
      return data;
    });
}

function SearchBox() {
  const [options, setOptions] = useState<IInputOptions[]>([]);
  const [page] = useContext(PageContext);
  const location = useLocation();
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
    if (validPages.includes(page))
      getOptions(page)
        .then((data) => {
          setOptions(getUniq(data, (cell) => cell.label));
        })
        .catch((err) => {
          console.log("error while fetching search options");
        });
  }, [location, page]);

  useEffect(() => {
    if (!searchValue) {
      submitSearch("");
    }
  }, [searchValue]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <>
      <Form
        className="flex-row"
        ref={form}
        style={
          page == "history"
            ? { visibility: "hidden" }
            : { visibility: "visible" }
        }
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setShowOptions(false);
        }}
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
                ? filteredOptions.map((el) => (
                    <Dropdown.Item
                      onClick={() => {
                        const val = el.label;
                        console.log("clicked on :", val);

                        setSearchValue(val);
                        submitSearch(val);
                        setShowOptions(false);
                      }}
                      style={{ whiteSpace: "initial" }}
                      key={el.id}
                    >
                      {el.label}
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
          variant="outline-light"
        >
          Search
        </Button>
      </Form>
    </>
  );
}

export default SearchBox;
