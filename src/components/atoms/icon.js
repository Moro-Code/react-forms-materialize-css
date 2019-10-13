import React, {Component} from "react";
import PropTypes from "prop-types"

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
Icon.defaultProps = {
    right: false,
    left: false
}
Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    right: PropTypes.bool,
    left: PropTypes.bool
}

export default Icon;