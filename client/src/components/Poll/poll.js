import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/spinner';
import './poll.css';

class Poll extends Component {
    constructor() {
        super();
        this.state = {
            question: null,
            pollOptions: null,
            clickedOption: null,
            ips: null,
            clientIP: null
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get('/polls/'+id).then((response) => {
            let data = response.data.data;
            this.setState({
                question: data.title,
                pollOptions: data.pollOptions,
                ips: data.ips
            });
        }).catch((error) => {
            if (error.response.status === 404) {
                window.location.href = '/';
            }
        });
        axios.get('http://ip.jsontest.com/').then((response) => {
            let ip = response.data.ip;
            for (let i = 0; i < this.state.ips.length; i++) {
                if (this.state.ips[i].clientIP === ip) {
                    alert('yes!!!');
                }
            }
            this.setState({ clientIP: ip });
        });
    }

    handleRadioChange = (e) => {
        this.setState({
            clickedOption: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/polls/'+this.props.match.params.id, {
            clickedOption: this.state.clickedOption,
            clientIP: this.state.clientIP
        }).then((response) => {
            console.log(response);
        })
    }
    render() {
        return (
            <div className="poll">
                <h1 className="poll__header">Vote</h1>
                <form onSubmit={this.handleSubmit} className="poll__vote">
                    <p className="poll__question">{this.state.question}</p>
                    {
                        this.state.pollOptions ? (
                            this.state.pollOptions.map((item, i) => {
                                return (
                                    <label onChange={this.handleRadioChange} key={i}>
                                        {item.text}
                                        <input value={item.text} className="poll__option" name="option" type="radio" /> 
                                        <span className="checkmark"></span>
                                    </label>
                                )
                            })
                        ) : (
                            <Spinner />
                        )
                    }
                    <div className="poll__vote__buttons">
                        <button type="submit" className="poll__vote__btn-vote">Vote</button>
                        <button className="poll__vote__btn-result">Results</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Poll;