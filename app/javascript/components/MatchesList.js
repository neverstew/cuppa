import React from "react";

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
          <article className="card">
            { avatar ? 
              <img src={avatar} className='card-img-top' alt={`${match.name}'s picture`} /> :
              <img src="https://via.placeholder.com/728x90.png?text=No+Picture+Provided" className='card-img-top' alt={`${match.name} provided no picture`} />
            }
            <div className="card-body">
              <h5 className="card-title">{match.name}</h5>
              <p className="card-text">{match.description}</p>
              <div className="row float-right">
                <div className="column">
                  <button className="btn btn-danger mr-3">✋ No thanks</button>
                </div>
                <div className="column">
                  <button className="btn btn-success mr-3">
                    ❤️ Sounds great!
                  </button>
                </div>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default MatchesList;
