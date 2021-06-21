import React, { Component } from "react";
import { useTable } from 'react-table'
import styled from 'styled-components'

import { JsonToTable } from "react-json-to-table";

class Table extends Component  {
  constructor(props){
    super(props);
  }
  render() {
    console.log("Got jsonData:", this.props.jsonData);
    return <JsonToTable json={this.props.jsonData.Data} />  
  }
}

export default Table
