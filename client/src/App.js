import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext} from "./context/AuthContext";

function App() {
  const { user } = useContext( AuthContext );

  return (
  <Router>
    <Switch>
      <Route exact path = "/">
        {user ? <Home/> : <Login/>} 
      </Route>
      <Route exact path = "/login">
        {user ? <Home/> : <Login/>}
      </Route>
      <Route exact path = "/register">
        {user ? <Home/> : <Register/>}
      </Route>
      <Route exact path = "/searchResults">
        {user ? <Search/> : <Login/>}
      </Route>
    </Switch>
  </Router>
  )

}

export default App;
