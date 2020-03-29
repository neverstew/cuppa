import React, { useState, useCallback } from "react";
import Match from "./Match";

const MatchesList = ({ matches }) => {
  const [currentMatch, setCurrentMatch] = useState(0);

  if (matches.length === 0 || currentMatch > matches.length-1) {
    return (
      <div className="container-fluid mt-5">
        <p>
          There isn't anyone else to match with in your area yet. Please check
          back soon!
        </p>
      </div>
    );
  }

  const handleMatch = useCallback(
    (match, type) => {
      Rails.ajax({
        url: "/matches/match",
        type: "post",
        data: {
          id: match.id,
          type
        },
        success: () => {
          console.log(type, "recorded for user", match.id);
          setCurrentMatch(currentMatch + 1);
        },
        error: err => {
          console.error(type, "match handler failed for user", match.id, "Error: ", err);
          setCurrentMatch(currentMatch + 1);
        }
      });
    },
    [matches]
  );

  const {
    table: { match, avatar }
  } = matches[currentMatch];
  return (
    <div id="matches" className="mt-5 mb-5">
      <Match match={match} avatar={avatar} handleMatch={handleMatch} />
    </div>
  );
};

export default MatchesList;
