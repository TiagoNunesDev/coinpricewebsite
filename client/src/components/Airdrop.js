import React ,{Component} from 'react'

import styles from "./Airdrop.css"
import Timer from "./Timer"
import CoinsToGive from "./CoinsToGive";


class Airdrop extends  Component{
    constructor(props){
        super(props);
    }



    render(){
        return(
            <div>
                <div className={styles.row} >

                    <div className={styles.column}>
                        <img src={require('../images/wallet.png')}/>
                    </div>
                    <div className={styles.column} >
                        <h1>#2. GIVEAWAY</h1>
                        <p>After purchasing the coin, an iffer of this coin will be
                        made to users through a draw where (X) people are chosen. To enter this draw, the
                        wallet address of each user will be required for easy transfer reasons.</p>
                    </div>
                </div>
                <div className={styles.row} >
                    <div className={styles.giveColumn}>
                        <h1>COIN TO GIVE</h1>
                        <CoinsToGive qtd = {this.props.qtd} coin = {this.props.coin} coinID = {this.props.coinID}/>
                    </div>
                    <div className={styles.giveColumn} >
                        <h1>GIVEAWAY DATE</h1>
                        <Timer time = {this.props.time}/>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.adresscolumn}>
                        <div className={styles["airdrop-submit"]}>
                            <label>Address: </label>
                            <input/>
                            <button>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}



export default Airdrop;