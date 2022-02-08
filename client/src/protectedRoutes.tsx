import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

export function PatientRoute({ component: Component, ...rest }: {component: any, exact: boolean, path: string}) {
    
    const activeUser = useSelector((state: any) => state.user)
    
    return <Route {...rest} render={(props) => {
        if (activeUser.role === "patient") {
            return <Component />
        } else {
            return (
                <Redirect to={{pathname: "/login", state: {from: props.location}}}/> 
            )
        }
    }}/>;
}

export function MedicRoute({ component: Component, ...rest }: {component: any, exact: boolean, path: string}) {

    const activeUser = useSelector((state: any) => state.user)
    
    return <Route {...rest} render={(props) => {
        if (activeUser.role === "medic") {
            return <Component />
        } else {
            return (
                <Redirect to={{pathname: "/login", state: {from: props.location}}}/> 
            )
        }
    }}/>;
}

export function AdminRoute({ component: Component, ...rest }: {component: any, exact: boolean, path: string}) {

    const activeUser = useSelector((state: any) => state.user)
    console.log("entra a admin route", activeUser)
    return <Route {...rest} render={(props) => {
        if (activeUser.isAdmin) {
            return <Component />
        } else {
            return (
                <Redirect to={{pathname: "/login", state: {from: props.location}}}/> 
            )
        }
    }}/>;
}