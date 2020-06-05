import ControlPanel from "../ControlPanel";
import React from "react";
import ReactDOM from "react-dom";
import {render} from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom"

describe('Test control panel functionality', () => {
  it('render control panel without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ControlPanel/>, div)
  });

  it('render control panel correctly', () => {
    const {getByTestId} = render(<ControlPanel/>);
    expect(getByTestId('button')).toBeDefined();
    expect(getByTestId('dropdown')).toBeDefined();
    expect(getByTestId('optionButtons')).toBeDefined();
    expect(getByTestId('cButton')).toBeDefined();
    expect(getByTestId('fButton')).toBeDefined();
  });

  it('render control panel with C degree', () => {
    const {getByTestId} = render(<ControlPanel isC={true}/>);
    expect(getByTestId('optionButtons')).toBeDefined();
    const cButton = getByTestId('cButton');
    expect(cButton).toBeDefined();
    expect(cButton).toHaveClass('active');
  });

  it('render control panel with F degree', () => {
    const {getByTestId} = render(<ControlPanel isC={false}/>);
    expect(getByTestId('optionButtons')).toBeDefined();
    const fButton = getByTestId('fButton');
    expect(fButton).toBeDefined();
    expect(fButton).toHaveClass('active');
  });

  it('control panel matches snapshot', () => {
    const tree = renderer.create(<ControlPanel/>);
    expect(tree).toMatchSnapshot();
  });
});
