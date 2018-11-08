import React , {Component} from 'react'
import style from "./Pump.css"
import Timer from "./Timer"

const API = '/getVotes';
const API_ICONS = 'https://s2.coinmarketcap.com/static/img/coins/16x16/';

class Pump extends Component{

    //ask for database data and add to the table
    constructor(props){
        super(props);
        this.state ={
            coins:[],
            symbol:[]
        };
    }

    componentWillMount(){
        // buscar os votos das moedas
        fetch(API)
            .then(response => response.json())
            .then(data => this.setState({ coins: data}));
    }

   SortByVOTES = (x,y) => {
        return y.votes - x.votes;
    }

    // create Table
    createTableBody = () => {
        var row = [];
        // sort state by Votes
        this.state.coins.sort(this.SortByVOTES);
        // create table body
        this.state.coins.map(function (item,idx) {
            row.push(<tr key = {idx}>
                     <td>{idx + 1    }</td>
                     <td><img src={API_ICONS + item.coinId +'.png'} style={{width: 16, height: 16}}/> {item.name} </td>
                     <td>{item.symbol}</td>
                     <td>{item.votes }</td></tr>)});
        return row;
    };


    render(){
        return(
        <div>
            <div className={style["pump-row"]}>
                <div className={style["pump-column"]}>
                    <h1>#1. PUMP</h1>
                    <p>Boost the value of the currency most voted by our users
                    through the purchase of the same.
                    For voting, an option is available in the currency information.
                    In order to proceed to this vote it will be necessary to display advertising.
                    Disclosure of this investiment will be made a time before the purchase to
                    enable the user to buy the most voted currenc and to have the return that
                    pump can cause.</p>
                </div>
                <div className={style["pump-column"]}>
                    <h1> Most Voted Coins (Top 5)</h1>
                    <table className={style["pump-table"]}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>COIN</th>
                                <th>SYMBOL</th>
                                <th>VOTES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.createTableBody()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={style["pump-row"]}>
                <div className={style["pump-giveColumn"]}>
                    <h1>PUMP DATE</h1>
                    <Timer time = {this.props.time}/>
                </div>
            </div>
        </div>
        )
    }
}


export default Pump;