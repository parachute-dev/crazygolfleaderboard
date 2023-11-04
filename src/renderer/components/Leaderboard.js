import * as React from 'react'
import logo from '../static/logo.png'
import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider'

const Leaderboard = ({}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);

  const getPar = (score, par) => {

    return (par - score) * -1;

  }
  const renderLeaderboard = () =>{
    if (state.leaderboard != null) {
    var slides =  state.leaderboard.map(value => {
        return(
          <div className="leaderboard-item">
          <span>X</span>
          <span>{value.name}</span>
          <span>{getPar(value.score,value.par)}</span>
        </div>
        )
      })
      return slides;
    }
  }

  return (
    <div className='leaderboard-background leaderboard'>
      <img className='logo' src={logo} />
      <h1>Leaderboard</h1>
      <h2>Best of all time</h2>
      <div className="leaderboard-content">
        {renderLeaderboard()}
      </div>
    </div>

  )
}
export default Leaderboard
