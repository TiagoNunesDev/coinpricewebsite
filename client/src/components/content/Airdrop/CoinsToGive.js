import React, {Component} from 'react'
import style from './CoinsToGive.css'

const API_ICONS = 'https://s2.coinmarketcap.com/static/img/coins/32x32/';

class CoinsToGive extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className={style["coins-label"]}>
                <label className={style["qtd-label"]}>{this.props.qtd}</label>
                <img src={API_ICONS + this.props.coinID+'.png'} style={{width: 32, height: 32}}/>
                <label >{this.props.coin}</label>
            </div>
        )
    }
}


export default CoinsToGive;