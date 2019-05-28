import Auth from './authentication';
import classNames from 'classnames';
import React from 'react';
import store from './redux/store';
import { Redirect } from 'react-router-dom';
import { setAuthUser } from './redux/actions';
import { withTranslation } from 'react-i18next';
import './utils/i18n';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            hideUserMsg: true,
            hidePwdMsg: true,
            authSuccess: false,
            authError: false,
            authHttpCode: -1
        };
    }

    hideInputMsg = (hideFlag) => {
        return 'signin-error-input' + (hideFlag ? ' hide' : '');
    }

    handleSignInSuccess = (user) => {
        store.dispatch(setAuthUser(user));
        this.setState({ authSuccess: true });
    }

    handleSignInError = (httpCode) => {
        const { t } = this.props;

        if (httpCode !== 400 && httpCode !== 500) {
            console.log(t('key_416') + ' - ' + httpCode);
        }

        this.refs.username.focus();
        this.setState({ password: '', hidePwdMsg: true, authError: true, authHttpCode: httpCode });
    }

    handleChangeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleUserInput = (event) => {
        if (!event.target.value) {
            this.setState({ hideUserMsg: event.type === 'blur' ? false : true });
        }
    }

    handlePwdInput = (event) => {
        if (!event.target.value) {
            this.setState({ hidePwdMsg: event.type === 'blur' ? false : true });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.username || !this.state.password) {
            this.setState({ hideUserMsg: this.state.username ? true : false, hidePwdMsg: this.state.password ? true : false });
        }
        else {
            this.setState({ authError: false, authHttpCode: -1 });
            Auth.signIn(this.state.username, this.state.password, this.handleSignInSuccess, this.handleSignInError);
        }
    }

    render() {
        const famoLogo = process.env.REACT_APP_CODE_URL + '/Content/Images/logo-famo-black-normal.png',
            inputClassName = 'famo-input signin-form-input famo-text-3',
            userInputClassName = classNames(inputClassName, { 'famo-input-error': !this.state.hideUserMsg }),
            pwdInputClassName = classNames(inputClassName, { 'famo-input-error': !this.state.hidePwdMsg }),
            errSubmitClassName = classNames('signin-error-submit', { 'hide': !this.state.authError }),
            { t } = this.props;

        if (this.state.authSuccess) {
            return <Redirect to={this.props.location.state || { from: { pathname: '/' } }} />;
        }

        return (
            <section className="famo-grid signin">
                <div className="famo-row">
                    <div className="famo-cell">
                        <div className="signin-body">
                            <div className="signin-famo-logo">
                                <img src={famoLogo} alt="FAMO" />
                            </div>
                            <div className="signin-form-wrapper">
                                <div className="signin-app-name">
                                    <span className="famo-text-2">{process.env.REACT_APP_WEBSITE_NAME}</span>
                                </div>
                                <form id="signin-form" method="POST" onSubmit={this.handleSubmit}>
                                    <div className="signin-input-wrapper">
                                        <input type="text" id="signin-username-input" className={userInputClassName} placeholder={t('key_397')} ref="username" name="username" value={this.state.username} autoComplete="off" autoFocus onChange={this.handleChangeInput} onFocus={this.handleUserInput} onBlur={this.handleUserInput} />
                                        <SignInInputMsg msgClass={this.hideInputMsg(this.state.hideUserMsg)} msgText={t('key_196')} />
                                    </div>
                                    <div className="signin-input-wrapper">
                                        <input type="password" id="signin-password-input" className={pwdInputClassName} placeholder={t('key_314')} ref="password" name="password" value={this.state.password} onChange={this.handleChangeInput} onFocus={this.handlePwdInput} onBlur={this.handlePwdInput} />
                                        <SignInInputMsg msgClass={this.hideInputMsg(this.state.hidePwdMsg)} msgText={t('key_195')} />
                                    </div>
                                    <div className={errSubmitClassName}>
                                        {this.state.authError && this.state.authHttpCode === 400 && <span className="famo-text-7">{t('key_398')}</span>}
                                        {this.state.authError && this.state.authHttpCode === 500 && <span className="famo-text-7">{t('key_306')}</span>}
                                    </div>
                                    <button className="famo-button famo-confirm-button signin-button-submit" type="submit">
                                        <span className="famo-text-5">{t('key_238')}</span>
                                    </button>
                                    <button type="button" className="famo-button famo-transparent-button signup-button">
                                        <span className="famo-text-27">{t('key_648')}</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="famo-row">
                    <div className="famo-cell famo-cell-bottom">
                        <div className="signin-footer text-center">
                            <span className="famo-text-1">{new Date().getFullYear()} &copy; FAMO - {process.env.REACT_APP_WEBSITE_NAME}</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

class SignInInputMsg extends React.Component {
    render() {
        const { msgClass, msgText } = this.props;

        return (
            <div className={msgClass}>
                <span className="famo-text-7">{msgText}</span>
            </div>);
    }
}

export default withTranslation()(SignIn);