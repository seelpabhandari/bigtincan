import React, { Component } from "react";
import weather from "./weather.json";
import Toggle from "react-bootstrap-toggle";
import {
  Route,
  NavLink,
  HashRouter,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { Table, Container } from "react-bootstrap";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      highTemp: "",
      lowTemp: "",
    };
    this.state = { toggleActive: false };
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle() {
    this.setState({ toggleActive: !this.state.toggleActive });
  }
  componentDidMount() {
    var weatherResponse = weather.query.results.channel;
    var currentTempCode = weatherResponse.item.condition.code;
console.log(weatherResponse)
    weatherResponse.item.forecast.map((values) => {
      if (currentTempCode === values.code) {
        this.setState({
          isLoaded: true,

          highTemp: values.high,
          lowTemp: values.low,
        });
      }
    });
  }

  render() {
    var location = weather.query.results.channel.location;
    var atmosphere=weather.query.results.channel.atmosphere;
    var astronomy=weather.query.results.channel.astronomy;
    var wind=weather.query.results.channel.wind;
    var { isLoaded, highTemp, lowTemp } = this.state;

    if (!isLoaded) {
      return <div>loading...</div>;
    } else {
      return (
        <BrowserRouter>
          <Container className="padding-top-50">
            <h2>Weather conditions of New York</h2>
            <Table striped bordered hover>
              <thead>
                <tr className="bold">
                  <th>Conditions</th>
                  <th>Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Location</td>
                  <td>
                    {location.city}, {location.country}, {location.region}
                  </td>
                </tr>
                <tr>
                  <td>Current Weather Description</td>
                  <td>Francisco Chang</td>
                </tr>
                <tr>
                  <td>Current Temperature</td>
                  <td>Roland Mendel</td>
                </tr>
                <tr>
                  <td>Current High Temperature</td>
                  <td>{highTemp}</td>
                </tr>
                <tr>
                  <td>Current Low Temperature</td>
                  <td>{lowTemp}</td>
                </tr>
              </tbody>
            </Table>
            <h2>More data in the current conditions?</h2>
            <Toggle
              onClick={this.onToggle}
              on={<h2>ON</h2>}
              off={<h2>OFF</h2>}
              size="xs"
              offstyle="danger"
              active={this.state.toggleActive}
            />
           { this.state.toggleActive?
            <Table striped bordered hover >
              <thead>
                <tr className="bold">
                  <th>Conditions</th>
                  <th>Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Wind Speed</td>
                  <td>
                    {wind.speed}
                  </td>
                </tr>
                <tr>
                  <td>Humidity</td>
                  <td>{atmosphere.humidity}</td>
                </tr>
                <tr>
                  <td>Pressure</td>
                  <td>{atmosphere.pressure}</td>
                </tr>
                <tr>
                  <td>Sunrise Time</td>
                  <td>{astronomy.sunrise}</td>
                </tr>
                <tr>
                  <td>Sunset Time</td>
                  <td>{astronomy.sunset}</td>
                </tr>
              </tbody>
            </Table>:null}
          </Container>
        </BrowserRouter>
      );
    }
  }
}

export default Main;
