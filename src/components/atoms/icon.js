import React, {Component} from "react";
import PropTypes from "prop-types"

class Icon extends Component{

    render(){
        const right = this.props.right
        const left = this.props.left
        const prefix = this.props.prefix
        
        const vars = [right, left, prefix]
        const trueVar1 = vars.indexOf(true)
        const trueVar2 = vars.lastIndexOf(true)

        if (trueVar1 !== trueVar2){
            throw new Error(
                "Invalid props: Props `right`, `left`, and `prefix` are mutually exclusive"
            )
        }

        return(
            <i className={
                `material-icons${prefix? " prefix":""}${right? " right": ""}${left? " left": ""}`
            }>
                {this.props.icon}
            </i>
        )
    }
}
Icon.defaultProps = {
    right: false,
    left: false,
    prefix: false 
}
Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    right: PropTypes.bool,
    left: PropTypes.bool,
    prefix: PropTypes.bool
}

export default Icon;