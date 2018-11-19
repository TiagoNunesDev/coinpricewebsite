import React from "react";
import {Table, Button, Input} from 'reactstrap';
import axios from 'axios';
import {Link} from  'react-router-dom'
import Percentage from "../Percentage/Percentage";
import homecontent from "../Home/content.css"
import NumberFormat from 'react-number-format';
import Select from 'react-select'


const options = [];

class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            auxdata:null,
            data: [],
            selectOption:null,
            counter:1,
            totalcoins:0
        };
    }


    componentWillMount() {
        this.fetchData();
    }

    fetchData = () =>{

        var self = this;

        axios.get(`https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=${Math.min(
            self.state.counter,
            self.state.totalcoins
        )}`)
            .then(item => {
                if(self.state.totalcoins === 0){
                    self.setState({totalcoins:item.data.metadata.num_cryptocurrencies});
                }
                if(self.state.counter <= self.state.totalcoins){
                    Object.values(item.data.data).map((item) => {
                        options.push({ value:item.name, label:item.name});
                    });
                    self.setState({
                        auxdata:self.state.data.concat(Object.values(item.data.data)),
                        data: self.state.data.concat(Object.values(item.data.data)),
                        counter: self.state.counter+100
                    });

                    self.fetchData();
                }
        }).catch(error => console.log(error))

    };


    handleClick = (e) => {

        var val = e.target.value;
    };



    renderRow = () =>{

        this.state.data.sort(function (x,y) {return x.rank - y.rank;});

        var val = [];

        this.state.data.map((item, k) => {
            if(k < 100)
            val.push(
                <><tr key={k} >
                        <th className={homecontent.rank} scope="row">{item.rank}</th>
                        <td className={homecontent.Name}>
                            <img  src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${item.id}.png`} />
                            {item.name}
                        </td>
                        <td className={homecontent.market}><NumberFormat value={item.quotes.USD.market_cap} displayType={'text'} thousandSeparator={true} prefix={'$'}/></td>
                        <td className={homecontent.price}><NumberFormat value={item.quotes.USD.price} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'}/></td>
                        <td className={homecontent.volume}><NumberFormat value={item.quotes.USD.volume_24h} decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={'$'}/></td>
                        <td><Percentage percent={item.quotes.USD.percent_change_24h} /></td>
                        <td><Percentage percent = {0}/></td>
                        <td><Percentage percent = {0}/></td>
                        <td><Button onClick={this.handleClick} value={item.id}>Vote In</Button></td>
                        <td><i className="fa fa-caret-down accordion-toggle" data-toggle="collapse" data-target={'#'+item.name.replace(" ","")}  /></td>
                    </tr>
                    <tr>
                        <td colSpan="12" className="hiddenRow">
                            <div className="accordian-body collapse" id={item.name.replace(" ","")}>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Go Up</td>
                                            <td>Go Down</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><Button>UP</Button></td>
                                            <td><Button>DOWN</Button></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Circulating Supply</td>
                                            <td>Total Sypply</td>
                                            <td>Max Supply</td>
                                            <td>1h Change</td>
                                            <td>24h Change</td>
                                            <td>7d Change</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{item.circulating_supply}</td>
                                            <td>{item.total_supply}</td>
                                            <td>{item.max_supply}</td>
                                            <td>{item.quotes.USD.percent_change_1h}</td>
                                            <td>{item.quotes.USD.percent_change_24h}</td>
                                            <td>{item.quotes.USD.percent_change_7d}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <img src={`https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${item.id}.png`} />
                            </div>
                        </td>
                    </tr></>
            );
        });

        return val;
    };

    handleSearch = (selectOption) => {
        var self= this;

        // self.setState({data:self.state.auxdata});

        var aux =[];

        self.state.auxdata.map((item,idx)=>{
            if(item.name == selectOption.label){
                aux.push(item);
            }
        });

        self.setState({data:aux});

    };

    clearSearch = (e) =>{
        var self = this;
        self.setState({data:self.state.auxdata});
    };

    render(){
        const {selectOption} = this.state;
        return (
            <div className="container-fluid ">
                <div>
                    <div className={homecontent.title}>
                        <h4>All CryptoCurrencies</h4>
                        <button onClick = {this.clearSearch}>Clear</button>
                        <Select
                            value={selectOption}
                            onChange={this.handleSearch}
                            options={options}
                            placeholder = "Search coin"
                        />
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
                            <th>Change (24h)</th>
                            <th>Price Up(1h)</th>
                            <th>Price Down(1h)</th>
                            <th>Vote In</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data ? this.renderRow() : null}
                        {/*{this.state.data ? this.addAccordeon(): null}*/}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Content;