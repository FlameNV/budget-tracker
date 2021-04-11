import React from 'react'

const Expense = props => {

    return (
        <>
            <li>
                <div className="card horizontal">
                    <div className="card-stacked">
                        <div className="card-content transaction">
                            <span>
                                {props.category}
                            </span>
                            <span>
                                {props.amount}$
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}

export default Expense