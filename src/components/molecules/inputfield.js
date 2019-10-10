import React, {Component} from "react";
import TextField from "../atoms/textfield";
import TextArea from "../atoms/textarea";
import Icon from "../atoms/icon";
import InputLabel from "../atoms/inputlabel";
import HelperText from "../atoms/helpertext";
/*
TODO:
- restructure such that multiple components can be added not just text input and area
*/
class InputField extends Component{
    constructor(props){
        super(props)
        this.renderTextFieldOrArea = this.renderTextFieldOrArea.bind(this)
        this.getClassNames = this.getClassNames.bind(this)
        this.renderIcon = this.renderIcon.bind(this)
        this.renderInputLabel = this.renderInputLabel.bind(this)
        this.renderHelperLabel = this.renderHelperLabel.bind(this)
    }

    getClassNames(){
        if (typeof this.props.classNames === "object" ){
            return this.props.classNames.join(" ")
        }
        else if (typeof this.props.classNames === "string"){
            return this.props.classNames
        }
        else if (typeof this.props.classNames == "undefined"){
            return ''
        }
        throw new Error("classNames prop must be either array or string if defined")
    }

    renderIcon(){
        if ( !(typeof this.props.icon == "undefined")){
            if ( this.props.iconRight === true){
               return  ( <Icon icon = {this.props.icon} right = {this.props.iconRight}></Icon> )
            }
            else if ( this.props.iconLeft === true){
               return ( <Icon icon = {this.props.icon} left = {this.props.iconLeft}></Icon> )
            }
            return ( <Icon icon = {this.props.icon} prefix = {true}></Icon> )
        }
        return null

    }

    renderTextFieldOrArea(){
        // conditional rendering function of either a TextArea component or a TextField component based on the textAreaProps or textFieldProps
        if (this.props.textAreaProps){
            return (
                <TextArea elementProps = {this.props.textAreaProps}
                            disabled = {this.props.disabled}
                            value = {this.props.value}
                            onChange = {this.props.onChange}>
                </TextArea>
            )
        }
        else if (this.props.textFieldProps){
            return (
                <TextField elementProps = {this.props.textFieldProps} 
                               disabled = {this.props.disabled}
                               value = {this.props.value}
                               onChange = {this.props.onChange}>
                </TextField>
            )
        }
        throw new Error("textAreaProps nor textFieldProps provided")
    }
    renderInputLabel(){
        if (typeof this.props.labelText != "undefined"){
           return (
            <InputLabel for = {  this.props.textFieldProps ? 
                    this.props.textFieldProps["id"]
                    :
                    this.props.textAreaProps["id"]
                }
                labelText = {this.props.labelText}>
            </InputLabel>
           )
        }
        return null
    } 
    renderHelperLabel(){
        if (typeof this.props.helperTextText != "undefined"){
            return(
                <HelperText dataError = {this.props.dataError}
                            dataSuccess = {this.props.dataSuccess}
                            helperTextText = {this.props.helperTextText}>
                </HelperText>
            )
        }
    }
    render(){
        return (
            <div className = {`col input-field${this.getClassNames !== ''? ' ' + this.getClassNames(): this.getClassNames()}`}>
                { this.renderIcon()   }
                { this.renderTextFieldOrArea() }
                { this.renderInputLabel() }
                { this.renderHelperLabel() }
            </div>
        )
    }
}

export default InputField;