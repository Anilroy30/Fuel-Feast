import Body from "../Body";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "@testing-library/react"
import "@testing-library/jest-dom";
import Mock_Data from  "../mocks/mockResListData.json";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(Mock_Data)
        },
    });
});

it("should search Res List for burger text input", async () => {
    await act(async () => 
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        )
    )

    const cardsBefore = screen.getAllByTestId("resCard");

    expect(cardsBefore.length).toBe(8);

    const searchBtn = screen.getByRole("button", {name: "Search"});

    const searchInput = screen.getByTestId("searchInput"); // another way to find something in screen

    fireEvent.change(searchInput, {target: {value: "burger"}});

    fireEvent.click(searchBtn);

    const cards = screen.getAllByTestId("resCard");

    expect(cards.length).toBe(1);
});


it("should filter Top Rated Restaurant", async () => {
    await act(async () => 
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        )
    )

    const cardsBeforeFilter = screen.getAllByTestId("resCard");

    expect(cardsBeforeFilter.length).toBe(8);

    const topRatedBtn = screen.getByRole("button", {name: "Top Rated Restaurants"});

    fireEvent.click(topRatedBtn);

    const cardsAfterFilter = screen.getAllByTestId("resCard");

    expect(cardsAfterFilter.length).toBe(4);
})