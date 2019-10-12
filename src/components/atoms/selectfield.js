import React, {Component} from "react"
import SelectOption from "./selectoption"
import PropTypes from "prop-types"

class SelectField extends Component{
    constructor(props){
        this.renderOptions = this.renderOptions.bind(this)
    }
    renderOptions(){
        // render the options from the array
        // defining needed variables
        let data = this.props.options
        let defaultValue = this.props.defaultValue
        let placeholder = this.props.placeholder
        let renderedOptions = []
        
        // two cases placeholder exists or default value does 
        if (typeof placeholder !== "undefined"){
            renderedOptions.push(
                <SelectOption placeholder = {true}
                              value = {placeholder}>
                </SelectOption>
            )
        }
        else if (typeof this.props.defaultValue !== "undefined"){
            renderedOptions.push(
            <SelectOption default = {true}
                          value = {defaultValue}>
            </SelectOption>
            )
        }
        for (let i in data){
            renderedOptions.push(
                <SelectOption value = {data[i]} ></SelectOption>
            )
        }
        // return react fragment with the options rendered
        return React.createElement(React.Fragment, null, ...renderedOptions)
    }
    
    render(){

        if (this.props.multi === false){ 
            return (
                <select {...this.elementProps} 
                        onChange = {this.props.onChange}
                        disabled = {this.props.disabled}>
                    {this.renderOptions()}
                </select>
            )
        }
        else if (this.props.multi === true){
            return (
                <select 
                    multiple {...this.elementProps}
                    disabled = {this.props.disabled}
                >
                    {this.renderOptions()}
                </select>
            )
        }
    }
}

SelectField.defaultProps = {
    multi: false
}

SelectField.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.default,
    elementProps: PropTypes.object,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    multiple: PropTypes.bool
}

export default SelectField;

