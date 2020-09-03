import React from 'react';
import { setEmail, setPassword, submitSignin } from '../../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        signinEmail: state.changeSignin.signinEmail,
        signinPassword: state.changeSignin.signinPassword
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEmailChange: (event) => dispatch(setEmail(event.target.value)),
        onPasswordChange: (event) => dispatch(setPassword(event.target.value)),
        onSubmitSignin: () => dispatch(submitSignin())
    }
}

class SignIn extends React.Component {

    render() {
        const { onRouteChange, onEmailChange, onPasswordChange, onSubmitSignin } = this.props;
        return (
            <article className="br3 ba b--black-20 mv4 w-20 w-50-m w-25-l shadow-5 mw6 center" style={{ position: 'relative', zIndex: 1 }}>
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email" name="email-address" id="email-address"
                                    onChange={onEmailChange}
                                    onKeyPress={(key) => key.which === 13 ? onSubmitSignin() :null}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password" name="password" id="password"
                                    onChange={onPasswordChange}
                                    onKeyPress={(key) => key.which === 13 ? onSubmitSignin() :null}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                onClick={onSubmitSignin}
                                value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f5 center pv1 mw4 mt3 link shadow-hover black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);