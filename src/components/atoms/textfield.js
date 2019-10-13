/* 
Atom component for a text field input which can be disabled and enabled
*/

import React, {Component} from 'react';

class TextField extends Component {
    render(){
        return (
            <input {...this.props.elementProps} 
                   disabled = {this.props.disabled} 
                   className = "validate"
                   onChange = {this.props.onChange}       
            > 
              {this.props.children}        
            </input>
        )
    }
}

export default TextField;