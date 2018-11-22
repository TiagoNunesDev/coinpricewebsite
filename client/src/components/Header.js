import React from "react";
import header from './Header.css';
import {Navbar} from 'react-bootstrap';
import HeaderImage from './Images/imagemcompleta.png';

export default class Header extends React.Component {
    render() {

        return (
            <div className={header["header-container"]}>

                <div className={header.logo}>
                    <a href="#">Criptoactives</a>
                </div>
                <div className={header.menu}>
                    <ul>
                        <li><a href="#">Pump</a></li>
                        <li><a href="#">AirDrop</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </div>
                {/*<img className={header["header-header-img"]} src={HeaderImage}></img>*/}
            </div>
        );
    }
}