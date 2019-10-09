/* 
Atom component for an input field label
*/

import React, {Component} from "react"

class InputLabel extends Component {
    render(){
        return (
            <label htmlFor = {this.props.for}>{this.props.labelText}</label>
        )
    }
}

export default InputLabel;