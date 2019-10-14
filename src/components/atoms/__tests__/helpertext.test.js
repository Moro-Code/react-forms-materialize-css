import { render,unmountComponentAtNode } from "react-dom";
import React from "react"
import { act } from "react-dom/test-utils"


import HelperText from "../helpertext"

// setup and teardown methods
let container = null

beforeEach(() => {
    // creating a div element as a container and appending it to the document.body dom element in the dom tree
    container = document.createElement("div")
    document.body.appendChild(container)
})

afterEach(() => {
    // clean up and unmount the tree from the document
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

test("renders with helper text", () => {
    act( () => {
        render(<HelperText helperTextText="this is some help"></HelperText>, container)
    })
    expect(container.textContent).toBe(
        "this is some help"
    )
})

test("renders with dataSuccess", () => {
    act(
        () => {
            render( <HelperText 
                          helperTextText="this is some help"
                          dataSuccess = "this is a success">
                    </HelperText>, container)
        }
    )
    expect(container.textContent).toBe(
        "this is some help"
    )

    let span = container.getElementsByTagName("span")[0]

    expect(span.hasAttribute("data-success")).toBeTruthy()
    expect(span.getAttribute("data-success")).toMatch("this is a success")

})

test("renders with dataError", () => {
    act( () => {
        render(
            <HelperText helperTextText="this is some help" dataError="this is an error">
            </HelperText>, container
        )
    })

    expect(container.textContent).toBe(
        "this is some help"
    )

    let span = container.getElementsByTagName("span")[0]

    expect(span.hasAttribute("data-error")).toBeTruthy()
    expect(span.getAttribute("data-error")).toMatch("this is an error")
})

test("renders with dataError and dataSuccess", () => {
    act( () => {
        render( 
            <HelperText helperTextText="this is some help" 
                        dataSuccess="this is a success" 
                        dataError="this is an error">

            </HelperText>, container
        )
    })

    expect(container.textContent).toBe(
        "this is some help"
    )

    let span = container.getElementsByTagName("span")[0]

    expect(span.hasAttribute("data-error")).toBeTruthy()
    expect(span.getAttribute("data-error")).toMatch("this is an error")

    expect(span.hasAttribute("data-success")).toBeTruthy()
    expect(span.getAttribute("data-success")).toMatch("this is a success")

})

describe("render expected to fail", () => {
    // in this case console.error will be called, so we mock this 
    beforeEach( () => {
        jest.spyOn(global.console, "error").mockImplementation()
    })
    // clean up to ensure tests are not leaky
    afterEach(() => {global.console.error.mockRestore()})
    test("does not render without helperTextText", () => {
        act( () => {
            render(<HelperText></HelperText>, container)
        })

        expect(console.error).toBeCalled()

        // get the last call 
        let message = console.error.mock.calls[0][0]

        // check if the error is actually related to the prop not being provided
        expect(message).toMatch(/Failed prop type: The prop `helperTextText` is marked as required in `HelperText`/)
    })
    
    test("helperTextText must be a string", () => { 
        act( () => {
            render(<HelperText helperTextText = {1}></HelperText>, container)
        })

        expect(console.error).toBeCalled()

        let message = console.error.mock.calls[0][0]

        expect(message).toMatch(/Invalid prop `helperTextText` of type `number` supplied to `HelperText`, expected `string`/)
    })

    test("dataSuccess must be a string", () => {
        act( () => {
            render(
                <HelperText helperTextText="this is some help" dataSuccess={1}></HelperText>, container
            )
        })

        expect(console.error).toBeCalled()
        let message = console.error.mock.calls[0][0]

        expect(message).toMatch(/Invalid prop `dataSuccess` of type `number` supplied to `HelperText`, expected `string`/)
    })

    test("dataError must be a string", () => {
        act( () => {
            render(
                <HelperText helperTextText="this is some help" dataError={1}></HelperText>, container
            )
        })

        expect(console.error).toBeCalled()

        let message = console.error.mock.calls[0][0]

        expect(message).toMatch(/Invalid prop `dataError` of type `number` supplied to `HelperText`, expected `string`/)
    })
})