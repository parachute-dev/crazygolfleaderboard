import React, {Context, createContext, useReducer, useEffect} from 'react';

import {clubs} from "../global";
export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  loading:false,
  location:  window.electron.store.get('LOCATION') != null ? parseInt(window.electron.store.get('LOCATION')) : 2,
  course:  window.electron.store.get('COURSE') != null ? parseInt(window.electron.store.get('COURSE')) : "edinburgh",
  portrait:  window.electron.store.get('PORTRAIT') != null ? parseInt(window.electron.store.get('PORTRAIT')) : "portrait",
  clubs: clubs,
  ads: null,
  leaderboard:null
};


function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      {
        return {
          ...state,
          loading: action.payload
        };
      }
      case 'SET_LEADERBOARD':
        {
          return {
            ...state,
            leaderboard: action.payload
          }
        }
        case 'SET_ADS':
          {
            return {
              ...state,
              ads: action.payload
            }
          }
      case 'SET_PORTRAIT':
        {
          return {
            ...state,
            portrait: action.payload
          }
        }
        case 'SET_CURRENT_COURSE' : {
          return {
            ...state,
            course: action.payload
          };
        }
        case 'SET_CURRENT_LOCATION' : {
          return {
            ...state,
            location: action.payload
          };
        }

        default : throw new Error('Bad Action Type');
      }
  }

  const GlobalContextProvider = ({children}) => {

    const [state,
      dispatch] = React.useReducer(reducer, initialState, (state) => {


      return {
        ...state,
      }
    })


    return (
      <GlobalStateContext.Provider value={state}>
        <GlobalDispatchContext.Provider value={dispatch}>
          {children}
        </GlobalDispatchContext.Provider>
      </GlobalStateContext.Provider>
    );
  };

  export default GlobalContextProvider;
