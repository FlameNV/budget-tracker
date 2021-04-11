import React, {Component} from 'react'
import fire from "../../firebase/firebase";
import "./Tracker.style.css"
import Expense from "./Expense/Expense"
import DatePicker from "./Calendar/DatePicker";

class Tracker extends Component {

    state = {
        expenses: [],
        totalMoney: 0,

        category: '',
        amount: '',
        date: new Date(),
        currentUID: fire.auth().currentUser.uid
    }

    logout = () => {
        fire.auth().signOut()
    }

    handleChange = input => e => {
        this.setState({
            [input]: e.target.value
        })
    }

    createEntry = () => {
        const {
            category,
            amount,
            currentUID,
            totalMoney
        } = this.state;

        if (category && amount) {
            const BackUpState = this.state.expenses
            BackUpState.push({
                id: BackUpState.length + 1,
                category: category,
                amount: amount,
                user_id: currentUID
            })

            fire.database().ref('Expenses/' + currentUID).push({
                id: BackUpState.length,
                category: category,
                amount: amount,
                user_id: currentUID
            }).then((data) => {
                this.setState({
                    expenses: BackUpState,
                    totalMoney: totalMoney + parseFloat(amount),
                    category: '',
                    amount: ''
                })
            }).catch((error) => {
                console.log('error', error)
            })
        }
    }

    componentWillMount() {
        const {currentUID, totalMoney} = this.state
        let sumMoney = totalMoney
        const BackUpState = this.state.expenses
        fire.database().ref('Expenses/' + currentUID).once('value',
            (snapshot) => {
                snapshot.forEach((childSnapshot) => {

                    sumMoney =
                        sumMoney + parseFloat(childSnapshot.val().amount);

                    BackUpState.push({
                        id: childSnapshot.val().id,
                        category: childSnapshot.val().category,
                        amount: childSnapshot.val().amount,
                        user_id: childSnapshot.val().user_id
                    })
                })

                this.setState({
                    expenses: BackUpState,
                    totalMoney: sumMoney
                })

            })
    }

    render() {

        let currentUser = fire.auth().currentUser;

        return (
            <>
                <div className="container">
                    <div className='row'>
                        <div className='header'>
                            <h2>Budget Tracker App</h2>
                            <div className='header-right'>
                                <h5>{currentUser.displayName}</h5>
                                <button className="btn red lighten-1 logoutBtn"
                                        onClick={this.logout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <DatePicker/>
                        </div>
                        <div className="col s6">
                            <form>
                                <div className="input-field">
                                    <input type="number"
                                           placeholder="Spent amount ($)"
                                           value={this.state.amount}
                                           onChange={this.handleChange('amount')}
                                           name="amount"/>
                                </div>
                                <div className="input-field">
                                    <input type="text"
                                           placeholder="Category"
                                           value={this.state.category}
                                           onChange={this.handleChange('category')}
                                           name="category"/>
                                </div>
                            </form>
                            <div className="submitBtn">
                                <button className="btn waves-effect waves-light"
                                        type="submit"
                                        onClick={() => this.createEntry()}
                                        name="action">Create entry
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6 offset-s3">
                            <h2>Day spendings</h2>
                            <ul>
                                {
                                    Object.keys(this.state.expenses).map((id) => (
                                        <Expense key={id}
                                            category={this.state.expenses[id].category}
                                            amount={this.state.expenses[id].amount}
                                        />
                                    ))
                                }
                            </ul>
                            <h4>Total: {this.state.totalMoney}$</h4>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Tracker