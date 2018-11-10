import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/spinner';
import { Pie } from 'react-chartjs-2';
import './results.css';


class Results extends Component {
    constructor() {
        super();
        this.state = {
            question: null,
            pollOptions: null,
            totalVotes: 0,
            uniqueID: null,
            date: null,
            chartData: {
                labels: [],
                datasets: [{
                    data: []
                }]
            }
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get('/polls/'+id).then((response) => {
            let data = response.data.data,
                totalVotes = 0,
                calculatedVotes = [],
                chartData = {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: []
                    }]
                };
            document.title = data.title;
            //calculate total votes and create data for chart
            for (let i = 0; i < data.pollOptions.length; i++) {
                totalVotes += data.pollOptions[i].votes;
                chartData.labels.push(data.pollOptions[i].text);
                chartData.datasets[0].data.push(data.pollOptions[i].votes);
                chartData.datasets[0].backgroundColor.push('#' +  Math.random().toString(16).substr(-6));
            }

            //calculate percentage of votes
            for (let i = 0; i < data.pollOptions.length; i++) {
                let percentage;
                if (totalVotes !== 0) {
                    percentage = data.pollOptions[i].votes / totalVotes * 100;
                }
                calculatedVotes.push({
                    text: data.pollOptions[i].text,
                    votes: data.pollOptions[i].votes,
                    percentage: percentage ? percentage.toFixed(0) : 0
                });
            }

            //sort votes in descending order
            let sortedVotes = calculatedVotes.sort((a , b) => {return b.percentage-a.percentage});
            this.setState({
                question: data.title,
                pollOptions: sortedVotes,
                totalVotes: totalVotes,
                uniqueID: data.uniqueID,
                date: data.date,
                chartData: chartData
            });
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 404) {
                window.location.href = '/';
            }
        });
    }

    showVotes = () => {
        window.location.href = `/${this.state.uniqueID}`;
    }
    render() {
        return (
            <div className="results">
                <h1 className="results__header">Results</h1>
                <div className="results__wrapper">
                    <div className="results__container">
                        <p className="results__question">{this.state.question}</p>
                        {
                            this.state.pollOptions ? (
                                this.state.pollOptions.map((item, i) => {
                                    return (
                                        <div key={i} className="results__group">
                                            <div className="results__option-name">
                                                <span>{item.text}</span>
                                                <span className="option-name__votes">{item.votes} Votes</span>
                                            </div>
                                            <div className="results__option-bar">
                                                <div style={{width: item.percentage+"%"}} className="option-bar__bar"></div>
                                                <div className="option-bar__percentage">{item.percentage}%</div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <Spinner />
                            )
                        }
                        <div className="results__info">
                            <p className="results__total-votes">{this.state.totalVotes} <span>Votes</span></p>
                            <button onClick={this.showVotes} className="results__vote-btn">Vote</button>
                        </div>
                        <span className="results__date">{this.state.date ? this.state.date.substring(0, this.state.date.indexOf("T")) : ''}</span>
                    </div>
                    {
                            
                        this.state.totalVotes > 0 ? (
                            <div className="results__chart">
                                <Pie options={{maintainAspectRadio: false}} data={this.state.chartData} />
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        )
    }
}

export default Results;