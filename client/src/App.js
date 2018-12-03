import React, { Component } from 'react';
// import styles  from './App.css';
// import Pump    from './components/Pump'
// import Airdrop from "./components/Airdrop";


//andre code

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeWrapper from "./components/HomeWrapper"
import SectionMarketInfo from "./components/content/Home/SectionMarketInfo";
import Home from './components/content/Home/content';
import Page from './components/content/Page/content';
import PaginationCustom from './components/paginationCustom';
// import Airdrop from './components/Airdrop'
import Airdrop from './components/content/Airdrop/Airdrop'
import Pump from './components/content/Pump/Pump'
import AppContainer from './components/AppContainer'

import {NavLink} from 'react-router-dom'
import {browserHistory} from 'react-router';



class App extends Component {

    render() {
    return (
        <div>

              <div>
                  <Router>

                      <div>

                      <Header />

                      <Route exact path="/"      component={Home}/>
                      {/*<Route path="/:page" component={Page}/>*/}
                      <Route path="/airdrop" component = {Airdrop}/>
                      <Route path="/pump"    component = {Pump}  />
                      {/*<PaginationCustom />*/}


                      </div>

                  </Router>
                  <Footer/>
              </div>
          {/*<Footer/>*/}
          {/*</div>*/}
        </div>
    );
  }
}

export default App;

{/*<div>*/}
{/*<div>*/}
{/*<Pump time = {'12/10/2018'} />*/}
{/*</div>*/}
{/*<div className={styles["App-component"]}>*/}
{/*<Airdrop time = {'25/10/2018'}  qtd = {200} coin = {'Bitcoin'} coinID = {1}/>*/}
{/*</div>*/}
{/*</div>*/}