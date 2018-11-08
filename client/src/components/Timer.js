import React , {Component}  from 'react'
import style from "./Timer.css"

class Timer extends Component {
    constructor(props){
        super(props);
    }

    createTimeLabel = () => {

        var label = [];

        for (var i = 0; i < this.props.time.length; i++) {
            if(this.props.time[i] == '/')
                label.push(<label className={style["pump-slash"]}>{this.props.time[i]}</label>);
            else
                label.push(<label>{this.props.time[i]}</label>);
        }
        return label;
    };

    render(){
        console.log(this.props.time[0]);
        return (
            <div>
                {this.createTimeLabel()}
            </div>
        )
    }
}

export default Timer;