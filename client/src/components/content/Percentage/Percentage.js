import React from "react";
import percenta from './Percentage.css'

 const Percentage = ({ percent}) => {
    let element;
    if (percent === 0) {
        element = <span className={percenta.neutro}>0%</span>;
    } else if (percent > 0) {
        element = (
            <span className={percenta.increase}>
        {percent}% <i className="fa fa-arrow-up" />
      </span>
        );
    } else if (percent < 0) {
        element = (
            <span className={percenta.decrease}>
        {percent}% <i className="fa fa-arrow-down" />
      </span>
        );
    }
    return (
        <div>

         {element}

        </div>
    )
};

export default Percentage;
