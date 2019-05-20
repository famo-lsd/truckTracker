import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './home';
import SignIn from './signIn';

export default class Routing extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route {...this.props} path="/SignIn" component={SignIn} />
                    <PrivateRoute {...this.props} path="/" component={Home} />
                </Switch>
            </Router>
        );
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    console.log(rest);

    return (
        <Route
            render={routeProps => {
                return false ? (
                    <Component {...rest} />
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