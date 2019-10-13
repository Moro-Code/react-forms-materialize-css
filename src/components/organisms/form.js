import React, {Component} from "react";
import InputField from "../molecules/inputfield";
import SubmitButton from "../molecules/submitbutton";
import M from "materialize-css"
class Form extends Component{
    constructor(props){
        super(props)
        this.loadState = this.loadState.bind(this)
        this.state = {
            dataLoaded: false
        }
        this.fetchFormData(props.formDataFileName).then(
            this.loadState
        )
    }

    componentDidMount(){
        M.AutoInit()
    }

    shouldComponentUpdate(nextProps, nextState){
        return Object.keys(this.state).length === Object.keys(nextState).length
    }

    // TODO: throwing an error is probably not the best solution, perhaps a something is wrong is better

    async fetchFormData(formDataFileName){
        /* Asynchronos function which will get the JSON file (formDataFileName) 
           from the /public/forms/ directory. If the file does not exist or does
           not load an error will be thrown 
        */
        let status = response => {
            // resolves or rejects promise based on whether or not file loads 
            if (response.status === 200){
                // if the status is OK resolve the promise otherwise reject 
                return Promise.resolve(response)
            }
            return Promise.reject(new Error(response.statusText))
        }

        let json = response => {
            // return a resolved promise with the data 
            return  Promise.resolve(response.json());
        }

        let formData

        await fetch(`forms/${formDataFileName}`).then(
            status
         ).then(
            json
         ).then(
             // assign data to formJson param
             (data) => {
                 formData = data
             }
         ).catch( error => {
             // if there is an error, throw it 
             throw error
         })
        
        return formData
    }

    loadState(formJson){
    // This function generates the state from the JSON data 
        let names = {}
        for (let row in formJson){
            row = formJson[row]
            for (let field in row){     
                
                if (typeof names[field] !== "undefined"){
                   throw new Error(`A field with name ${field} has been encountered but the name already exists in the form ${names[field]}`)
                }
                else {
                    names[field] = 1
                } 
                
                let fieldObj = row[field]

                let textFieldBool = "textFieldProps" in fieldObj
                let selectFieldBool = "selectFieldProps" in fieldObj
                let textAreaBool = "textAreaProps" in fieldObj

                let dontSkip = textAreaBool || selectFieldBool || textFieldBool

                if (field !== "submit" && dontSkip){
                    // adding the name of the field to the lower level component props
                    
                    if (textFieldBool){
                        fieldObj["textFieldProps"]["name"] = field 
                    }
                    else if (selectFieldBool){
                        fieldObj["selectFieldProps"]["name"] = field
                    }
                    else if (textAreaBool){
                        fieldObj["textAreaProps"]["name"] = field
                    }


                    // creating the state key value which will store the value of the field
                    this.setState(
                        {[`${field}Value`] : fieldObj["default"] ? fieldObj["default"]: ""}
                    )
                    // creating the state key which will store whether field is disabled
                    if (typeof fieldObj["disabled"] === "undefined" || fieldObj["disabled"] == "false"){
                        this.setState(
                            {[`${field}Disabled`] :false}
                        )
                    }
                    else if (fieldObj["disbaled"] === true || fieldObj["disbaled"] === "true"){
                        this.setState(
                            {[`${field}Disabled`]: true}
                        )
                    }
                    else {
                        throw new Error(`You have entered and incorrect type for the disabled key for the field ${field}. Type should be boolean or string ("true" or "false" only)`)
                    }
                }
                
                else if(field === "submit"){
                    fieldObj["name"] = "submit"
                    
                    if (typeof fieldObj["disabled"] === "undefined" || fieldObj["disabled"] === false || fieldObj["disabled"] === "false"){
                        this.setState(
                            {"submitDisabled" :false}
                        )
                    }
                    else if (fieldObj["disbaled"] === true || fieldObj["disbaled"] === "true"){
                        this.setState(
                            {"submitDisabled": true}
                        )
                    }
                    else {
                        throw new Error(`You have entered and incorrect type for the disabled key for the field submit. Type should be boolean or string ("true" or "false" only)`)
                    }
                } 
                
            }
        }
        this.formJson = formJson
        this.setState(
            {dataLoaded: true}
        )
    }

    renderHTML(formJson){
        /* This function serves as the component generator based upon
           the data contained in the JSON file provided */
        let comps = [];
        // objects used to cache names of fields in forms
        let names = {}
        // the for loop goes over each of the rows in the JSON structure and generates the fields 
        for (let row in formJson){
            // create an array which will contain the components for the row
            let rowComps = []
            // get the row object
            row = formJson[row]
            for ( let field in row){
                // make sure name of the field is unique by checking if it is in the cache 
                if (field in names){
                    throw new Error(`A field with name ${field} has been encountered but the name already exists in the form`)
                }
                
                // create a new variable called name which is the key of the field for convenience
                let name = field
                let fieldObj = row[name]
                 
                // comp variable will house the component
                let comp;

                // handle if the field is free text based whether thats a text area or text field 
                if (name !== "submit" && ("textFieldProps" in fieldObj || "textAreaProps" in fieldObj || "selectFieldProps" in fieldObj)){
                    // onchange function to update the state
                    let onchangefunc
                    // custom onChange functions mapped to field component names 
                    if (typeof this.props.onChangeFuncs === "object" && typeof this.props.onChangeFuncs[name] === "function"){
                        let exec = this.props.onChangeFuncs[name]
                        if ( typeof this.props.onChangeFuncBase === "function"){
                            let onChangeFuncBase = this.props.onChangeFuncBase
                            onchangefunc = function(event){
                                onChangeFuncBase(event)
                                exec(event)
                            }
                        }
                        else {
                            onchangefunc = function(event){
                                this.setState(
                                    {[`${event.target.name}Value`]: event.target.value}
                                )
                                exec(event)
                            }
                        }
                    }
                    else if ( typeof this.props.onChangeFuncBase === "function"){
                        let onChangeFuncBase = this.props.onChangeFuncBase
                        onchangefunc = function(event){
                            onChangeFuncBase(event)
                        }
                    }
                    else {
                        onchangefunc = function(event){
                            this.setState(
                                {[`${event.target.name}Value`]: event.target.value}
                            )
                            console.log(event.target.value)
                        }
                    }
                    // register the onchange function for the particular field and bind this
                    this[`handleChangeFor${name}`] = onchangefunc.bind(this)

                    // defining the component
                    comp = <InputField {...fieldObj} 
                                        onChange = {this[`handleChangeFor${name}`]}
                                        disabled = {this.state[[`${name}Disabled`]]}>
                            </InputField>
                }

                else if (name === "submit"){
                    comp = <SubmitButton {...fieldObj}
                                         disabled = {this.state["submitDisabled"]}>               
                            </SubmitButton>
                }

                // ensuring that a component is created which is pushed to the rowComps array
                if (typeof comp != "undefined"){
                    rowComps.push(comp)
                }
             }

             // creating the form row with the row components (the fields) as the children
             let rowComp = React.createElement(
                 'div', {className: "row"}, ...rowComps 
             )
             // push the row to the components list
             comps.push(rowComp)
            }
            
            // React does not support the spread operator for children in jsx and this we must use the function notation 
            // We are using a react fragment to wrap all the row components and their children rather than in an arbitrary div
            // Say no to div soup
            let formComps = React.createElement(React.Fragment, null,  ...comps)

            let formProperties = {}
            formProperties.className = `col ${this.props.classNames? this.props.classNames.join(" "): ""}`
            if (typeof this.props.onSubmitFunc === "function"){
                this.handleSubmission = this.props.onSubmitFunc
                this.handleSubmission = this.handleSubmission.bind(this)
                formProperties.onSubmit = this.handleSubmission
            }

            return (
                <form {...formProperties}>
                    {formComps}
                </form>
            )


    }

    renderSwitch(){
        /* Conditional render function which will either load the form with its 
           child components if the data is loaded as indicated by the dataLoaded flag
           in the state, or load a preloader component to let the user know the form is loading */
        if (this.state.dataLoaded){
            return this.renderHTML(this.formJson)
        }
        else {
            return(
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            )
        }
    }

    render(){
        return (
            <div className = "row">
                {
                    this.renderSwitch()
                }
            </div>
        )
    
    }
}

export default Form ;