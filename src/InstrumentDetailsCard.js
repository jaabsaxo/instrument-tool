/* App.js */
import React, { Component } from "react";
import Table from "./Table";
import InstrumentTable from "./InstrumentTable";
import LogInStatusBar from "./LogInStatusBar";


class InstrumentDetailsCard extends Component{
  constructor(props){
    super(props);
  }

  render() {

    if (this.props.uicDetails != "") {
      return(
        <div>
          <h2>Details for</h2>
          <p>{this.props.uicDetails[0].Description}</p>
          <div>
            <pre>
            {JSON.stringify(this.props.uicDetails, null, 2)}
            </pre>
          </div>
        </div>
      )
    } else {
      return(<p></p>)
    }

    
  }
}

export default InstrumentDetailsCard;