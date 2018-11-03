import React, { Component } from 'react';
import axios from 'axios';
import ErrorPopup from '../errorPopup/error';
import './head.css';

class Head extends Component {
    constructor() {
        super();
        this.state = {
            question: null,
            optionsInputs: [
                {
                    id: 0,
                    text: null
                },
                {
                    id: 1,
                    text: null
                },
                {
                    id: 2,
                    text: null
                }
            ],
            submitted: false,
            questionError: true,
            optionsError: true,
            errorPopup: false
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        //this.setState({ submitted: true });
        let options = [];
        for (let i = 0; i < this.state.optionsInputs.length; i++) {
            if (this.state.optionsInputs[i].text) {
                options.push({
                    text: this.state.optionsInputs[i].text,
                    votes: 0
                });
            }
        }
        if (options.length < 2) {
            this.setState({ optionsError: true });
        } else {
            this.setState({ optionsError: false });
        }
        if (!this.state.questionError && options.length >= 2) {
            axios.post('/polls', {
                title: this.state.question,
                pollOptions: options
            }).then((response) => {
                console.log(response);
            });
        } else {
            this.setState({ errorPopup: true });
        }
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name !== 'question') {
            let pollOptions = [...this.state.optionsInputs];
            let option = {...pollOptions[name]};
            option.text = value;
            pollOptions[name] = option;
            this.setState({ optionsInputs: pollOptions });
            if (Number(name) === this.state.optionsInputs.length -1) {
                let newInput = {
                    id: this.state.optionsInputs.length,
                    text: null
                }
                this.setState({
                    optionsInputs: [...this.state.optionsInputs, newInput]
                });
            }
        } else {
            this.setState({ question: value });
            if (value.length < 2) {
                this.setState({ questionError: true });
            } else {
                this.setState({ questionError: false });
            }
        }
    }

    getErrors = () => {
        let errors = [];
        if (this.state.questionError) {
            errors.push({errorMessage: 'Question is required!'});
        }
        if (this.state.optionsError) {
            errors.push({errorMessage: 'At least 2 options are required!'});
        }
        return errors;
    }

    closePopup = () => {
        this.setState({ errorPopup: false });
    }
    render() {
        return (
            <main className="head">
                <h1 className="head__header">Create a free poll</h1>
                <form onSubmit={this.handleSubmit} className="head__add-poll">
                    <input onChange={this.handleInputChange} name="question" placeholder="Question here" className="add-poll__input" type="text" />
                    {
                        this.state.optionsInputs.map((item) => {
                            return (
                                <input key={item.id} onChange={this.handleInputChange} name={item.id} placeholder="Poll option" className="add-poll__input" type="text" />
                            )
                        })
                    }
                    {
                        this.state.submitted ? (
                            <p>Loading...</p>
                        ) : (
                            <button className="add-poll__button" type="submit">Create poll</button>
                        )
                    }
                </form>
                {
                    this.state.errorPopup ? (
                        <ErrorPopup onClick={this.closePopup} errors={this.getErrors()}/>
                    ) : (
                        ''
                    )
                }
            </main>
        )
    }
}

export default Head;