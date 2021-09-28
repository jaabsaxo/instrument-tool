import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 600,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function InstrumentCard(instrumentInfo) {
  console.log("instrumentInfo", instrumentInfo);
  const classes = useStyles();
  let uic = instrumentInfo.instrumentInfo.Identifier;
  let AssetType = instrumentInfo.instrumentInfo.AssetType;
  let symbol = instrumentInfo.instrumentInfo.Symbol;
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
        {instrumentInfo.instrumentInfo.Description}
        </Typography>
        <Button style={{textTransform: 'none'}} onClick={() => {navigator.clipboard.writeText(AssetType)}}>
          <Typography variant="h5" component="h2">{AssetType}</Typography>
        </Button>
        /
        <Button style={{textTransform: 'none'}} onClick={() => {navigator.clipboard.writeText(symbol)}}>
          <Typography variant="h5" component="h2">{symbol}</Typography>
        </Button>
        /
        <Button style={{textTransform: 'none'}} onClick={() => {navigator.clipboard.writeText(uic)}}>
          <Typography variant="h5" component="h2">{uic}</Typography>
        </Button>
        /
        <Button style={{textTransform: 'none'}} onClick={() => {instrumentInfo.fetchInstrumentDetails(uic)}}>
          <Typography variant="h5" component="h2">Details</Typography>
        </Button>
      </CardContent>
    </Card>
  );
}
