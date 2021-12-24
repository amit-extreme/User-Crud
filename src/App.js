import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserList from "./components/User/UserList";
import CreateUser from "./components/User/CreateUser";
import EditUser from "./components/User/EditUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <UserList {...props} />}
          ></Route>
          <Route
            exact
            path="/edit-user/:id"
            render={(props) => <EditUser {...props} />}
          ></Route>
          <Route
            exact
            path="/create-user"
            render={(props) => <CreateUser {...props} />}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
