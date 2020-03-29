import React from "react";
import MatchesCarousel from "./MatchesCarousel";

const Matches = ({ currentMatches, upcomingMatches }) => {
  return <MatchesCarousel matches={upcomingMatches} />;
};

const withMatchesLayout = (WrappedComponent) => props => {
  return (
    <div>
      <h1>Matches</h1>
      <WrappedComponent {...props} />
    </div>
  );
}

export default withMatchesLayout(Matches);