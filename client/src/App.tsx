import React from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logUser } from "./actions";
import ProtectedRoute from "./protectedRoute"
import Appointments from "./components/Home/Appointments/Appointments";
import NewAppointment from "./components/Home/Appointments/NewAppointment";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import History from "./components/History/History";
import PrePago from "./components/MercadoPago/PrePago";
import MercadoPago from "./components/MercadoPago/MercadoPago";
import NotFound from "./components/NotFound/NotFound";

function App() {
    const dispatch = useDispatch();
  
    const [ loaded, setLoaded ] = React.useState(false)

    React.useEffect(() => {
        const refreshToken = async function () {
            try {
                const response = await axios.post("http://localhost:3001/login/token");
                const user = {
                    email: response.data.email,
                    role: response.data.role,
                    token: `${response.data.token_type} ${response.data.access_token}`,
                };
                dispatch(logUser(user));
            } catch (error) {
                console.log("No user logged");
            }
        setLoaded(true)
        };
    refreshToken();
    }, []);

    return (
         <div className="App">
            {loaded? 
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <ProtectedRoute exact path="/home" component={Home} />
                    <ProtectedRoute exact path="/home/appointments" component={Appointments} />
                    <ProtectedRoute exact path="/home/appointments/new" component={NewAppointment}/>
                    <ProtectedRoute exact path="/home/userProfile" component={UserProfile} />
                    <ProtectedRoute exact path="/home/history" component={History} />
                    <ProtectedRoute exact path="/prepago" component={PrePago} />
                    <ProtectedRoute exact path="/mercadopago" component={MercadoPago} />
                    <Route component={NotFound} />
                </Switch> :
                <h4>Loading...</h4>}
         </div>     
    )
}

export default App;
