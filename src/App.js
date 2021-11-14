import React, { useState, useEffect } from "react"
import Facade from "./apiFacade";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import CatFacts from "./Components/CatFacts"
import Header from "./Components/Header"
import Home from "./Components/Home"
import Products from "./Components/Products"
import './App.css'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const logout = () => {
    Facade.logout()
    setLoggedIn(false)
  }

  const login = (user, pass) => {

    Facade.login(user, pass)
      .then(res => setLoggedIn(true));
  }

  return (
    <Container>
      <Router>
        <Header facade={Facade} loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Home loggedIn={loggedIn} login={login} facade={Facade} logout={logout}
            />
          </Route>
          <Route exact path="/CatFacts">
            {Facade.hasUserAccess('user', loggedIn) &&
              <CatFacts facade={Facade}
              />}
          </Route>
          <Route exact path="/Products">
            {Facade.hasUserAccess('admin', loggedIn) &&
              <Products facade={Facade} // props for products
              />}
          </Route>

        </Switch>
      </Router>
    </Container>
  )

}
export default App;
