import { dataReducer } from "./App";

describe("Reducer tests", () => {
    it("Should set a list", () => {
        const state = { list: [], error: null };
        const list = ["a", "b", "c"];
        const newState = dataReducer(state, {
            type: "SET_LIST",
            list,
        });

        expect(newState).toEqual({ list, error: null });
    });

    it("Should reset the error if list is set", () => {
        const state = { list: [], error: true };
        const list = ["a", "b", "c"];
        const newState = dataReducer(state, {
            type: "SET_LIST",
            list,
        });

        expect(newState).toEqual({ list, error: null });
    });

    it("Should set the error", () => {
        const state = { list: [], error: null };
        const newState = dataReducer(state, { type: "SET_ERROR" });

        expect(newState).toEqual({ list: [], error: true });
    });
});
