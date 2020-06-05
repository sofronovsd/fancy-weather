import Forecast from "../Forecast";
import React from "react";
import ReactDOM from "react-dom";
import {render} from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom"

describe('Test forecast functionality', () => {

  const forecast=[
    {
      weather_code: "cloudy",
      observation_time: {
        value: 10
      },
      temp: [
        {
          min: {
            value: 10
          }
        },
        {
          max: {
            value: 10
          }
        }
      ]
    }
  ];

  it('render forecast without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Forecast forecast={forecast}/>, div)
  });

  it('render forecast correctly', () => {

    const {getByTestId} = render(<Forecast forecast={forecast}/>);
    expect(getByTestId('forecastContainer')).toBeDefined();
    expect(getByTestId('forecastItem0')).toBeDefined();
  });

  it('forecast matches snapshot', () => {
    const tree = renderer.create(<Forecast forecast={forecast}/>);
    expect(tree).toMatchSnapshot();
  });
});
