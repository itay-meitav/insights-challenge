import React, { ReactElement } from "react";

interface ICardProps {
  title: string;
  children: ReactElement;
}

function Card(props: ICardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{props.title}</h2>
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
}

export default Card;
