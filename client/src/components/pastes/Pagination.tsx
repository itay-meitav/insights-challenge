import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { pastesState } from "./globalStates";

export default function Pagination() {
  const [pastes, setPastes] = useRecoilState(pastesState);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setTotalPages(
      Array.from(Array(Math.ceil(pastes.pastesCount / 20)), (_, i) => i + 1)
    );
  }, [pastes.pastesCount]);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {pastes.pastes ? pastes.pastes.length : 0}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {pastes.pastesCount ? pastes.pastesCount : 0}
            </span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                searchParams.set("page", Math.min(...totalPages).toString());
                setSearchParams(searchParams);
              }}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Start</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (totalPages.includes(currentPage - 1)) {
                  searchParams.set("page", String(currentPage - 1));
                  setSearchParams(searchParams);
                } else {
                  return false;
                }
              }}
              className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {totalPages.map((x, i) =>
              currentPage - 2 <= x && currentPage + 3 > x ? (
                <div
                  key={i}
                  style={{ cursor: "pointer" }}
                  className={
                    x == currentPage
                      ? "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                      : "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                  }
                  onClick={() => {
                    searchParams.set("page", String(x));
                    setSearchParams(searchParams);
                  }}
                >
                  {x}
                </div>
              ) : (
                ""
              )
            )}
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (totalPages.includes(currentPage + 1)) {
                  searchParams.set("page", String(currentPage + 1));
                  setSearchParams(searchParams);
                } else {
                  return false;
                }
              }}
              className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                searchParams.set("page", Math.max(...totalPages).toString());
                setSearchParams(searchParams);
              }}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">End</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
