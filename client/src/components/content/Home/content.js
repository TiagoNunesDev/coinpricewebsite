import React from "react";
import {Table, Button, Input} from 'reactstrap';
import axios from 'axios';
import {Link} from  'react-router-dom'
import Percentage from "../Percentage/Percentage";
import homecontent from "../Home/content.css"
import NumberFormat from 'react-number-format';
import Select from 'react-select'
import News from '../News/news'

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
        // this.fetchSentiment();
    }

    fetchData = () =>{

        var self = this;
        var tst = [];

        axios.all([
            axios.get(`https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=${Math.min(self.state.counter, self.state.totalcoins)}`),
            axios.get('/getsentiment')
        ]).then(axios.spread(function(item,data){
                if(self.state.totalcoins === 0){
                    self.setState({totalcoins:item.data.metadata.num_cryptocurrencies});
                }

                if(self.state.counter <= self.state.totalcoins){
                    Object.values(item.data.data).map((item) => {
                        options.push({ value:item.name, label:item.name});

                        var find = false;

                        Object.values(data.data).map((ql)=>{

                            if(ql.coinId === item.id){
                                var up = 0,down = 0;

                                if(ql.upvotes != 0){
                                    up = ((ql.upvotes/(ql.upvotes+ql.downvotes))  *100).toFixed(1);
                                }

                                if(ql.downvotes != 0){
                                    down = ((ql.downvotes/(ql.upvotes+ql.downvotes))*100).toFixed(1);
                                }

                                tst.push({'circulating_supply': item.circulating_supply, 'id': item.id, 'max_supply': item.max_supply, 'up':  up, 'down': down, 'quotes': item.quotes, 'symbol': item.symbol, 'rank': item.rank, 'name': item.name, 'website_slug': item.website_slug, 'total_supply': item.total_supply});
                                find = true;
                            }
                        });

                        if(!find){
                            tst.push({'circulating_supply': item.circulating_supply, 'id': item.id, 'max_supply': item.max_supply, 'up': 0, 'down': 0, 'quotes': item.quotes, 'symbol': item.symbol, 'rank': item.rank, 'name': item.name, 'website_slug': item.website_slug, 'total_supply': item.total_supply});
                        }
                    });

                    self.setState({
                        auxdata: self.state.data.concat(tst),
                        data   : self.state.data.concat(tst),
                        counter: self.state.counter+100
                    });

                    self.fetchData();
                }
        })).catch(error => console.log(error))

    };



    handleClick = (e) => {

        var res = document.getElementById(e.target.value).getAttribute("class");

        if( res === "hidden"){
            document.getElementById(e.target.id).setAttribute("class","fa fa-chevron-circle-up");
            document.getElementById(e.target.value).setAttribute("class","visible");
        }else if(res === "visible"){
            document.getElementById(e.target.id).setAttribute("class","fa fa-chevron-circle-down");
            document.getElementById(e.target.value).setAttribute("class","hidden");
        }

    };

    handleVotes = (e) => {
      var self = this;
      var cell = null;

      self.state.auxdata.map((item) => {
          if(item.id === parseInt(e.target.value))
             cell = item;
      });

      axios.get(`/insertvote?id=${cell.id}&name=${cell.name}&symbol=${cell.symbol}`)
          .catch(err => console.log(err))
    };

    handlesentimentUP = (e) => {
        var self = this;

        var cell = null;

        self.state.auxdata.map((item) => {
            if(item.id === parseInt(e.target.value))
                cell = item;
        });

        axios.get(`/insertsentimentUP?id=${cell.id}&name=${cell.name}&symbol=${cell.symbol}`)
            .catch(err => console.log(err))
    };

    handlesentimentDOWN = (e) => {
        var self = this;

        var cell = null;

        self.state.auxdata.map((item) => {
            if(item.id === parseInt(e.target.value))
                cell = item;
        });

        axios.get(`/insertsentimentDOWN?id=${cell.id}&name=${cell.name}&symbol=${cell.symbol}`)
            .catch(err => console.log(err))
    };


    renderRow = () =>{

        this.state.data.sort(function (x,y) {return x.rank - y.rank;});

        var val = [];

        this.state.data.map((item, k) => {
            if(k < 100)
            val.push(
                <><tr key={k} >
                        <td className={homecontent.rank} scope="row">#{item.rank}</td>
                        <td className={homecontent.Name}>
                            <img  src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${item.id}.png`} />
                            {item.name}
                        </td>
                        <td className={homecontent.market}><NumberFormat value={item.quotes.USD.market_cap} displayType={'text'} thousandSeparator={true} prefix={'$'}/></td>
                        <td className={homecontent.price}> <NumberFormat value={item.quotes.USD.price} decimalScale={4} displayType={'text'} thousandSeparator={true} prefix={'$'}/></td>
                        <td className={homecontent.volume}><NumberFormat value={item.quotes.USD.volume_24h} decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={'$'}/></td>
                        <td><Percentage percent = {item.quotes.USD.percent_change_24h} /></td>
                        <td><Percentage percent = {item.up} decimalScale={0} /></td>
                        <td><Percentage percent = {item.down} /></td>
                        <td><Button onClick={this.handleVotes} value={item.id}>Vote In</Button></td>
                        <td><button id = {"drop"+ item.name.replace(" ","") } onClick={this.handleClick} value={item.name.replace(" ","")}  className="fa fa-chevron-circle-down" /></td>
                    </tr>

                    <tr>
                        <td colSpan="12" className="hidden" id={item.name.replace(" ","")} >
                            <div className={homecontent["home-ola"]}>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Go Up</td>
                                            <td>Go Down</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><button onClick={this.handlesentimentUP}   value = {item.id}>UP  </button></td>
                                            <td><button onClick={this.handlesentimentDOWN} value = {item.id}>DOWN</button></td>
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
                    </tr>
                    </>
            );
        });

        return val;
    };

    handleSearch = (selectOption) => {
        var self= this;

        var aux =[];

        self.state.auxdata.map((item,idx)=>{
            if(item.name == selectOption.label)
                aux.push(item);
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
            <div >
                <div className={homecontent["home-h4"]}>
                    <h4>All CryptoCurrencies</h4>
                </div>

                <div className={homecontent["home-search-box"]}>
                    <div className={homecontent["home-btn"]}>
                        <button onClick = {this.clearSearch}>Clear</button>
                    </div>
                    <div className={homecontent["home-dr"]}>
                        <Select
                            className = {homecontent["home-af"]}
                            value={selectOption}
                            onChange={this.handleSearch}
                            options={options}
                            placeholder = "Search coin"
                            autosize={false} />
                    </div>
                </div>


                <div className={homecontent["home-test"]}>
                    <table className={homecontent["home-cp-table"]}>
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
                        </tbody>
                    </table>
                    <div>
                        <News />
                    </div>
                </div>
            </div>
        )
    }
}

export default Content;