import React from "react";
import Match from "./Match";

const MatchesList = ({ matches }) => {
  if (matches.length === 0) {
    return (
      <div className="container-fluid mt-5">
        <p>
          There isn't anyone to match with in your area yet. Please check back
          soon!
        </p>
      </div>
    );
  }

  return (
    <ul id="matches" className="list d-flex flex-column w-100 mt-5 mb-5">
      {matches.map(({ table: { match, avatar }}) => (
        <li key={match.id} className="p-3 p-md-5">
          <Match match={match} avatar={avatar} />
        </li>
      ))}
    </ul>
  );
};

export default MatchesList;
