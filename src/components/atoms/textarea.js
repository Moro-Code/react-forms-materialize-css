import React, {Component} from "react";


class TextArea extends Component{
    render(){
        return (
            <textarea {...this.props.elementProps} 
                   disabled = {this.props.disabled} 
                   className = "materialize-textarea"
                   onChange = {this.props.onChange}
            >
                {this.props.children}
            </textarea>
        )
    }
    
}

export default TextArea;