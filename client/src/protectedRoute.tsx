import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, ...rest }: {component: any, exact: boolean, path: string}) {
    
    const activeUser = useSelector((state: any) => state.user)
    
    return <Route {...rest} render={(props) => {
        if (activeUser.token) {
            return <Component />
        } else {
            return (
                <Redirect to={{pathname: "/login", state: {from: props.location}}}/> 
            )
        }
    }}/>;
}

export default ProtectedRoute;
