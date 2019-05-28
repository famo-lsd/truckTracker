import axios from 'axios';
import Home from './home';
import httpStatus from 'http-status';
import React from 'react';
import SignIn from './signIn';
import store from './redux/store';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { NODE_SERVER } from './utils/constants';
import { setAuthUser } from './redux/actions';

export default class Routing extends React.Component {
    componentDidMount() {
        const { authentication } = store.getState();

        if (!authentication.user) {
            fetch(NODE_SERVER + 'Authentication/Session/User', {
                method: 'GET',
                credentials: 'include'
            }).then(res => {
                if (res.ok && res.status === httpStatus.OK) {
                    res.json().then(data => {
                        console.log(data);
                        store.dispatch(setAuthUser(data));
                    }).catch(err => {
                        console.log(err);
                    });
                }
                else {
                    console.log(res.status + " - " + res.statusText);
                }
            }).catch(err => {
                console.log(err);
            });

            axios({
                method: 'GET',
                url: NODE_SERVER + 'Authentication/Session/User'
            }).then((res) => {

            }).catch((err) => {
                console.log(err);
            });
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route exact path="/SignIn" render={(props) => {
                        return (<SignIn {...props} />);
                    }} />
                </Switch>
            </BrowserRouter>
        );
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    const { authentication } = store.getState();

    return (
        <Route
            render={routeProps => {
                return authentication.user ? (
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