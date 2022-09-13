import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import config from "../assets/config";
import Spinner from "react-bootstrap/Spinner";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";

interface IOptions {
  limit: number;
  offset: number;
  orderBy?: string;
  search?: string;
}

const formatDate = (date: string) => {
  let hours;
  let year;
  let arr = date.split("T");
  hours = arr[1].split(".").slice(0, 1).toString();
  year = arr[0].split("-");
  year = `${year[2]}/${year[1]}/${year[0]}`;
  let fixedDate = `on ${year}, at ${hours}`;
  return fixedDate;
};

const getPosts = async (options: IOptions) => {
  const searchParams = new URLSearchParams(Object.entries(options));
  const url = `${config.apiHost}posts?${searchParams.toString()}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    if (data.success)
      return data as { posts: any[]; pages: number; searchFromDB: any[] };
    else {
      return { posts: [], pages: 0, searchFromDB: [] };
    }
  } else {
    return { posts: [], pages: 0, searchFromDB: [] };
  }
};

function Index() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [pages, setPages] = useState(0);

  useEffect(() => {
    // const limit = 20;
    // const offset = (page - 1) * limit;
    // if (!searchParams.get("search")) {
    //   setTimeout(() => getPosts({ limit: limit, offset: offset }), 120 * 1000);
    // }
  }, [posts]);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setPage(page);
    const search = searchParams.get("search") || undefined;
    const orderBy = searchParams.get("orderBy") || undefined;
    const limit = 20;
    const offset = (page - 1) * limit;

    // set fetch options
    const options: IOptions = { limit: limit, offset: offset };
    search && (options.search = search.toString().toLowerCase());
    orderBy && (options.orderBy = orderBy.toLowerCase());

    getPosts(options).then((data) => {
      if (data.posts.length >= 0) {
        setPosts(data.searchFromDB);
      } else {
        setPosts(data.posts);
      }
      setPages(data.pages);
      setLoader(false);
    });
  }, [searchParams]);

  return (
    <div className="index">
      <Spinner
        animation="border"
        role="status"
        style={!loader ? { display: "none" } : { display: "unset" }}
        className="spinner"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <div className="posts">
        <h5 style={{ marginBottom: 30 }}>Recent Posts</h5>
        <Accordion
          className="list"
          style={!loader ? { visibility: "visible" } : { visibility: "hidden" }}
        >
          {posts.map((element, i) => {
            return (
              <Accordion.Item key={i} eventKey={i.toString()}>
                <Accordion.Header style={{ position: "relative" }}>
                  {element.title}
                  <div
                    style={{
                      position: "absolute",
                      right: 60,
                      fontSize: 12,
                    }}
                  >
                    By {element.author},{formatDate(element.date)}
                  </div>
                </Accordion.Header>
                <Accordion.Body>{element.content}</Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
      <div className="pagination">
        <Pagination
          count={pages}
          page={page}
          onChange={(e, value: number) => {
            setPage(value);
            searchParams.set("page", value + "");
            setSearchParams(searchParams);
          }}
        />
      </div>
    </div>
  );
}

export default Index;
