import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './home';
import React from 'react';
import SignIn from './signIn';
import store from './redux/store';

export default class Routing extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/SignIn" render={(props) => {
                        return (<SignIn {...props} />);
                    }} />
                    <PrivateRoute path="/" component={Home} />
                </Switch>
            </Router>
        );
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            render={routeProps => {
                return store.getState().authentication.token ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/SignIn",
                                state: { from: routeProps.location }
                            }}
                        />
                    );
            }
            }
        />
    );
}