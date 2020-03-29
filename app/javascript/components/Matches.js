import React from "react";
import MatchesCarousel from "./MatchesCarousel";

const Matches = ({ currentMatches, upcomingMatches }) => {
  return <MatchesCarousel matches={upcomingMatches} />;
};

export default Matches;
