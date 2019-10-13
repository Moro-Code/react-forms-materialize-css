import React, {Component} from "react"
import SelectOption from "./selectoption"
import PropTypes from "prop-types"
import M from "materialize-css"

class SelectField extends Component{
    constructor(props){
        super(props)
        this.renderOptions = this.renderOptions.bind(this)
        this.state = {
            interacted: false
        }
        this.select = React.createRef()
    }
    componentDidMount(){
        this.select.current.id = this.props.elementProps["id"]
        let instance = document.getElementById(this.props.elementProps["id"])
        M.FormSelect.init(instance)
        this.select.current.id = this.props.elementProps["id"]
        this.select.current.name = this.props.elementProps["name"]
    }
    renderOptions(){
        // render the options from the array
        // defining needed variables        let data = this.props.options
        let placeholder = this.props.placeholder
        let data = this.props.options
        let renderedOptions = []
        
        // two cases placeholder exists or default value does 
        if (typeof placeholder !== "undefined"){
            renderedOptions.push(
                <SelectOption  placeholder = {true} value = {placeholder}>
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
                        placeholder = {this.props.placeholder} 
                        onChange = {this.props.onChange}
                        disabled = {this.props.disabled}
                        ref = {this.select}>
                    {this.renderOptions()}
                </select>
            )
        }
        else if (this.props.multi === true){
            return (
                <select
                   {...this.elementProps}
                    placeholder = {this.props.placeholder}
                    multiple = {true} {...this.elementProps}
                    disabled = {this.props.disabled}
                    ref = {this.select}
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
    defaultValue: PropTypes.string,
    elementProps: PropTypes.object,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    multiple: PropTypes.bool
}

export default SelectField;

