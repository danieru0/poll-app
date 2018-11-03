import React, { Component } from 'react';
import './error.css';

class Error extends Component {
    render() {
        let { errors } = this.props;
        return (
            <div className="error-overlay">
                <div className="error">
                    <button onClick={this.props.onClick} className="error-btn">X</button>
                    {
                        errors.map((item) => {
                            return (
                                <p className="error-message">{item.errorMessage}</p>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Error;