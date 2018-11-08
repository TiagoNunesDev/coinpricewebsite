import React from "react";
import rodape from './Footer.css'

export default class Footer extends React.Component {
    render() {
        return (
           <footer className={rodape.footer}>
               <div className={rodape.logo}>
                   <a href="#">CoinPrice</a>
               </div>
               <div className={rodape.redes}>
                   <ul>
                       <li><a href="https://www.facebook.com/profile.php?id=100000724132457"><i className="fab fa-facebook-square"></i></a></li>
                       <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
                       <li><a href="#"><i className="fab fa-discord"></i></a></li>
                   </ul>
               </div>
           </footer>
        );
    }
}