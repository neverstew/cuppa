import React from "react"

const Match = ({ match, avatar }) => {
  return (
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
  )
}

export default Match
