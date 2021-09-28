/* App.js */
import React, { Component } from "react";
import InstrumentTable from "./InstrumentTable";
import LogInStatusBar from "./LogInStatusBar";
import InstrumentDetailsCard from "./InstrumentDetailsCard"


class FindInstrumentPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchInstrumentDetails = this.fetchInstrumentDetails.bind(this);
    this.state = {keyword: "", data: [], uicDetails: ""}
  }

  handleChange(event) {
    console.log("handleChange", event.target.value)
    this.setState({keyword: event.target.value})
  }

  fetchInstrumentDetails(uic) {
    let url = "https://gateway.saxobank.com/sim/openapi/ref/v1/instruments/details/?Uics="+ uic;
    console.log("Creating instrument table with from:", url);
    console.log("With Token", this.props.token);
    const  tokenDict = {
      'method': 'GET',
      'headers': { 'Authorization': 'Bearer ' + this.props.token }
    };
    fetch(url, tokenDict).then(response => response.json()).then(jsonData => {
      console.log("Fetch instrument data:", jsonData);
      this.setState({uicDetails: jsonData.Data});
    })
  }

  handleSubmit(event) {
    console.log("handleSubmit", this.state.keyword);
    event.preventDefault();
    let url = "https://gateway.saxobank.com/sim/openapi/ref/v1/instruments/?Keywords=" + this.state.keyword;
    const  tokenDict = {
      'method': 'GET',
      'headers': { 'Authorization': 'Bearer ' + this.props.token }
    };
    fetch(url, tokenDict).then(response => response.json()).then(jsonData => {
      this.setState({data: jsonData.Data})
      console.log("New state:", this.state);
      }
    )
  }

  render() {
    return (
      <div>
        <LogInStatusBar accessOk = {this.props.accessOk}/>
        <br/>
        <table style={{width: '70%'}}>
        <td>
          <p>Type in Keywords: Apple, BTC, USD, Hong Kong</p>
          <form onSubmit={this.handleSubmit}>
          <label>
          <textarea value={this.state.keyword} style={{width: 500, backgroundColor: "#ffffff"}} rows={1} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Search for keyword" />
          </form>
          <InstrumentTable instrumentData = {this.state.data} fetchInstrumentDetails = {this.fetchInstrumentDetails} />
        </td>
        <td>
          <InstrumentDetailsCard uicDetails = {this.state.uicDetails} token = {this.props.token}/>
        </td>
        </table>
      </div>
    );
  }
}

export default FindInstrumentPage;