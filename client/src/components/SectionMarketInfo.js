import React from "react";
import marketinfo from './SectionMarketInfo.css'
import { Container, Row, Col } from 'reactstrap';
import numeral from 'numeral'
import axios from "axios/index";


const API_SERVER= '/getVotes';
const API_COINMARKET =  'https://api.coinmarketcap.com/v1/global/';
const API_ICONS = 'https://s2.coinmarketcap.com/static/img/coins/16x16/';

export default class SectionMarketInfo extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            collapsed: true,
            total: null,
            volumevinteh: null,
            dominance: null,
            voted:[]

        };
    }

    sorting = (x,y) => {
        return y.votes - x.votes;
    }

    componentWillMount() {
        var that = this;

        axios.all([
            axios.get(API_COINMARKET),
            axios.get(API_SERVER)
            ]
        ).then(axios.spread(function (market,server) {
            that.setState({
                total:market.data.total_market_cap_usd,
                volumevinteh: market.data.total_24h_volume_usd,
                dominance: market.data.bitcoin_percentage_of_market_cap,
            });

            // let cns = [];
            var cns = server.data.map(function(item,idx){
               return {name: item.name , votes: item.votes , coinId:item.coinId};
            });

            that.setState({voted:cns.sort(that.sorting)});

        })).catch(error => console.log(error));
    };


    render() {
        return (

                <div className={marketinfo.section}>
                    {/*{console.log(this.state.voted)}*/}

                            <div  className={marketinfo.MC}>
                                <h4>Market Cap</h4>
                                <p>{this.state.total ? numeral(this.state.total).format('$0,0.00') : null}</p>
                            </div>
                            <div   className={marketinfo.MC}>
                                <h4>24h Volume</h4>
                                <p>{this.state.volumevinteh ? numeral(this.state.volumevinteh).format('$0,0.00') : null}</p>
                            </div>
                            <div className={marketinfo.BTC}>
                                <h4>BTC DOMINANCE</h4>
                                <p>{this.state.dominance ? numeral(this.state.dominance).format('0.00')+'%' : null}</p>
                            </div>
                            <div   className={marketinfo.MC}>
                                <h4>RAISED FUNDS </h4>
                                <p>#=Raisedfunds#</p>
                            </div>
                            <div    className={marketinfo.MC}>
                                <h4>MOST VOTED</h4>
                                <div className={marketinfo.MV}>
                                    {this.state.voted.map(function(item,idx){
                                            if(idx < 3)
                                                return (
                                                    <><img src = {API_ICONS + item.coinId+'.png'} style={{width: 16, height: 16}}/>
                                                        <label>{item.name}</label></>
                                                )
                                        }
                                    )}
                                </div>
                            </div>


                </div>

        );
    }
}