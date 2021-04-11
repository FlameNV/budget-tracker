import React, {Component} from 'react'
import "./Login.style.css"
import fire from "../../firebase/firebase";

class Register extends Component {

    state = {
        email: '',
        password: '',
        displayName: '',
        fireErrors: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = e => {
        e.preventDefault()
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            let currentUser = fire.auth().currentUser
            currentUser.updateProfile({
                displayName: this.state.displayName
            })
        }).catch((error) => {
            this.setState({fireErrors: error.message})
        })
    }

    render() {
        let errorNotification = this.state.fireErrors ? (
            <div className="error">{this.state.fireErrors}</div>
        ) : null

        return (
            <>
                <div className="row">
                    <div className="col s4 offset-s4">
                        <h1>Budget Tracker App</h1>
                        <div className="card grey lighten-3">
                            <div className="card-content black-text">
                                {errorNotification}
                                <form>
                                    <div className="input-field">
                                        <input type="text"
                                               placeholder="Name"
                                               onChange={this.handleChange}
                                               value={this.state.displayName}
                                               name="displayName"/>
                                    </div>
                                    <div className="input-field">
                                        <input type="text"
                                               placeholder="Email"
                                               onChange={this.handleChange}
                                               value={this.state.email}
                                               name="email"/>
                                    </div>
                                    <div className="input-field">
                                        <input type="password"
                                               placeholder="Password"
                                               onChange={this.handleChange}
                                               value={this.state.password}
                                               name="password"/>
                                    </div>
                                    <div className="input-field enter-button">
                                        <input type="submit"
                                               onClick={this.register}
                                               className='btn blue lighten-1'
                                               value="SIGN UP"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Register