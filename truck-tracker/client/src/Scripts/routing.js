import Home from './home';
import React from 'react';
import SignIn from './signIn';
import store from './redux/store';
import { BrowserRouter, HashRouter, Route, Redirect, Switch } from 'react-router-dom';

export default class Routing extends React.Component {
    render() {
        if (!window.cordova) {
            return (
                <BrowserRouter>
                    <RoutingBody />
                </BrowserRouter>
            );
        }
        else {
            return (
                <HashRouter>
                    <RoutingBody />
                </HashRouter>
            );
        }
    }
}

function RoutingBody() {
    const { authUser } = store.getState();

    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/SignIn" render={(routeProps) => {
                return authUser ? (<Redirect to={{ pathname: "/" }} />) : (<SignIn {...routeProps} />);
            }} />
        </Switch>
    );
}

function PrivateRoute({ component: Component, ...rest }) {
    const { authUser } = store.getState();

    return (
        <Route
            render={routeProps => {
                return authUser ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/SignIn",
                                state: { from: routeProps.location }
                            }}
                        />
                    );
            }}
        />
    );
}