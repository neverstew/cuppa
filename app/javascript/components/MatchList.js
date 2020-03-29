import React from "react";

const MatchListItem = ({ avatar, name, description }) => {
  return (
    <div className="media border p-2 pt-3 p-md-5">
      <img
        className="mr-3 img-fluid rounded-circle"
        style={{ width: "25%" }}
        src={avatar || "https://via.placeholder.com/100x100.png?text=x"}
        alt="pic"
      />
      <div className="media-body">
        <h5 className="mt-0">{name}</h5>
        <p style={{ textOverflow: "overflow" }}>{description}</p>
      </div>
    </div>
  );
};

const MatchList = ({ matches }) => {
  if (matches.length === 0) {
    return (
      <div className="column col-12 p-3">
        <p>You haven't got any matches yet. When someone seeking help matches with you, you'll be able to see them here.</p>
        <p>Check again soon to see if there are any updates.</p>
        <p>If it's been a while since you last had a match, consider <a className='text-link text-primary' href='/users/edit'><u>updating your profile</u></a>.</p>
    </div>  
    )
  }
  return (
    <div className="column col-12">
      {matches.map(({ table: { match, avatar } }) => (
        <MatchListItem key={match.id} avatar={avatar} {...match} />
      ))}
    </div>
  );
};

const MatchListWrapper = ({ matches }) => {
  const matchesLeft = 4 - matches.length;

  return (
    <>
      <div className="row ml-0-xs mr-0-xs">
        <MatchList matches={matches} />
      </div>
      <div className='row'>
        {matchesLeft < 2 && (
          <>
            <p className='col-12 text-center text-muted'>You have {matchesLeft} match{matchesLeft === 0 && 'es'} left.</p>
            <p className='col-12 text-center text-muted'>
              If you're building up a good relationship, keep it going! If not,
              consider engaging with someone else.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default MatchListWrapper;
