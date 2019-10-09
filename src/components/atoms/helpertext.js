import React, {Component} from "react";

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

export default HelperText;