import React from "react";
import footer from './Footer.css'

export default class Footer extends React.Component {
    render() {
        return (
            <div>
            <div className ={ footer["footer-body"]}>
               <footer>
                   <div className={ footer["footer-website-name"]}>
                       <a href="#">CoinPrice</a>
                   </div>
                   <div className={footer["footer-social-icons"]} >
                       <a href="https://www.facebook.com/profile.php?id=100000724132457"><i className="fab fa-facebook-square" style={{width: 32, height: 32}}/></a>
                       <a href="#"><i className="fab fa-twitter-square" style={{width: 32, height: 32}}/></a>
                       <a href="#"><i className="fab fa-discord" style={{width: 32, height: 32}} /></a>
                   </div>
               </footer>
            </div>
            </div>
        );
    }
}