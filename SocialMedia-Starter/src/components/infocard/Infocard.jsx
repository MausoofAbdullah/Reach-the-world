import React from "react";
import "./Infocard.css";
import { UilPen } from "@iconscout/react-unicons";
import { useState } from "react";
import Profilemodal from "../profilemodal/Profilemodal";

const Infocard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="Infocard">
      <div className="infoHead">
        <h1>Your info</h1>
        <div>
          <UilPen
            width="2rem"
            height="1rem"
            onClick={() => {
              setModalOpened(true);
            }}
          />
          <Profilemodal modalOpened={modalOpened}
          setModalOpened={setModalOpened} />
        </div>
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>in relationship</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>Mamglore</span>
      </div>
      <div className="info">
        <span>
          <b>works at </b>
        </span>
        <span>brototype</span>
      </div>
      <button className="button logout-button">logout</button>
    </div>
  );
};

export default Infocard;
