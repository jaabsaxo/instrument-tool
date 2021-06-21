/* App.js */
import React, { Component } from "react";
import InstrumentTable from "./InstrumentTable";
import LogInStatusBar from "./LogInStatusBar";


class FindInstrumentPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {keyword: "", data: []}
  }

  handleChange(event) {
    console.log("handleChange", event.target.value)
    this.setState({keyword: event.target.value})
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
        <p>Type in Keywords: Apple, BTC, USD, Hong Kong</p>
        <form onSubmit={this.handleSubmit}>
        <label>
        <textarea value={this.state.keyword} style={{width: 500, backgroundColor: "#ffffff"}} rows={1} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Search for keyword" />
      </form>
      <InstrumentTable instrumentData = {this.state.data} />
      </div>
    );
  }
}

export default FindInstrumentPage;