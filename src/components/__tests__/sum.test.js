import {sum} from '../sum';

test("testing the sum function", () => {
    const result = sum (5, 10);

    expect(result).toBe(15);
})