/* 
Atom component for an input field label
*/

import React, {Component} from "react"
import PropTypes from "prop-types"

class InputLabel extends Component {
    render(){
        return (
            <label htmlFor = {this.props.for}>{this.props.labelText}</label>
        )
    }
}

InputLabel.propTypes = {
    for: PropTypes.string,
    labelText: PropTypes.string.isRequired
}
export default InputLabel;