import React, { useState, useCallback } from "react";
import Match from "./Match";

const MatchesList = ({ matches }) => {
  const [currentMatch, setCurrentMatch] = useState(0);

  const handleMatch = useCallback((match, type) => {
    const data = JSON.stringify({
      match: {
        id: match.id,
        relationship: type
      }
    });
    
    Rails.ajax({
      beforeSend(xhr, options) {
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        // Workaround: add options.data late to avoid Content-Type header to already being set in stone
        // https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts/rails-ujs/utils/ajax.coffee#L53
        options.data = data;
        return true;
      },
      url: "/matches.json",
      type: "post",
      success: () => {
        console.log(type, "recorded for user", match.id);
        setCurrentMatch(currentMatch + 1);
      },
      error: err => {
        console.error(
          type,
          "match handler failed for user",
          match.id,
          "Error: ",
          err
        );
        setCurrentMatch(currentMatch + 1);
      }
    });
  });

  if (matches.length === 0 || currentMatch > matches.length - 1) {
    return (
      <div className="container-fluid mt-5">
        <p>
          There isn't anyone else to match with in your area yet. Please check
          back soon!
        </p>
      </div>
    );
  }

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
