import React, {Component} from "react";
import PropTypes from "prop-types";


class TextArea extends Component{
    render(){
        return (
            <textarea {...this.props.elementProps} 
                   disabled = {this.props.disabled} 
                   className = "materialize-textarea"
                   onChange = {this.props.onChange}>
            </textarea>
        )
    }
    
}

TextArea.propTypes = {
    elementProps: PropTypes.object,
    className: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func
}
export default TextArea;