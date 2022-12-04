import React, { useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import config from "../assets/config";
import { formatDate } from "./Index";

interface IOptions {
  limit: number;
  offset: number;
  orderBy?: string;
}

export async function getAlerts(options: IOptions) {
  const searchParams = new URLSearchParams(Object.entries(options));
  const url = `${config.apiHost}api/alerts?${searchParams.toString()}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data as { documents: any[]; pages: number };
  } else {
    return { documents: [], pages: 0 };
  }
}

export async function getLastAlert() {
  const response = await fetch(`${config.apiHost}api/alerts/last`);
  const lastAlert = await response.json();
  return lastAlert;
}

function Alerts() {
  const [loader, setLoader] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setPage(page);
    const orderBy = searchParams.get("orderBy") || undefined;
    const limit = 20;
    const offset = (page - 1) * limit;

    // set fetch options
    const options: IOptions = {
      limit: limit,
      offset: offset,
      orderBy: orderBy,
    };

    getAlerts(options).then((data) => {
      setAlerts(data.documents);
      setPages(data.pages);
      setLoader(false);
    });
  }, [searchParams]);

  return (
    <div className="alerts">
      <Spinner
        animation="border"
        role="status"
        style={!loader ? { display: "none" } : { display: "unset" }}
        className="spinner"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <h5 style={{ marginBottom: 30 }}>Recent Alerts</h5>
      <ListGroup
        className="list"
        style={!loader ? { visibility: "visible" } : { visibility: "hidden" }}
      >
        {alerts.map((element, i) => {
          return (
            <ListGroup.Item key={i} style={{ position: "relative" }}>
              {element.alert}
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  right: 20,
                  fontSize: 12,
                }}
              >
                - {formatDate(element.date.toString())}
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <div className="pagination">
        <Pagination
          style={loader ? { display: "none" } : { display: "unset" }}
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

export default Alerts;
