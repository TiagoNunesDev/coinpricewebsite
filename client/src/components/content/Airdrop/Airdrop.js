import React, {Component} from 'react'
import homecontent from '../Airdrop/Airdrop.css'
import Footer from '../../../components/Footer'

class Airdrop extends Component{
    constructor(){
        super();
    }

    componentWillReceiveProps(nextProps){
        console.log("airdrop")
    }

    render(){
        return(
          <div>
              <div className={homecontent.row}>
                  <div className={homecontent.column}>
                      {/*image*/}
                      <img src = {require("../../.././images/wallet.png")} style={{width: 100, height: 100}} />
                  </div>
                  <div className={homecontent.column}>
                      <h1># GIVEAWAY</h1>
                      <p>
                          <p>After purchasing the coin, an iffer of this coin will be
                              made to users through a draw where (X) people are chosen. To enter this draw, the
                              wallet address of each user will be required for easy transfer reasons.</p>
                      </p>
                  </div>
              </div>
              <div className={homecontent.row}>
                  <div className={homecontent.column}>
                      <h1>
                          COIN TO GIVE
                      </h1>
                  </div>
                  <div className={homecontent.column}>
                      <h1>GIVEAWAY DATE</h1>
                  </div>

              </div>
              <div>

              </div>

                  {/*<div >*/}
                      {/*/!*<img src={require('./components/images/wallet.png')}/>*!/*/}
                  {/*</div>*/}
                  {/*<div  >*/}
                      {/*<h1>#2. GIVEAWAY</h1>*/}
                      {/*<p>After purchasing the coin, an iffer of this coin will be*/}
                          {/*made to users through a draw where (X) people are chosen. To enter this draw, the*/}
                          {/*wallet address of each user will be required for easy transfer reasons.</p>*/}
                  {/*</div>*/}
              {/*<Footer/>*/}

          </div>
        );
    }
}

export default Airdrop;