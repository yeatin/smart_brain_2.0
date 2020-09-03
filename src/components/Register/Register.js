import React from 'react';
import { setEmail, setPassword, setName, submitRegister } from '../../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        newEmail: state.changeRegister.newEmail,
        newPassword: state.changeRegister.newPassword,
        newName: state.changeRegister.newName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEmailChange: (event) => dispatch(setEmail(event.target.value)),
        onPasswordChange: (event) => dispatch(setPassword(event.target.value)),
        onNameChange: (event) => dispatch(setName(event.target.value)),
        onSubmitRegister: () => dispatch(submitRegister())
    }
}
class Register extends React.Component {

    render() {
        const { onEmailChange, onPasswordChange, onNameChange, onSubmitRegister } = this.props;
        return (
            <article className="br3 ba b--black-20 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center" style={{ position: 'relative', zIndex: 1}}>
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">User Name</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" name="name" id="name" 
                                onChange={onNameChange}
                                onKeyPress={(key) => key.which === 13 ? onSubmitRegister() :null}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address" id="email-address" 
                                onChange={onEmailChange}
                                onKeyPress={(key) => key.which === 13 ? onSubmitRegister() :null}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" name="password" id="password" 
                                onChange={onPasswordChange}
                                onKeyPress={(key) => key.which === 13 ? onSubmitRegister() :null}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="tc b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="text" 
                            onClick= {onSubmitRegister}
                            value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);