/* App.js */
import React, { Component } from "react";

class LogInStatus extends Component {
  render() {
    if (!this.props.accessOk) {
      return <h1 style={{color: "#ff0000"}}>Access Token: Invalid</h1>
    } else {
      return <h1 style={{color: "#00ff00"}}>Access Token: OK</h1>
    }
  }
}

class CustomTextArea extends Component {
  render() {
    if (!this.props.accessOk) {
      return <textarea value={this.props.token} style={{width: 800, backgroundColor: "#ff0000"}} rows={6} onChange={this.props.handleChange} />;
    } else {
      return <textarea value={this.props.token} style={{width: 800, backgroundColor: "#00ff00"}} rows={6} onChange={this.props.handleChange} />
    }
  }
}

class ConfigPage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {clientKey: null, clientId: null, accountKey: null}
  }

  componentDidMount(){
    this.validateToken()
  }

  handleChange(event) {
    this.props.setAccessToken(event.target.value);
  }

  handleSubmit(event) {
    this.props.storeAccessTokenInLocalStorage();
    this.validateToken();
    event.preventDefault();
  }

  validateToken() {
    const urlUsersMe = "https://gateway.saxobank.com/sim/openapi/port/v1/accounts/me/";
    const tokenDict = {
      'method': 'GET',
      'headers': { 'Authorization': 'Bearer ' + this.props.token }
    }
    fetch(urlUsersMe, tokenDict).then(response => {
      if(response.status === 200) {
        this.props.setAccessOk();
        response.json().then(jsonData => {
          console.log("jsonData:", jsonData);
          this.setState({clientKey: jsonData.Data[0].ClientKey, clientId: jsonData.Data[0].ClientId, accountKey: jsonData.Data[0].AccountKey})
        });
      } else {
        this.props.setAccessInvalid();
      }
    })
  }

  render() {
    return (
      <div>
      <div>
        <br/>
        <br/>
      <form onSubmit={this.handleSubmit}>
        <label>
          <LogInStatus accessOk = {this.props.accessOk}/>
          <CustomTextArea accessOk = {this.props.accessOk} token = {this.props.token} handleChange = {this.handleChange} />
        </label>
        <br/>
        <br/>
        <input type="submit" value="Validate and store" />
      </form>
      </div>
      <br/>
      <br/>
      <hr/>
      <br/>
      <br/>
      <h1>
      Account Info  
      </h1>
      <div className="same-line">
        <p>ClientKey  </p>
        <p>{this.state.clientKey} </p>
      </div>
      <div className="same-line">
        <p>ClientId  </p>
        <p>{this.state.clientId} </p>
      </div>
      <div className="same-line">
        <p>AccountKey  </p>
        <p>{this.state.accountKey} </p>
      </div>
      <hr/>
      </div>
    );
  }
}

export default ConfigPage;

