import React from "react";

import home from './HomeWrapper.css';
import HeaderImage from './Images/imagemcompleta.png';
export default class HomeWrapper extends React.Component {
    constructor(){
        super()
        this.title = "We Want To Make Your Coin 'The Coin'";
        this.subtitle = "ttnsdfv lfmdfmkdm  efmd,fmkesflf  mksdms as mdls "
    }

    render() {
        return (
            <div className={home.headerHome}>
                    <h3 className={home.title}>{this.title}</h3>
                    <h6 className={home.subtitle}>{this.subtitle}</h6>
                    <img className={home.ImgHome} src={HeaderImage}></img>
            </div>

        );
    }
}