import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import config from "../assets/config";

function Index() {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    fetch(config.apiHost + "posts").then((res) => {
      if (res.ok)
        res.json().then((data) => {
          setPosts(data);
        });
    });
  }, []);
  return (
    <div className="posts" style={{ marginTop: 80, marginBottom: 90 }}>
      <h5 style={{ marginBottom: 30 }}>Recent Posts</h5>
      <Accordion style={{ width: 950 }}>
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
  );
}

export default Index;
