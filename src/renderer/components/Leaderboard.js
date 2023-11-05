import * as React from 'react'
import logo from '../static/logo.png'
import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider'

const Leaderboard = ({type}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);

  const getPar = (score, par) => {

    return (par - score) * -1;

  }

  const getMode = (type) => {


    let options ={
      "name": "Today",
      "title": "Best of Today",
      "scores": []
    }

    if (state.leaderboard != null) {

      if (type == "week"){
        options["name"] = "week";
        options["title"] = "Best Of The Week";
        options["scores"] = state.leaderboard["week"];

      }else if (type == "month"){

        options["name"]= "month";
        options["title"] = "Best Of The Month";
        options["scores"] = state.leaderboard["month"];

      }else if (type == "ever"){

        options["name"]= "ever"; 
        options["title"] = "Best Ever";
        options["scores"] = state.leaderboard["ever"];
      
      }else{
        options["scores"] = state.leaderboard["today"];
 
      }
  }
  return options;
}
  const renderScores = () =>{
    if (state.leaderboard != null) {
      if (getMode(type) != null) { 
          var mode = getMode(type); 
          console.log(mode);
          if (mode["scores"] != null) { 
            var slides = mode["scores"].map(value => {
            return(  
              <div key={} className="leaderboard-item">
              <span>{value.position}</span>
              <span>{value.name}</span>
              <span>{getPar(value.score,value.par)}</span> 
            </div>
            )
      })
      return slides;
    }
  }
  }
  }

  return (
    <div className='leaderboard-background leaderboard'>
      <img className='logo' src={logo} />
      <h1>Leaderboard</h1> 
      <h2>{getMode(type).title}</h2>
      <div className="leaderboard-content">
        {renderScores()}
      </div>
    </div>

  )
}
export default Leaderboard
 