import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import Search from "./Search";
import { useNavigate, useLocation } from "react-router-dom";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = [
    {
      name: "Pastes",
      current: location.pathname == "/pastes" ? true : false,
    },
    {
      name: "Tags",
      current: location.pathname == "/tags" ? true : false,
    },
    {
      name: "Statistics",
      current: location.pathname == "/statistics" ? true : false,
    },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-5">
              {/* Mobile menu button*/}
              <Disclosure.Button className="flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <ClipboardDocumentCheckIcon
                    stroke="white"
                    className="block h-8 w-auto"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <div
                        key={item.name}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/${item.name.toLowerCase()}`)}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3">
                <Search />
                <button
                  type="button"
                  className="rounded-full bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="div"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/${item.name.toLowerCase()}`)}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
