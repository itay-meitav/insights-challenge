import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";

const data = [
  {
    label: "Date",
    value: "date",
  },
  {
    label: "Title",
    value: "title",
  },
  {
    label: "Author",
    value: "author",
  },
  {
    label: "Content",
    value: "content",
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
    <Tabs value="date" className="self-end w-1/2 min-w-max">
      <TabsHeader>
        {data.map(({ label, value }) => {
          return (
            <Tab
              onClick={() => {
                if (sortValue) {
                  if (sortValue == value && searchParams.get("order") == "1") {
                    removeAllParams();
                    setParams(value, "-1");
                  } else {
                    removeAllParams();
                    setParams(value, "1");
                  }
                } else {
                  removeAllParams();
                  setParams(value, "1");
                }
              }}
              key={value}
              value={value}
            >
              {label}
            </Tab>
          );
        })}
      </TabsHeader>
    </Tabs>
  );
}

export default SortingTabs;
