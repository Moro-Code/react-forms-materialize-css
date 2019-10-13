import React, {Component} from "react";
import PropTypes from "prop-types"

class HelperText extends Component{

    render(){
        return(
            <span className="helper-text"
                  dataerror= {this.props.dataError}
                  datasuccess={this.props.dataSuccess}>
                {this.props.helperTextText}
            </span>
        )
    }
}

HelperText.propTypes = {
    dataError: PropTypes.string,
    dataSuccess: PropTypes.string,
    helperTextText: PropTypes.string.isRequired
}
export default HelperText;