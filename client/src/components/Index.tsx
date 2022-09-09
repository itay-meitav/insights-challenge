import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import config from "../assets/config";
import Spinner from "react-bootstrap/Spinner";

function Index() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  useEffect(() => {
    fetch(config.apiHost + "posts").then((res) => {
      if (res.ok)
        res.json().then((data) => {
          setPosts(data);
        });
    });
    setLoader(false);
  }, []);
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
}

export default Index;
