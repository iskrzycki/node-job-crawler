import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NextWeekIcon from '@material-ui/icons/NextWeek';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  tableCellHeader: {
    fontSize: '30px',
    textAlign: 'center',
    margin: '15px',
    fontWeight: 600,
    width: '14%'
  },
  tableCellContent: {
    textAlign: 'center',
    fontSize: '16px',
    width: '14%'
  },
  applyIcon: {
    cursor: 'pointer'
  }
});

export default function BasicTable() {

  const [offers, setOffers] = useState<any[]>([])

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch("http://praca.bieda.it/api/offers")

      const data = await response.json();
      setOffers(data)
    }
    fetchData();

  }, [])

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" className={classes.tableCellHeader}>Position</TableCell>
            <TableCell align="right" className={classes.tableCellHeader}>Salary</TableCell>
            <TableCell align="right" className={classes.tableCellHeader}>Location</TableCell>
            <TableCell align="right" className={classes.tableCellHeader}>Company</TableCell>
            <TableCell align="right" className={classes.tableCellHeader}>Source</TableCell>
            <TableCell align="right" className={classes.tableCellHeader}>Create date</TableCell>
            <TableCell align="right" className={classes.tableCellHeader}>Apply</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((offer) => (
            <TableRow key={offer._id}>
              <TableCell component="th" scope="row" className={classes.tableCellContent}>
                {offer.position}
              </TableCell>
              <TableCell align="right" className={classes.tableCellContent}>{offer.salary}</TableCell>
              <TableCell align="right" className={classes.tableCellContent}>{offer.location}</TableCell>
              <TableCell align="right" className={classes.tableCellContent}>{offer.company}</TableCell>
              <TableCell align="right" className={classes.tableCellContent}>{offer.source}</TableCell>
              <TableCell align="right" className={classes.tableCellContent}>{offer.createdAt}</TableCell>
              <TableCell align="right" className={classes.tableCellContent}><NextWeekIcon
               className={classes.applyIcon} 
               fontSize='large'
               onClick={() => window.open(offer.url)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}