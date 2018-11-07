import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/spinner';
import './all.css';

class All extends Component {
    constructor() {
        super();
        this.state = {
            polls: [],
            page: 1,
            loading: false
        }
    }

    getPolls() {
        axios.get(`/polls?page=${this.state.page}&limit=2`).then((response) => {
            let statePolls = this.state.polls;
            for (let i = 0; i < response.data.data.docs.length; i++) {
                statePolls.push({
                    title: response.data.data.docs[i].title,
                    date: response.data.data.docs[i].date,
                    uniqueID: response.data.data.docs[i].uniqueID
                });
            }
            this.setState({
                polls: statePolls,
                page: this.state.page+1,
                loading: false
            });
        });
    }

    componentDidMount() {
        this.getPolls();
    }

    showMore = () => {
        this.setState({
            loading: true
        });
        this.getPolls();
    }
    render() {
        return (
            <div className="all">
                <h1 className="all__header">All polls</h1>
                    {
                        this.state.polls ? (
                            this.state.polls.map((item) => {
                                return (
                                    <a href={`/${item.uniqueID}`} key={item.uniqueID} className="all__poll">
                                        <div className="poll__title">
                                            <p>{item.title}</p>
                                        </div>
                                        <p className="poll__date">{item.date.substring(0, item.date.indexOf("T"))}</p>
                                    </a>                              
                                )
                            })
                        ) : (
                            <Spinner />
                        )
                    }
                    {
                        this.state.loading ? (
                            <div className="all__loading-more"><Spinner /></div>
                        ) : (
                            ''
                        )
                    }
                    <button onClick={this.showMore} className="all__show-more">Show more polls</button>
            </div>
        )
    }
}

export default All;