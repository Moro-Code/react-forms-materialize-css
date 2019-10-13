/* 
Atom component for a text field input which can be disabled and enabled
*/
import React, {Component} from 'react';
import PropTypes from "prop-types";

class TextField extends Component {
    render(){
        return (
            <input {...this.props.elementProps} 
                   disabled = {this.props.disabled} 
                   className = "validate"
                   onChange = {this.props.onChange}>      
            </input>
        )
    }
}

TextField.propTypes = {
    elementProps: PropTypes.object,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
}

export default TextField;