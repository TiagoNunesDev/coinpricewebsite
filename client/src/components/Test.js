import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const products = [{
    id: 1,
    name: "Product1",
    price: 120
}, {
    id: 2,
    name: "Product2",
    price: 80
}];

class Test extends React.Component {

    constructor(props) {
        super(props);

        this.options = {
            defaultSortName: 'name',  // default sort column name
            defaultSortOrder: 'desc'  // default sort order
        };

    };
    //
    // componentDidMount(){
    //     this.updateState();
    // }
    //
    // updateState() {
    //     console.log("ojoj3");
    //     this.setState({data: 'Data updated...'})
    // }

    render() {
        return (
            <div>
                <BootstrapTable data={ products } options = { this.options}>
                    <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default Test;