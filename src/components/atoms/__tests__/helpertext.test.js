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
})