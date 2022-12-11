import React from "react";
import Heading from "../Heading";

function Tags() {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="p-7">
        <Heading
          heading="Tags List"
          des="Add keywords for searching pastes that contain them"
        />
      </div>
    </div>
  );
}

export default Tags;
