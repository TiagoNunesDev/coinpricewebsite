import React from "react";
import {Table, Button, Input} from 'reactstrap';
import axios from 'axios';
import {Link} from  'react-router-dom'
import Percentage from "../Percentage/Percentage";
import homecontent from "../Home/content.css"
import NumberFormat from 'react-number-format';

class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            id: null,
        }
    }
    componentWillMount() {
        var that = this;
        axios.all([
            axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=100'),
            axios.get('https://s2.coinmarketcap.com/generated/search/quick_search.json')
        ])
        .then(axios.spread(function (data, list) {
            var result = list.data.reduce(function(obj,item){
                obj[item.name] = item.id; 
                return obj;
                }, {});
            that.setState({
                data: data.data,
                id: result

            })
        }))
        .catch(error => console.log(error));

    }

    convertSpace = (string) => {
        return string.split(' ').join('-')
    }

    renderRow(){
        return this.state.data.map((item, k) => {
            return (

                    <tr key={k}>
                        <th className={homecontent.rank} scope="row">{item.rank}</th>
                        <td className={homecontent.Name}>
                            <img alt={this.state.id[item.name]} src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${this.state.id[item.name]}.png`} />
                             {item.name}
                        </td>


                        <td className={homecontent.market}><NumberFormat value={item.market_cap_usd} displayType={'text'} thousandSeparator={true} prefix={'$'}/></td>
                        <td className={homecontent.price}><NumberFormat value={item.price_usd} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'}/></td>
                        <td className={homecontent.volume}><NumberFormat value={item['24h_volume_usd']} decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={'$'}/></td>
                        {/*<td className={}>{item.available_supply}</td>*/}
                        <td><Percentage percent={item.percent_change_24h} /></td>
                        <td>#priceUp#</td>
                        <td>#priceUp#</td>
                        <td><Button>Vote In</Button></td>
                        <td><i className="fa fa-caret-down" /></td>
                    </tr>

            )
        })
    }
    render(){
        return (
            <div className="container-fluid">
                <div>
                    <div className={homecontent.title}>
                        <h4>All CryptoCurrencies</h4>
                        <Input/>
                    </div>

                </div>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Market Cap</th>
                            <th>Price</th>
                            <th>Volume (24h)</th>
                            {/*<th>Circulating Supply</th>*/}
                            <th>Change (24h)</th>
                            <th>Price Up</th>
                            <th>Price Down</th>
                            <th>Vote In</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data ? this.renderRow() : null}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Content;