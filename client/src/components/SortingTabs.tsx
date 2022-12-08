import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";

const data = [
  {
    label: "Date",
    value: "date",
    desc: `Sort the results by date. Click the same tab in order to change the sort
    from ascending order to descending order and vice versa.`,
  },
  {
    label: "Title",
    value: "title",
    desc: `Sort the results by title. Click the same tab in order to change the sort
    from ascending order to descending order and vice versa.`,
  },
  {
    label: "Author",
    value: "author",
    desc: `Sort the results by author. Click the same tab in order to change the sort
    from ascending order to descending order and vice versa.`,
  },
  {
    label: "Content",
    value: "content",
    desc: `Sort the results by content. Click the same tab in order to change the sort
    from ascending order to descending order and vice versa.`,
  },
];

function SortingTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort");

  const removeAllParams = () => {
    searchParams.delete("title");
    searchParams.delete("author");
    searchParams.delete("content");
    searchParams.delete("date");
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  const setParams = (sort: string, order: string) => {
    searchParams.set("sort", sort);
    searchParams.set("order", order);
    setSearchParams(searchParams);
  };

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <Tabs value="date" className="max-w-lg">
          <TabsHeader>
            {data.map(({ label, value }) => {
              return (
                <Tab
                  onClick={() => {
                    if (sortValue) {
                      if (
                        sortValue == value &&
                        searchParams.get("order") == "1"
                      ) {
                        removeAllParams();
                        setParams(value, "-1");
                      } else {
                        removeAllParams();
                        setParams(value, "1");
                      }
                    } else {
                      removeAllParams();
                      setParams(value, "-1");
                    }
                  }}
                  key={value}
                  className="mr-2.5"
                  value={value}
                >
                  {label}
                </Tab>
              );
            })}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}

export default SortingTabs;
