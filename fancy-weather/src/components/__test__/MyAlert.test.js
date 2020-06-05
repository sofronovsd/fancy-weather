import MyAlert from "../MyAlert";
import React from "react";
import ReactDOM from "react-dom";
import {render} from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom"

describe('Test alert functionality', () => {
  it('render alert without crashing', () => {
    const div = document.createElement('div');
    const alert = {isShow: true, text: "test"};
    ReactDOM.render(<MyAlert alert={alert} language="RU"/>, div)
  });

  it('render alert correctly', () => {
    const alert = {isShow: true, text: "test", searchValue: 'value'};
    const {getByTestId} = render(<MyAlert alert={alert} language="RU"/>);
    expect(getByTestId('alert')).toHaveStyle('display: block')
  });

  it('alert matches snapshot 1', () => {
    const alert = {isShow: true, text: "alertPlace", searchValue: 'City'};
    const tree = renderer.create(<MyAlert alert={alert} language="EN"/>);
    expect(tree).toMatchSnapshot();
  });

  it('alert matches snapshot 2', () => {
    const alert = {isShow: true, text: "alertPlace", searchValue: 'Город'};
    const tree = renderer.create(<MyAlert alert={alert} language="RU"/>);
    expect(tree).toMatchSnapshot();
  });

  it('render alert invisible', () => {
    const alert = {isShow: false, text: "test", searchValue: 'value'};
    render(<MyAlert alert={alert} language="RU"/>);
    expect(document.querySelector('.alert')).toEqual(null)
  });
});
