import React, {Component} from "react"
import PropTypes from "prop-types"


class SelectOption extends Component {
    render(){
        // conditional render for default and placeholder values
        if (this.props.placeholder){
            return (
                <option value="">
                    {this.props.value}
                </option>
            )
        }

        return (
            <option value = {this.props.value}>
                {this.props.value}
            </option>
        )
    }
}
SelectOption.defaultProps = {
    placeholder: false 
}

SelectOption.propTypes = {
    placeholder: PropTypes.bool, 
    value: PropTypes.string
}

export default SelectOption;