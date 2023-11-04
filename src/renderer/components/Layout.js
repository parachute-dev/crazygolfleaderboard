import * as React from 'react'
import logo from '../static/logo.png'
import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider'

const Layout = ({}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);

  return (
    <div className="">
      {children}
    </div>

  )
}
export default Layout
