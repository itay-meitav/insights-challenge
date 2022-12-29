import { Card } from "flowbite-react";
import React, { useEffect, useReducer, useState } from "react";
import config from "../../assets/config";
import Heading from "../Heading";
import { reducer } from "./reducer";
import { ACTIONS } from "./types";

function Tags() {
  const [serverTags, setServerTags] = useState<string[]>([]);
  const [state, dispatch] = useReducer(reducer, {
    tags: [],
    disabled: [],
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    fetch(`${config.apiHost}api/tags`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setServerTags([...data.documents, "hey3", "hey4", "hey5"]);
          dispatch({
            type: ACTIONS.INIT_TAGS,
            payload: {
              tags: [...data.documents, "hey3", "hey4", "hey5"],
            },
          });
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((err) => {
        setErrorMessage("There was a problem receiving your tags");
      });
  }, []);

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
        {state.tags && (
          <div className="flex flex-col scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 snap-end scrollbar-track-white justify-start items-center gap-2 w-full max-h-64 overflow-y-auto">
            {state.tags.map((x: string, i: number) => (
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
                    checked={state.disabled.includes(i) ? false : true}
                    onChange={() =>
                      dispatch({
                        type: ACTIONS.DISABLED_TAG,
                        payload: {
                          index: i,
                        },
                      })
                    }
                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:border-blue-600 focus:outline-none transition duration-200 cursor-pointer"
                    type="checkbox"
                  />
                  <input
                    value={x}
                    disabled={state.disabled.includes(i) ? true : false}
                    type="text"
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.EDIT_TAG,
                        payload: {
                          tag: x,
                          index: i,
                          newTag: e.currentTarget.value,
                        },
                      })
                    }
                    className="px-3 w-1/4 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                    ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none disabled:bg-gray-100"
                    placeholder="New Keyword..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center gap-2 w-full mt-5">
          <div className="text-sm text-gray-500 transition duration-150 ease-in-out">
            {errorMessage}
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() =>
                dispatch({
                  type: ACTIONS.ADD_TAG,
                })
              }
              type="button"
              className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg transition duration-150 ease-in-out"
            >
              Add
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: ACTIONS.INIT_TAGS,
                  payload: {
                    tags: serverTags,
                  },
                })
              }
              type="button"
              className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg transition duration-150 ease-in-out"
            >
              Reset
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: ACTIONS.REMOVE_TAG,
                  payload: {
                    tags: state.tags.filter(
                      (x: string, i: number) => !state?.disabled?.includes(i)
                    ),
                  },
                })
              }
              type="button"
              className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg transition duration-150 ease-in-out"
            >
              Delete
            </button>
            <button
              onClick={() => {
                if (
                  state.tags.filter(
                    (x: string, i: number) => state.tags.indexOf(x) != i
                  ).length
                ) {
                  setErrorMessage(
                    "There is duplication of tags. Please handle it."
                  );
                } else if (
                  JSON.stringify(state.tags) === JSON.stringify(serverTags)
                ) {
                  setErrorMessage("No changes were detected.");
                } else {
                  fetch(`${config.apiHost}api/tags`, {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ tags: state.tags }),
                  })
                    .then(async (res) => {
                      const data = await res.json();
                      if (res.ok) {
                        setErrorMessage("Successfully saved.");
                        setServerTags(state.tags);
                      } else {
                        setErrorMessage(data.message);
                      }
                    })
                    .catch((err) =>
                      setErrorMessage("There was a problem saving your tags.")
                    );
                }
              }}
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
