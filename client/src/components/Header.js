import React from "react";
import header from './Header.css';
import {Navbar} from 'react-bootstrap';
import HeaderImage from './Images/imagemcompleta.png';
import {Link} from 'react-router-dom'
import {NavLink} from 'react-router-dom'

export default class Header extends React.Component {

    constructor(){
        super();
    }

    lowhandleClick = (e) =>{
        document.getElementById("headercontainer").setAttribute("target","_LOW");
    };

    highhandleClick = (e) =>{
        document.getElementById("headercontainer").setAttribute("target","_HIGH");
    };

    render() {

        return (
            <div id="headercontainer" className={header["header-container"]} target = "" >

                <div className={header.logo}>
                    <NavLink onClick={this.highhandleClick} tag={Link} to="/">Criptoactives</NavLink>
                </div>
                <div className={header.menu}>
                    <ul>
                        <li><NavLink onClick={this.lowhandleClick} tag={Link} to='/pump'>Pump</NavLink></li>
                        <li><NavLink onClick={this.lowhandleClick} tag={Link} to="/airdrop">AirDrop</NavLink></li>
                        {/*<li><NavLink to="/about">About Us</NavLink></li>*/}
                    </ul>
                </div>
                {/*<img className={header["header-header-img"]} src={HeaderImage}></img>*/}
            </div>
        );
    }
}