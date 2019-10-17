import React from "react"
import {render, unmountComponentAtNode} from "react-dom"
import {act} from "react-dom/test-utils"
import renderer from "react-test-renderer"

import Icon from "../icon"


let container = null 

beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null 
})

describe("testing prop defaults", () => {
    test("right prop is false by default", () => {
        expect(Icon.defaultProps["right"]).toBe(false)
    })
    
    test("left prop is false by default", () => {
        expect(Icon.defaultProps["left"]).toBe(false)
    })
    test("prefix prop is false by default", ()=> {
        expect(Icon.defaultProps["prefix"]).toBe(false)
    })
})


test("material icon renders", () => {
    act(() => {
        render(
            <Icon icon="account_circle"></Icon>, container
        )
    })

    const icon_tag = container.getElementsByTagName("i")[0]

    expect(icon_tag.textContent).toBe("account_circle")
    expect(icon_tag.getAttribute("class")).toBe("material-icons")
})

test("icon renders prefix", () => {
    act(() => {
        render( 
            <Icon icon="account_circle" prefix={true}></Icon>, container
        )
    })

    const icon_tag = container.getElementsByTagName("i")[0]
    
    expect(icon_tag.textContent).toBe("account_circle")
    expect(icon_tag.getAttribute("class")).toBe("material-icons prefix")
})

test("icon renders right", () => {
    act(() => {
        render(
            <Icon icon="account_circle" right={true}></Icon>, container
        )
    })

    const icon_tag = container.getElementsByTagName("i")[0]

    expect(icon_tag.textContent).toBe("account_circle")
    expect(icon_tag.getAttribute("class")).toBe("material-icons right")
})

test("icon renders left", () => {
    act( () => {
        render(
            <Icon icon="account_circle" left={true}></Icon>, container
        )
    })

    const icon_tag = container.getElementsByTagName("i")[0]
    expect(icon_tag.textContent).toBe("account_circle")
    expect(icon_tag.getAttribute("class")).toBe("material-icons left")
})


describe("render expected to fail", () => {
    beforeEach(()=>{
        jest.spyOn(global.console, "error").mockImplementation()
    })
    afterEach(() => {
        global.console.error.mockRestore()
    })

    test("does not render without icon prop", () => {
        act(()=>{
            render(
                <Icon></Icon>, container
            )
        })

        expect(console.error).toBeCalled()

        const message = console.error.mock.calls[0][0]

        expect(message).toMatch(/Failed prop type: The prop `icon` is marked as required in `Icon`/)
    })

    test("icon must be a string", () => {
        act(() => {
            render(
                <Icon icon = {1}></Icon>, container
            )
        })

        expect(console.error).toBeCalled()
        
        const message = console.error.mock.calls[0][0]

        expect(message).toMatch(/Invalid prop `icon` of type `number` supplied to `Icon`, expected `string`/)
    })

    test("right must be a boolean", () => {
        act(() => {
            render(
                <Icon icon="account_circle" right="string"></Icon>, container
            )
        })

        expect(console.error).toBeCalled()

        const message = console.error.mock.calls[0][0]

        expect(message).toMatch( /Invalid prop `right` of type `string` supplied to `Icon`, expected `boolean`/ )
    })
    test("left must be a boolean", () => {
        act(() => {
            render(
                <Icon icon = "account_circle" left="string"></Icon>, container
            )
        })

        expect(console.error).toBeCalled()

        const message = console.error.mock.calls[0][0]

        expect(message).toMatch( /Invalid prop `left` of type `string` supplied to `Icon`, expected `boolean`/)
    })

    test("expect left, right and prefix to be mutually exclusive", () => {
        const right_left = new Icon({icon: "account_circle", right: true, left:true})
        right_left.render = right_left.render.bind(right_left)

        const left_prefix = new Icon({icon: "account_circle", left: true, prefix: true})
        left_prefix.render = left_prefix.render.bind(left_prefix)

        const right_prefix = new Icon({icon: "account_circle", right: true, prefix: true})
        right_prefix.render = right_prefix.render.bind(right_prefix)

        const right_left_prefix = new Icon({icon: "account_circle", right: true, prefix: true, left: true})
        right_left_prefix.render = right_left_prefix.render.bind(right_left_prefix)

        expect(right_left.render).toThrow("Invalid props: Props `right`, `left`, and `prefix` are mutually exclusive")
        expect(right_prefix.render).toThrow("Invalid props: Props `right`, `left`, and `prefix` are mutually exclusive")
        expect(left_prefix.render).toThrow("Invalid props: Props `right`, `left`, and `prefix` are mutually exclusive")
        expect(right_left_prefix.render).toThrow("Invalid props: Props `right`, `left`, and `prefix` are mutually exclusive")
    })
})