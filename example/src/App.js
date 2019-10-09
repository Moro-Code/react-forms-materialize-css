import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Form from "react-forms-materialize-css"

function App() {
  let handleChange = function(event){
    let data = {}
    for (let item in this.state){
      if ( item.indexOf("Value") !== -1){
        data[item.split("Value")[0]] = this.state[item]
      }
    }
    console.log(data)
    event.preventDefault()
  }
  let customOnChangeFunc = function(event){
    console.log(`${event.target.name} has value ${event.target.value}`)
  }
  return (
      <Form formDataFileName = "example-form.json" classNames = {["s12"]} onSubmitFunc = {handleChange} onChangeFuncs = { {firstName: customOnChangeFunc}}>
      </Form>
  );
}

export default App;