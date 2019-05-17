import React from 'react';
import { withTranslation } from 'react-i18next';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideUserMsg: true,
            hidePasswordMsg: true
        };
    }

    handleUserInput = (event) => {
        if (!event.target.value) {
            console.log(event.target.className);

            event.target.className = '';

            this.setState({ hideUserMsg: event.type === 'blur' ? false : true });
        }
    }

    handlePasswordInput = (event) => {
        if (!event.target.value) {
            this.setState({ hidePasswordMsg: event.type === 'blur' ? false : true });
        }
    }

    hideInputMsg (hideBool){
        return 'signin-error-input' + (hideBool ? ' hide' : '');
    }

    render() {
        const famoLogo = process.env.REACT_APP_CODE_URL + "/Content/Images/logo-famo-black-normal.png",
            { t } = this.props;

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
                                <form id="signin-form">
                                    <div className="signin-input-wrapper">
                                        <input type="text" id="signin-username-input" className="famo-input signin-form-input famo-text-3" placeholder={t('key_397')} name="username" defaultValue="" autoComplete="off" autoFocus onFocus={this.handleUserInput} onBlur={this.handleUserInput} />
                                        <SignInInputMsg msgClass={this.hideInputMsg(this.state.hideUserMsg)} msgText={t('key_196')} />
                                    </div>
                                    <div className="signin-input-wrapper">
                                        <input type="password" id="signin-password-input" className="famo-input signin-form-input famo-text-3" placeholder={t('key_314')} name="password" onFocus={this.handlePasswordInput} onBlur={this.handlePasswordInput} />
                                        <SignInInputMsg msgClass={this.hideInputMsg(this.state.hidePasswordMsg)} msgText={t('key_195')} />
                                    </div>
                                    <div className="signin-error-submit hide">
                                        {/* 400 */}
                                        <span className="famo-text-7">{t('key_398')}</span>
                                        {/* 500 */}
                                        <span className="famo-text-7">{t('key_306')}</span>
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
    };
};

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