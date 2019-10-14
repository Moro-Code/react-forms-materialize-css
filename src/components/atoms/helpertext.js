import React, {Component} from "react";
import PropTypes from "prop-types"

class HelperText extends Component{

    render(){
        return(
            <span className="helper-text"
                  data-error= {this.props.dataError}
                  data-success={this.props.dataSuccess}>
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