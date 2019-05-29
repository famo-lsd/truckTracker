import Authentication from './authentication';
import React from 'react';
import store from './redux/store';
import { setAuthUser } from './redux/actions';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
    handleSignOut = async (event) => {
        const signOutRes = await Authentication.signOut(),
            {history} = this.props;

        if (signOutRes.ok) {
            store.dispatch(setAuthUser(null));
            history.push('/SignIn');
        }
    }

    render() {
        console.log(this.props);

        return (
            <React.Fragment>
                <h1>Página inicial</h1>
                <button onClick={this.handleSignOut} style={{ marginTop: '50px' }}>Click</button>
            </React.Fragment>
        );
    }
}

export default withRouter(Home);