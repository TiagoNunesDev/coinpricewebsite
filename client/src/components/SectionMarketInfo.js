import React from "react";
import marketinfo from './SectionMarketInfo.css'
import { Container, Row, Col } from 'reactstrap';
import numeral from 'numeral'
import axios from "axios/index";


const API = '/getVotes';

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


//     var that = this;
//     axios.all([
//                   axios.get(`https://api.coinmarketcap.com/v1/ticker/?start=${this.props.match.params.page - 100}&limit=100`),
//                   axios.get('https://s2.coinmarketcap.com/generated/search/quick_search.json')
//               ])
// .then(axios.spread(function (data, list) {
//         var result = list.data.reduce(function(obj,item){
//             obj[item.name] = item.id;
//             return obj;
//         }, {});
//         that.setState({
//             data: data.data,
//             id: result
//         })
//     }))
// .catch(error => console.log(error));

    // componentWillMount() {
    //     fetch('https://api.coinmarketcap.com/v1/global/')
    //         .then(response => response.json())
    //         .then((data) => {
    //             this.setState({
    //                 total: data.total_market_cap_usd,
    //                 volumevinteh: data.total_24h_volume_usd,
    //                 dominance: data.bitcoin_percentage_of_market_cap
    //             })
    //         })
    // };

    sorting = (x,y) => {
        return y.votes - x.votes;
    }

    componentWillMount() {
        var that = this;

        axios.all([
            axios.get('https://api.coinmarketcap.com/v1/global/'),
            axios.get('getVotes')
            ]
        ).then(axios.spread(function (market,server) {
            console.log(market);
            console.log(server);
            that.setState({
                total:market.data.total_market_cap_usd,
                volumevinteh: market.data.total_24h_volume_usd,
                dominance: market.data.bitcoin_percentage_of_market_cap,
            });

            // let cns = [];
            var cns = server.data.map(function(item,idx){
               return {name: item.name , coinId: item.votes};
            });
            console.log("OLOK",cns);
            cns.sort(that.sorting);

            console.log("koko",cns);

            that.setState({voted:cns});

        })).catch(error => console.log(error));
    };




    render() {
        return (

                <div className={marketinfo.section}>
                    {console.log(this.state.voted)}
                    <Container>
                        <div className={marketinfo.row}>
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
                                {/*this.state.voted.map(function*/}
                                <div>

                                    {
                                        this.state.voted.map(function(item){
                                            console.log(item);
                                        })
                                    }
                                    {/*this.*/}
                                    {/*<div>*/}
                                        {/*<label>Bitcoin</label>*/}
                                    {/*</div>*/}


                                </div>
                            </div>
                        </div>
                    </Container>
                </div>

        );
    }
}