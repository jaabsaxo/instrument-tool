import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InstrumentCard from './InstrumentCard';


class InstrumentTable extends Component {
  constructor(props) {
    super(props)
  }

  renderTableData() {
    if (this.props.instrumentData.length > 0){
      return this.props.instrumentData.map((instrumentInfo, index) => {
        return (
           <tr key="index">
              <td><InstrumentCard instrumentInfo={instrumentInfo} fetchInstrumentDetails = {this.props.fetchInstrumentDetails.bind(this)}/></td>
           </tr>
        )
     })
    } 
 }

  render(){ return(
    <div>
      <table id='cards'>
        <tbody>
            {this.renderTableData()}
        </tbody>
      </table>
    </div>
  )}
}


export default InstrumentTable;

