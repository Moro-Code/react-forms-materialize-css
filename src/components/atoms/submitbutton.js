import React, {Component} from "react";
import Icon from "./icon";


class SubmitButton extends Component{
    
    constructor(props){
        super(props)
        this.getClassNames = this.getClassNames.bind(this)
        this.renderIcon = this.renderIcon.bind(this)
    }

    getClassNames(){
        if (typeof this.props.classNames === "object"){
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
        if ( typeof this.props.icon != "undefined"){
            if ( this.props.iconRight === true){
               return  ( <Icon icon = {this.props.icon} right = {this.props.iconRight}></Icon> )
            }
            else if ( this.props.iconLeft === true){
               return ( <Icon icon = {this.props.icon} left = {this.props.iconLeft}></Icon> )
            }
            return ( <Icon icon = {this.props.icon}></Icon> )
        }
        return null

    }

    render(){
        return(
            <button 
                className = {`btn${this.props.waves? " waves-effect waves-light":''}${this.getClassNames() !== ''? ' ' + this.getClassNames(): ''}`}
                type = "submit"
                name = {this.props.name}
                onClick = {this.props.onClick}
                disabled = {this.props.disabled}
                {...this.props.elementProps}>
            {this.props.text}
            {
                this.renderIcon()
            }
            </button>
        )
    }
}

export default SubmitButton;