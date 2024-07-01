import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CardDetails = () => {
  let { id } = useParams();

  let [fetchedData, updateFetchedData] = useState([]);
  let { name, location, origin, gender, image, status, species, episode } =
    fetchedData;

  let api = `https://rickandmortyapi.com/api/character/${id}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      updateFetchedData(data);
    })();
  }, [api]);

  // Function to extract episode number from the URL
  const extractEpisodeNumber = (url) => {
    const parts = url.split("/");
    return `episode-${parts[parts.length - 1]}`;
  };

  return (
    <div className="container d-flex justify-content-center mb-5">
      <div className="d-flex flex-column gap-3 text-white col-lg-3 col-6">
        <h1 className="text-center">{name}</h1>

        <img className="profile-p" src={image} alt="" />
        {(() => {
          if (status === "Dead") {
            return <div className="badge bg-danger fs-5">{status}</div>;
          } else if (status === "Alive") {
            return <div className=" badge bg-success fs-5">{status}</div>;
          } else {
            return <div className="badge bg-secondary fs-5">{status}</div>;
          }
        })()}
        <div className="content">
          <div className="">
            <span className="fw-bold">Gender : </span>
            {gender}
          </div>
          <div className="">
            <span className="fw-bold">Location: </span>
            {location?.name}
          </div>
          <div className="">
            <span className="fw-bold">Origin: </span>
            {origin?.name}
          </div>
          <div className="">
            <span className="fw-bold">Species: </span>
            {species}
          </div>
          <div className="">
            <span className="fw-bold">Episodes: </span>
            {episode?.map((ep, index) => (
              <span key={index} className="badge bg-info text-dark me-1">
                {extractEpisodeNumber(ep)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
