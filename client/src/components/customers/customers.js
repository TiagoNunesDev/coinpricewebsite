import React , {Component} from 'react';
import './customers.css';

class Customers extends Component{

    constructor(){
        super();
        this.state = {
            customers: []
        }
    }

    componentDidMount(){
      fetch('/getData')
          .then(res => res.json())
          .then(customers => this.setState({customers},() => console.log('Customer fetcged',customers)));

      console.log(this.state.customers)
    }


    render() {
        return(
            <div>
                <h2>Customers</h2>
            </div>
        );
    }
}

export default Customers;