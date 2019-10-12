import React, {Component} from "react"
import PropTypes from "prop-types"


class SelectOption extends Component {
    render(){
        // conditional render for default and placeholder values
        if (this.props.placeholder === true) {
            return (
                <option value = "" disabled selected>
                    {this.props.value}
                </option>
            )
        }
        else if (this.props.default === true) {
            return (
                <option value = {this.props.value} selected>
                    {this.props.value}
                </option>
            )
        }
        else {
            return (
                <option value = {this.props.value}>
                    {this.props.value}
                </option>
            )
        }
    }
}

SelectOption.defaultProps = {
    default: false,
    placeholder: false
}

SelectOption.propTypes = {
    value: PropTypes.string,
    default: PropTypes.bool,
    placeholder: PropTypes.bool
}

export default SelectOption;