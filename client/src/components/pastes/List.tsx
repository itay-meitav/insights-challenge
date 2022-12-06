import Heading from "../Heading";
import moment from "moment";
import { useRecoilState } from "recoil";
import { pastesState } from "./globalStates";

export default function List() {
  const [pastes, setPastes] = useRecoilState(pastesState);
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <Heading
          heading="Recent Pastes"
          des="Click on the paste's heading to view its content"
        />
      </div>
      <dl>
        {pastes.pastes.map((x, i) => (
          <div className="border-t border-gray-200">
            <div
              className={
                i % 2 == 0
                  ? "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  : "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              }
            >
              <dt className="text-sm font-medium text-gray-500">
                By {x.author}, {moment(x.date).format("LLL")}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {/* <div className="accordion" id="accordionExample"> */}
                <div className="accordion-item bg-white border border-gray-200">
                  <h2
                    className="accordion-header mb-0"
                    id={"heading" + i.toString()}
                  >
                    <button
                      className="accordion-button relative flex items-center w-full py-4 px-5 text-base
                        text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#collapse" + i.toString()}
                      aria-expanded="true"
                      aria-controls={"collapse" + i.toString()}
                    >
                      {x.title}
                    </button>
                  </h2>
                  <div
                    id={"collapse" + i.toString()}
                    className="accordion-collapse collapse"
                    aria-labelledby={"heading" + i.toString()}
                    // data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body py-4 px-5">{x.content}</div>
                  </div>
                </div>
                {/* </div> */}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
