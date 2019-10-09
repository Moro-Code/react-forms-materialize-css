# react-forms-materialize-css 📋

> A simple dynamic react form component which uses json to render a form with material css styling.

[![NPM](https://img.shields.io/npm/v/react-forms-materialize-css.svg)](https://www.npmjs.com/package/react-forms-materialize-css) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-forms-materialize-css
```

## Usage

Using react-forms-materialize-css is easy (not baised at all 😏)!

## Prequesites ✋

- You need to make sure that you're using react ^15.0.0 or ^16.0.0.
- You will need to install materialize-css and load the material icons resource in the head element of your index.html file. You will also have to install the materialize-css npm module

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Step 1 (Defining our form JSON) 🏃

The react-forms-materialize-css ingests the form JSON and dynamically generates fields and their state variables in the form component. Currently you must find a way to serve this JSON file and this must be served under a /forms route. If you are using create-react-app this is fairly easy just add the json file in a forms folder under the public folder i.e. public > forms > [form-name].json . 

Alright! Let's create a simple sign-up form asking for the first name, last name, email, password and an about you free text field. We will also add a submit button. We will see how we can add custom handlers for onChange and onSubmit events in Step 2. 

```json 
[
    {
        "firstName": {
            "textFieldProps": {
                "id": "first_name",
                "placeholder": "First Name",
                "type": "text"
            },
            "labelText": "First Name",
            "icon": "account_circle",
            "classNames": [
                "s6",
                "active"
            ]
        },
        "lastName": {
            "textFieldProps" : {
                "id": "last_name",
                "placeholder": "Last Name",
                "type": "text"
            },
            "labelText": "Last Name",
            "classNames" : [
                "s6",
                "active"
            ]
        }
    },
    {
        "email": {
            "textFieldProps": {
                "id": "email",
                "placeholder": "your@email.com",
                "type": "email"
            },
            "labelText": "email",
            "icon": "email",
            "helperTextText": "Enter your email",
            "dataSuccess": "Valid Email",
            "dataError": "Invalid Email",
            "classNames" : [
                "s12"
            ]
        }
    },
    {
        "aboutYou": {
            "textAreaProps": {
                "id": "about_you",
                "placeholder": "Tell us a little about you"
            },
            "labelText": "About You",
            "classNames": [
                "s12"
            ]
        }
    },
    {
        "submit": {
            "icon": "send",
            "iconRight": true,
            "text": "Submit"
        }
    }
]
```

Now we add this form JSON to our forms folder or where this file can be served under the route /forms

![signupform](/docs/images/signupform.png)


## Step 2 (Adding our component to our app) 🏃

Now we just need to add our form component

```jsx
import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import Form from "react-forms-materialize-css"

function App () {
    // we're going to define a submit handler here
    // we can do anything in this function
    // for this example we will create an object and log it to console 
    let handleSubmit = function(event){
        let data = {}
        // the this here will point to the Form component
        for (let item in this.state){
            /* values for the fields will have "Value" appended 
               to their state variable
            */ 
            if (item.indexOf("Value") !== -1) {
                data[item.split("Value")[0]] = this.state[item]
                console.log(item)
            }
        }
        console.log(data)
        event.preventDefault()
    }

    /* we're going to also define a function handle onChange events. Each individual field can be assigned a seperate handler or none at all */
    let handleChange = function(event){
        console.log(
            `${event.target.name} has value ${event.target.value}`
        )
    }
    return (
        <Form formDataFileName="signup.json" classNames={["s12"]}
              onSubmitFunc = {handleSubmit} onChangeFuncs ={{firstName: handleChange}}>
        </Form>
    )
}

export default App;
```

## Step 3 (Start our application) 🏁

![itworks](/docs/gifs/itworks.gif)


You now have a working form! Adding, altering or removing fields only requires the changing of the form JSON. 


## Contributing

This is a fairly simple project so if you are new to react like me, would like to help and don't know where to start, please feel free to contact me. I will also be opening up a series of issues for what needs to be developed if you want to open a PR.

📬 [omar@omarnasr.ca](mailto:omar@omarnasr.ca)
🐦 [@thenextmusk](https://twiter.com/thenextmusk)


## License

MIT © [Moro-Code](https://github.com/Moro-Code)
