/* App.js */
import React, { Component } from "react";
import Table from "./Table";
import InstrumentTable from "./InstrumentTable";
import LogInStatusBar from "./LogInStatusBar";


class ExchangeCard extends Component{
  constructor(props){
    super(props);
    this.state = {expand: false, data: []};
    this.setExpandTrue = this.setExpandTrue.bind(this);
    this.setExpandFalse = this.setExpandFalse.bind(this);
  }

  fetchInstrumentData(){
    let url = "https://gateway.saxobank.com/sim/openapi/ref/v1/instruments/?ExchangeId="+ this.props.exchangeInfo.ExchangeId;
    console.log("Creating instrument table with from:", url);
    console.log("With Token", this.props.token);
    const  tokenDict = {
      'method': 'GET',
      'headers': { 'Authorization': 'Bearer ' + this.props.token }
    };
    fetch(url, tokenDict).then(response => response.json()).then(jsonData => {
      console.log("Fetch instrument data:", jsonData);
      this.setState({data: jsonData.Data});
    })
  }

  setExpandTrue(){
    this.fetchInstrumentData()
    this.setState({expand: true});
  }

  setExpandFalse(){
    this.setState({expand: false});
  }

  render() {
    console.log("this.state ExchangeCard", this.state);
    if (this.state.expand===true) {
      return (
        <div>
          <button onClick={this.setExpandFalse}>Hide Instruments</button>
          <tr key="ExchangeId">
            <InstrumentTable instrumentData={this.state.data}/>
          </tr>
        </div>
     )
    } else {
      return (
        <div>
        <tr key="ExchangeId">
           <td>{this.props.exchangeInfo.ExchangeId}</td>
           <td>{this.props.exchangeInfo.Mic}</td>
           <td>{this.props.exchangeInfo.Name}</td>
           <td><button onClick={this.setExpandTrue}>Get Uics</button></td>
        </tr>
        </div>
     )
    }
    
  }
}

class ExchangeTable extends Component{
  constructor(props){
    super(props);
  }

  renderTableData() {
    if (this.props.exchangeData != null){
      return this.props.exchangeData.Data.map((exchangeInfo, index) => {
        return (
           <tr key="Exchanges">
              <td><ExchangeCard exchangeInfo={exchangeInfo} token={this.props.token}/></td>
           </tr>
        )
     })
    } else {
      return <p>Loading data..</p>
    }
    
 }

render() {
  return ( 
    <div>
      <table id='cards'>
        <tbody>
            {this.renderTableData()}
        </tbody>
      </table>
  </div>
  )}
}


class ExchangePage extends Component {
  constructor(props) {
    super(props);
    this.state = {exchangeData: null};
    this.loadNewExchangeData = this.loadNewExchangeData.bind(this);
  }

  loadNewExchangeData() {
    clearExchangeDataInLocalStorage();
    let urlRefExchanges = 'https://gateway.saxobank.com/sim/openapi/ref/v1/exchanges/';
    const  tokenDict = {
      'method': 'GET',
      'headers': { 'Authorization': 'Bearer ' + this.props.token }
    };
    fetch(urlRefExchanges, tokenDict).then(response => {
      if (response.status === 200) {
        return response.json().then(jsonData => {
          this.setState({exchangeData: jsonData});
          storeExchangeDataInLocalStorage(jsonData);
        });
      }
      if (response.status === 401) {
        this.props.setAccessInvalid();
      } 
    })
  }

  componentDidMount(){
    let storedExchangeData = loadExchangeDataFromLocalStorage();
    if (storedExchangeData) {
      this.loadNewExchangeData(); 
    } else {
      this.loadNewExchangeData(); 
    }
  }

  render() {
    return (
      <div>
        <LogInStatusBar accessOk = {this.props.accessOk}/>
        <br/>
        <button onClick={this.loadNewExchangeData}>Reload Table</button>
        <ExchangeTable exchangeData={this.state.exchangeData} token={this.props.token}/>
      </div>
    );
  }
}

export default ExchangePage;


const LocalStorageKeyForExchangeData = "LocalStorageKeyForExchangeData-evxxxgvat3352536326";

function loadExchangeDataFromLocalStorage() {
  let exchangeData = localStorage.getItem(LocalStorageKeyForExchangeData);
  return exchangeData
}

function storeExchangeDataInLocalStorage(exchangeData) {
  localStorage.setItem(LocalStorageKeyForExchangeData, exchangeData);
}

function clearExchangeDataInLocalStorage() {
  localStorage.setItem(LocalStorageKeyForExchangeData, null);
}