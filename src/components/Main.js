import React, {Component} from 'react'
import "./Main.style.css"
import Login from "./Forms/Login";
import Register from "./Forms/Register";
import fire from "../firebase/firebase";
import Tracker from "./Tracker/Tracker";
import Loader from "react-loader-spinner"

class Main extends Component {

    state = {
        user: 1,
        loading: true,
        formSwitcher: false
    }

    componentDidMount() {
        this.authListener()
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user})
            } else {
                this.setState({user: null})
            }
        })
    }

    formSwitcher = (action) => {
        console.log(action)
        this.setState({
            formSwitcher: action === 'register' ? true : false
        })
    }

    render() {

        const form = !this.state.formSwitcher ? <Login/> : <Register/>;

        if (this.state.user === 1) {
            return (
                <div className="main">
                    <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={200}
                        width={200}
                        timeout={3000} //3 secs
                    />
                </div>
            )
        }

        return (
            <>
                {!this.state.user ? (
                    <>
                        {form}
                        {!this.state.formSwitcher ?
                            (<span className="underline">
                    Not registered?
                    <button
                        onClick={() => this.formSwitcher(!this.state.formSwitcher ? 'register' : 'login')}
                        className="linkBtn">Create an account</button>
                    </span>) : (
                                <span className="underline">
                    Have an account?
                    <button
                        onClick={() => this.formSwitcher(!this.state.formSwitcher ? 'register' : 'login')}
                        className="linkBtn">Sign in here</button>
                    </span>)
                        }
                    </>
                ) : (<Tracker/>)
                }
            </>
        )
    }
}

export default Main