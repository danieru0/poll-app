import React, { Component } from 'react';
import axios from 'axios';
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
            submitted: true
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        let options = [];
        for (let i = 0; i < this.state.optionsInputs.length; i++) {
            if (this.state.optionsInputs[i].text !== null && this.state.optionsInputs[i].length !== 0 && this.state.optionsInputs[i] !== '') {
                options.push({
                    text: this.state.optionsInputs[i].text,
                    votes: 0
                });
            }
        }
        axios.post('/polls', {
            title: this.state.question,
            pollOptions: options
        }).then((response) => {
            console.log(response);
        });
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
        }
    }
    render() {
        const isSubmitted = this.state.submitted;
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
                        isSubmitted ? (
                            <button className="add-poll__button" type="submit">Create poll</button>
                        ) : (
                            <p>Loading...</p>
                        )
                    }
                </form>
            </main>
        )
    }
}

export default Head;