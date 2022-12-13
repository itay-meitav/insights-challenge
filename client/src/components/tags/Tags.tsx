import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import config from "../../assets/config";
import Heading from "../Heading";

function Tags() {
  const [tags, setTags] = useState<string[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    fetch(`${config.apiHost}api/tags`).then(async (res) => {
      const data = await res.json();
      setTags([...data.documents, "hey3", "hey4", "hey5"]);
      localStorage.setItem("tags", JSON.stringify(tags));
    });
  }, []);

  async function saveTags(tags: string[]) {
    fetch(`${config.apiHost}api/tags`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags: tags }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        setTimeout(() => {
          setMsg("");
        }, 3000);
        setMsg(data.message);
      } else {
        localStorage.setItem("tags", JSON.stringify(tags));
        setTimeout(() => {
          setMsg("");
        }, 3000);
        setMsg("Changes saved successfully");
      }
    });
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full">
        <div className="p-7">
          <Heading
            heading="Tags List"
            des="Add keywords for searching pastes that contain them"
          />
        </div>
      </div>
      <Card className="w-3/4 mb-10">
        {tags ? (
          <div className="flex flex-col scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 snap-end scrollbar-track-white justify-start items-center gap-2 w-full max-h-64 overflow-y-auto">
            {tags.map((x, i) => (
              <div
                key={i}
                className={
                  i % 2 == 0
                    ? "bg-gray-50 p-3  border border-solid border-gray-200 w-11/12 rounded"
                    : "bg-white p-3 border border-solid border-gray-200 w-11/12 rounded"
                }
              >
                <div className="flex justify-start items-center text-sm font-medium text-gray-500 gap-3 w-full">
                  <input
                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:border-blue-600 focus:outline-none transition duration-200 cursor-pointer"
                    type="checkbox"
                    checked={checked.includes(x) ? true : false}
                    onChange={() => {
                      if (checked.includes(x)) {
                        setChecked(checked.filter((x) => x !== x));
                      } else {
                        setChecked([...checked, x]);
                      }
                    }}
                  />
                  <input
                    value={x}
                    type="text"
                    className="
                      px-3
                      w-1/4
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                      disabled:bg-gray-100
                    "
                    disabled={!checked.includes(x) ? true : false}
                    onChange={(e) => {
                      setTags(
                        tags.map((x, j) =>
                          j === i ? e.currentTarget.value : x
                        )
                      );
                      setChecked(
                        checked.map((el, j) =>
                          el === x ? e.currentTarget.value : el
                        )
                      );
                    }}
                    placeholder="New Keyword..."
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-between items-center gap-2 w-full mt-5">
          <div className="text-sm text-gray-500 transition duration-150 ease-in-out">
            {msg}
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (!tags.includes("")) {
                  setTags(["", ...tags]);
                  setChecked(["", ...checked]);
                } else {
                  return;
                }
              }}
              className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg transition duration-150 ease-in-out"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setTags(JSON.parse(localStorage.getItem("tags")!))}
              className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg transition duration-150 ease-in-out"
            >
              Reset
            </button>
            <button
              onClick={() => {
                if (checked) {
                  setTags(tags.filter((x) => !checked.includes(x)));
                  setChecked([]);
                } else {
                  return;
                }
              }}
              type="button"
              className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg transition duration-150 ease-in-out"
            >
              Delete
            </button>
            <button
              onClick={() => saveTags(tags)}
              type="button"
              className="inline-block px-6 py-2.5 bg-gray-50 text-gray-700  font-medium text-xs uppercase rounded-full shadow-md hover:bg-white hover:shadow-lg focus:bg-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-white active:shadow-lg transition duration-150 ease-in-out"
            >
              Save
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Tags;
