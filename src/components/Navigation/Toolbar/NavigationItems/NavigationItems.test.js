import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "../NavigationItem/NavigationItem";
//JEST is used to test general JS code.

// Connect enzyme to the project. Enzyme is used to test react components that
// need to be rendered.
configure({adapter: new Adapter()});

// Unit testing with JEST and Enzyme
describe("<NavigationItems />", () => {
    let wrapper;

    // method beforeEach()
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it("should render two <NavigationItem /> elements if not authenticated", () => {
        expect(wrapper.find(NavigationItem).toHaveLength(2));
    });

    it("should render three <NavigationItem /> elements if is authenticated", () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem).toHaveLength(3));
    });

    it("should an exact logout button", () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>).toEqual(true));
    });
});