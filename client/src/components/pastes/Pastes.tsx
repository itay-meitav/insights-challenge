import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import config from "../../assets/config";
import List from "./List";
import Pagination from "./Pagination";
import { useRecoilState } from "recoil";
import { pastesState } from "./globalStates";

const askForNewPastes = async () => {
  const url = `${config.apiHost}api/pastes/new`;
  const response = await fetch(url);
  const data = await response.json();
  return data.documents;
};

function Pastes() {
  const [pastes, setPastes] = useRecoilState(pastesState);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    fetch(`${config.apiHost}api/pastes${location.search}`)
      .then(async (res) => await res.json())
      .then((data) => {
        setPastes({
          pastes: data.documents,
          pastesCount: data.count,
        });
      });
  }, [searchParams]);

  return (
    <div>
      <List />
      <Pagination />
    </div>
  );
}

export default Pastes;
