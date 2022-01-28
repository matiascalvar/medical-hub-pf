import React from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logUser } from "./actions";
import Appointments from "./components/Home/Appointments/Appointments";
import NewAppointment from "./components/Home/Appointments/NewAppointment";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  const activeUser = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const refreshToken = async function () {
      try {
        const response = await axios.post("http://localhost:3001/login/token");
        const user = {
          email: response.data.email,
          token: `${response.data.token_type} ${response.data.access_token}`,
        };
        dispatch(logUser(user));
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/appointments" component={Appointments} />
        <Route exact path="/home/appointments/new" component={NewAppointment} />
        <Route exact path="/home/userProfile" component={UserProfile} />
      </Switch>
    </div>
  );
}

export default App;
