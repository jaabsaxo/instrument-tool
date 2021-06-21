import React from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import ExchangePage from "./ExchangePage"
import ConfigPage from "./ConfigPage"
import FindInstrumentPage from "./FindInstrumentPage"

class RenderPage extends React.Component {

  render() {
    if (this.props.pageNumber === 0){
      return <ConfigPage token={this.props.token} 
      setAccessToken={this.props.setAccessToken}
      storeAccessTokenInLocalStorage = {this.props.storeAccessTokenInLocalStorage}
      accessOk = {this.props.accessOk}
      setAccessInvalid = {this.props.setAccessInvalid}
      setAccessOk = {this.props.setAccessOk} />;
    } 
    else if (this.props.pageNumber === 1){
      return <ExchangePage accessOk = {this.props.accessOk}
      token = {this.props.token} 
      setAccessInvalid = {this.props.setAccessInvalid}
      setAccessOk = {this.props.setAccessOk}/>;
    } else if (this.props.pageNumber === 2) {
      return <FindInstrumentPage accessOk = {this.props.accessOk}
      token = {this.props.token} 
      setAccessInvalid = {this.props.setAccessInvalid}
      setAccessOk = {this.props.setAccessOk}/>;
    } else {
      return <h1>Hello, {this.props.pageNumber}, {this.props.token}</h1>;
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pageNumber: 0, accessTokenLocalStorageKey: "instrument-tool-accees-rjh391x", token: "x", accessOk: false};
    this.setAccessToken = this.setAccessToken.bind(this);
    this.storeAccessTokenInLocalStorage = this.storeAccessTokenInLocalStorage.bind(this);
    this.setAccessInvalid = this.setAccessInvalid.bind(this);
    this.setAccessOk = this.setAccessOk.bind(this);
  }

  componentDidMount() {
    const tokenFound = localStorage.getItem(this.state.accessTokenLocalStorageKey);
    if (tokenFound) {
      this.setState({token: tokenFound})
      const urlUsersMe = "https://gateway.saxobank.com/sim/openapi/port/v1/users/me";
      const tokenDict = {
        'method': 'GET',
        'headers': { 'Authorization': 'Bearer ' + tokenFound }
      }
      fetch(urlUsersMe, tokenDict).then(response => {
        if(response.status === 200) {
          this.setAccessOk();
        } else {
          this.setAccessInvalid();
        }
      })

    }
  }


  setAccessToken(e){
    this.setState({token: e})
  }

  setAccessOk(){
    this.setState({accessOk: true})
  }

  setAccessInvalid(){
    this.setState({accessOk: false})
  }

  storeAccessTokenInLocalStorage(e){
    localStorage.setItem(this.state.accessTokenLocalStorageKey, this.state.token);
  }

  render() {
    return (
      <div className="App"
        style={{
          marginLeft: "0%",
        }}
      >
        <Paper square>
          <Tabs
            value={this.state.pageNumber}
            textColor="primary"
            indicatorColor="primary"
            onChange={(event, newValue) => {
              this.setState({pageNumber: newValue})
            }}
          >
            <Tab label="Config" />
            <Tab label="Exchanges" />
            <Tab label="FIND INSTRUMENT" />
          </Tabs>
        </Paper>
        <RenderPage pageNumber={this.state.pageNumber} 
        token={this.state.token} 
        setAccessToken={this.setAccessToken}
        storeAccessTokenInLocalStorage = {this.storeAccessTokenInLocalStorage}
        accessOk = {this.state.accessOk}
        setAccessInvalid = {this.setAccessInvalid}
        setAccessOk = {this.setAccessOk}/>
        
      </div>
    );
  }
}
  
export default App;