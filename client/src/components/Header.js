import React from "react";
import header from './Header.css';
import {Navbar} from 'react-bootstrap';

export default class Header extends React.Component {
    render() {
        var listHeader = [
            <Navbar className={header.Navigation}>
                    <div className={header.logo}>
                        <a href="#">Bitclime</a>
                    </div>
                    <div className={header.menu}>
                        <ul>
                            <li><a href="#">Pump</a></li>
                            <li><a href="#">AirDrop</a></li>
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>

            </Navbar>
        ];
        return (
<header>
    {listHeader}

</header>


        );
    }
}