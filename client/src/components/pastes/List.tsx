import Heading from "../Heading";
import moment from "moment";
import { useRecoilState } from "recoil";
import { pastesState } from "./globalStates";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import SortingTabs from "../SortingTabs";
import { Spinner } from "flowbite-react";
// import "tw-elements";

export default function List() {
  const [pastes, setPastes] = useRecoilState(pastesState);
  const [open, setOpen] = useState<number[]>([]);

  if (!pastes.pastes)
    return (
      <div
        className="flex justify-center items-center w-full min-h-screen
       overflow-hidden bg-white shadow sm:rounded-lg"
      >
        <Spinner size="lg" />
      </div>
    );
  return (
    <div>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="p-8 flex justify-between items-center gap-5">
          <Heading
            heading="Recent Pastes"
            des="Click on the paste's heading to view its content. 
          Also, Click the same tab in order to change the sort
          from ascending order to descending order and vice versa."
          />
          <SortingTabs />
        </div>
      </div>
      <dl>
        {pastes.pastes
          ? pastes.pastes.map((x, i) => (
              <div key={i} className="border-t border-gray-200">
                <div
                  className={
                    i % 2 == 0
                      ? "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6"
                      : "bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6"
                  }
                >
                  <dt
                    className={
                      open.includes(i)
                        ? "text-sm font-medium text-gray-500 self-start"
                        : "text-sm font-medium text-gray-500"
                    }
                  >
                    By {x.author}, {moment(x.date).format("LLL")}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <Accordion open={open.includes(i) ? true : false}>
                      <AccordionHeader
                        onClick={() => {
                          open.includes(i)
                            ? setOpen(open.filter((x) => x !== i))
                            : setOpen([...open, i]);
                        }}
                      >
                        {x.title}
                      </AccordionHeader>
                      <AccordionBody>{x.content}</AccordionBody>
                    </Accordion>
                  </dd>
                </div>
              </div>
            ))
          : ""}
      </dl>
    </div>
  );
}
