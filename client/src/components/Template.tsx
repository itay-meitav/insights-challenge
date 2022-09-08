import React from "react";
import LeftNav from "./LeftNav";

function Template(props: any) {
  return (
    <div>
      <div className="">
        <LeftNav></LeftNav>
      </div>
      <div className="right-content">
        <div id="content">{props.children}</div>
      </div>
    </div>
  );
}

export default Template;
