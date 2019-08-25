import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import App from "./App";
import Counter from "./Counter";
import axios from "axios";

describe("App tests", () => {
    test("Snapshot renderers", () => {
        const component = renderer.create(<App />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("Renders the inner Counter", () => {
        const wrapper = mount(<App />);
        expect(wrapper.find(Counter).length).toEqual(1);
    });

    it("Passes all props to counter", () => {
        const wrapper = mount(<App />);
        const counter = wrapper.find(Counter);

        expect(counter.find("p").text()).toEqual("0");
    });

    it("Increments the counter", () => {
        const wrapper = mount(<App />);
        wrapper
            .find("button")
            .at(0)
            .simulate("click");

        const counter = wrapper.find(Counter);
        expect(counter.find("p").text()).toEqual("1");
    });

    it("Decrements the counter", () => {
        const wrapper = mount(<App />);
        wrapper
            .find("button")
            .at(1)
            .simulate("click");

        const counter = wrapper.find(Counter);
        expect(counter.find("p").text()).toEqual("-1");
    });

    it("Fetches async data", done => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(
                () =>
                    resolve({
                        data: {
                            hits: [
                                { objectID: "1", title: "a" },
                                { objectID: "2", title: "b" },
                            ],
                        },
                    }),
                100,
            );
        });

        axios.get = jest.fn(() => promise);

        const wrapper = mount(<App />);

        expect(wrapper.find("li").length).toEqual(0);

        promise.then(() => {
            setImmediate(() => {
                wrapper.update();

                expect(wrapper.find("li").length).toEqual(2);

                axios.get.mockClear();

                done();
            });
        });
    });

    it("Fetches async data but fails", done => {
        const promise = new Promise((resolve, reject) =>
            setTimeout(() => reject(new Error("Whoops!")), 100),
        );

        axios.get = jest.fn(() => promise);

        const wrapper = mount(<App />);

        expect(wrapper.find("li").length).toEqual(0);

        promise.catch(() => {
            setImmediate(() => {
                wrapper.update();

                expect(wrapper.find("li").length).toEqual(0);
                expect(wrapper.find(".error").length).toEqual(1);

                axios.get.mockClear();

                done();
            });
        });
    });
});
