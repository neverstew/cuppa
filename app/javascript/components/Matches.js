import React, { useState } from "react";
import MatchesCarousel from "./MatchesCarousel";
import MatchListWrapper from './MatchList';

const Matches = ({ active, currentMatches, upcomingMatches }) => {
  if (active === 'upcoming') {
    return <MatchesCarousel matches={upcomingMatches} />;
  }

  return <MatchListWrapper matches={currentMatches} />;
};

const MatchesTabs = ({ active, navigate }) => {
  const activeClass = tab => active === tab ? 'btn-dark text-light' : 'btn-light';

  return (
    <div className='row ml-0 mr-0'>
      <div className='column col-6 pl-0 pr-0'>
        <a className={`w-100 btn pt-2 pr-4 pb-2 pl-4 ${activeClass('current')}`} onClick={() => navigate('current')}>Current</a>
      </div>
      <div className='column col-6 pl-0 pr-0'>
        <a className={`w-100 btn pt-2 pr-4 pb-2 pl-4 ${activeClass('upcoming')}`} onClick={() => navigate('upcoming')}>New</a>
      </div>
    </div>
  )
}

const withMatchesLayout = (WrappedComponent) => props => {
  const [tab, navigate] = useState('current');

  return (
    <div>
      <h1>Matches</h1>
      <MatchesTabs active={tab} navigate={navigate} />
      <WrappedComponent active={tab} {...props} />
    </div>
  );
}

export default withMatchesLayout(Matches);