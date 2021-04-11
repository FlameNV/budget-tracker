import React, {Component} from 'react'
import "./Login.style.css"
import fire from "../../firebase/firebase";

class Login extends Component {

    state = {
        email: '',
        password: '',
        fireErrors: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = e => {
        e.preventDefault()
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch((error) => {
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
                                               placeholder="Email"
                                               value={this.state.email}
                                               onChange={this.handleChange}
                                               name="email"/>
                                    </div>
                                    <div className="input-field">
                                        <input type="password"
                                               placeholder="Password"
                                               value={this.state.password}
                                               onChange={this.handleChange}
                                               name="password"/>
                                    </div>
                                    <div className="input-field enter-button">
                                        <input type="submit"
                                               onClick={this.login}
                                               className='btn blue lighten-1'
                                               value="SIGN IN"/>
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

export default Login