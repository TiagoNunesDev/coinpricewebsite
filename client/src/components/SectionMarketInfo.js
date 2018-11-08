import React from "react";
import marketinfo from './SectionMarketInfo.css'
import { Container, Row, Col } from 'reactstrap';
import numeral from 'numeral'


export default class SectionMarketInfo extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            collapsed: true,
            total: null,
            volumevinteh: null,
            dominance: null
        };
    }

    componentWillMount() {
        fetch('https://api.coinmarketcap.com/v1/global/')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    total: data.total_market_cap_usd,
                    volumevinteh: data.total_24h_volume_usd,
                    dominance: data.bitcoin_percentage_of_market_cap
                })
            })
    }



    render() {
        return (

                <div className={marketinfo.section}>
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
                                <p>#=Mostvoted#</p>
                            </div>
                        </div>
                    </Container>
                </div>

        );
    }
}