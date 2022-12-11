import { useEffect, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import config from "../assets/config";
import { useLocation, useSearchParams } from "react-router-dom";

function Search() {
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const location = useLocation();
  const filteredOptions = searchOptions.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (location.pathname == "/pastes") {
      fetch(config.apiHost + "api/search/").then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setSearchOptions(data.documents);
        }
      });
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, []);

  useEffect(() => {
    if (searchValue == "") {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, [searchValue]);

  return (
    <div className="rounded-md shadow-sm">
      <Menu
        open={
          !open ||
          filteredOptions.includes(searchValue) ||
          !filteredOptions.length ||
          !searchValue ||
          location.pathname !== "/pastes"
            ? false
            : true
        }
      >
        <MenuHandler>
          <input
            type="text"
            name="search"
            id="search"
            className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search Here..."
            disabled={location.pathname !== "/pastes" ? true : false}
            value={searchValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              const val = e.currentTarget.value;
              searchParams.set("search", val);
              setSearchParams(searchParams);
            }}
          />
        </MenuHandler>
        <MenuList className="max-w-48 max-h-48 overflow-y-auto">
          {filteredOptions.map((x, i) => (
            <MenuItem
              onClick={() => {
                searchParams.set("search", x);
                setSearchParams(searchParams);
              }}
              key={i}
            >
              {x}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}

export default Search;
