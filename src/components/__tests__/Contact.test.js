import {render, screen} from '@testing-library/react';
import Contact from '../Contact';
import "@testing-library/jest-dom";

describe("Contact Page", () => {

    // beforeAll(() => {
    //     console.log("Before All");
    // })

    // beforeEach(() => {
    //     console.log("Before Each");
    // })

    // afterAll(() => {
    //     console.log("After All");
    // })

    // afterEach(() => {
    //     console.log("After Each");
    // })


    test("should load the contact Page", () => {
        render(<Contact/>);
    
        const button = screen.getByRole("button");
    
        expect(button).toBeInTheDocument();
    })
    
    
    test("should load the contact Page", () => {
        render(<Contact/>);
    
        const inputs = screen.getAllByRole("textbox");
    
        expect(inputs.length).toBe(2);
    })    
})

it("should load the contact Page", () => {
    render(<Contact/>);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
})

it("should load the contact Page", () => {
    render(<Contact/>);

    const input1 = screen.getByPlaceholderText("message");

    expect(input1).toBeInTheDocument();
})