import React, {Component} from "react";

class Icon extends Component{

    render(){
        return(
            <i className={
                `material-icons${this.props.prefix? " prefix":""}${this.props.right? " right": ""}${this.props.left? " left": ""}`
            }>
                {this.props.icon}
            </i>
        )
    }
}

export default Icon;