import {act} from '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../Header';
import Cart from '../Cart';
import { Provider } from 'react-redux';
import appStore from '../../utils/appStore';
import { BrowserRouter } from 'react-router-dom';
import RestaurantMenu from '../RestaurantMenu';
import Mock_Data from "../mocks/mockResMenu.json";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(Mock_Data)
        },
    });
});

it("should load the Restaurant Menu Component", async () => {
    await act(async () => 
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header/>
                    <RestaurantMenu/>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        )
    )

    const accordionHeader = screen.getByText("Breakfast (6)");
    fireEvent.click(accordionHeader);

    expect(screen.getAllByTestId("foodItems").length).toBe(6);

    expect(screen.getByText("Cart-(0 items)")).toBeInTheDocument();

    const addBtns = screen.getAllByRole("button", {name: "Add +"});
    fireEvent.click(addBtns[0]);

    expect(screen.getByText("Cart-(1 items)")).toBeInTheDocument();
    fireEvent.click(addBtns[1]);

    expect(screen.getByText("Cart-(2 items)")).toBeInTheDocument();

    expect(screen.getAllByTestId("foodItems").length).toBe(8);

    fireEvent.click(screen.getByRole("button", {name: "Clear Cart"}));

    expect(screen.getAllByTestId("foodItems").length).toBe(6);

    expect(screen.getByText("Cart is Empty,Add Items to the Cart")).toBeInTheDocument();
})