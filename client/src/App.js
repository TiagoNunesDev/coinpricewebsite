import React, { Component } from 'react';
// import styles  from './App.css';
// import Pump    from './components/Pump'
// import Airdrop from "./components/Airdrop";


//andre code

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeWrapper from "./components/HomeWrapper"
import SectionMarketInfo from "./components/SectionMarketInfo";
import Home from './components/content/Home/content';
import Page from './components/content/Page/content';
import PaginationCustom from './components/paginationCustom';


class App extends Component {
  render() {
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>
            <HomeWrapper/>
            </div>
              <div>
                  <SectionMarketInfo/>
              </div>
                  <Router>
                      <div>
                      <Route exact path="/"      component={Home}/>
                      <Route exact path="/:page" component={Page}/>
                      <PaginationCustom />
                      </div>
                  </Router>
              <div>
          <Footer/>
          </div>
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