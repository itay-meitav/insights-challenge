import { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import config from "../assets/config";
import Spinner from "react-bootstrap/Spinner";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import moment from "moment";

type Paste = {
  content: string;
  author: string;
  title: string;
  date: Date;
};

type Alert = {
  alert: string;
  date: Date;
};

function Index() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [pages, setPages] = useState(0);
  let alert = alerts.at(0);

  // useEffect(() => {
  //   const options: IOptions = {
  //     limit: 20,
  //     offset: 0,
  //   };
  //   getAlerts(options).then((data) => {
  //     setAlerts(data.documents);
  //   });
  //   setInterval(async () => {
  //     const lastAlert = await getLastAlert();
  //     if (alert.date !== lastAlert.date) {
  //       addToast({
  //         body: alert.alert,
  //         date: formatDate(alert.date),
  //       });
  //     }
  //   }, 20 * 1000);
  // }, []);

  // useEffect(() => {
  //   const limit = 20;
  //   const offset = (page - 1) * limit;
  //   if (!searchParams.get("search")) {
  //     setTimeout(() => {
  //       askForNewPastes().then((data) => {
  //         if (data.success) getPastes({ limit: limit, offset: offset });
  //         return false;
  //       });
  //     }, 120 * 1000);
  //   }
  // }, [posts]);

  useEffect(() => {
    fetch(`${config.apiHost}api/pastes${window.location.search}`)
      .then(async (res) => await res.json())
      .then((data) => {
        setPastes(data.documents);
        setPages(data.pages);
      });
  }, [searchParams]);

  if (!pastes)
    return (
      <div className="index">
        <Spinner animation="border" role="status" className="spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  return (
    <div className="index">
      <div className="posts">
        <h5 style={{ marginBottom: 30 }}>Recent Posts</h5>
        <Accordion className="list">
          {pastes.map((element, i) => {
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
                    By {element.author},{moment(element.date).format("LLL")}
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
