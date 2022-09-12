import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import config from "../assets/config";
import Spinner from "react-bootstrap/Spinner";
import { useSearchParams } from "react-router-dom";

function Index() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("search")) {
      setTimeout(() => fetchPosts(), 120 * 1000);
    }
  }, [posts]);

  useEffect(() => {
    setLoader(true);
    if (searchParams.get("search") !== null) {
      fetchPostsSearch(
        searchParams.get("search")!.toString().toLowerCase()
      ).then(() => setLoader(false));
    } else {
      setLoader(true);
      fetchPosts().then(() => setLoader(false));
    }
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
          {posts.map((element) => {
            return (
              <Accordion.Item key={element.id} eventKey={element.id}>
                <Accordion.Header style={{ position: "relative" }}>
                  {element.title}
                  <div
                    style={{
                      position: "absolute",
                      right: 60,
                      fontSize: 12,
                    }}
                  >
                    {element.info}
                  </div>
                </Accordion.Header>
                <Accordion.Body>{element.content}</Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </div>
  );

  async function fetchPosts() {
    await fetch(config.apiHost + "posts").then((res) => {
      if (res.ok)
        res.json().then((data) => {
          setPosts(data);
        });
    });
  }

  async function fetchPostsSearch(searchKey: string) {
    await fetch(config.apiHost + "search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: `${searchKey}`,
      }),
    }).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          setPosts(data);
        });
    });
  }
}

export default Index;
