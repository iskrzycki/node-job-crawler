import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
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
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right">Source</TableCell>
            <TableCell align="right">Create date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((offer) => (
            <TableRow key={offer._id}>
              <TableCell component="th" scope="row">
                {offer.position}
              </TableCell>
              <TableCell align="right">{offer.salary}</TableCell>
              <TableCell align="right">{offer.location}</TableCell>
              <TableCell align="right">{offer.company}</TableCell>
              <TableCell align="right">{offer.source}</TableCell>
              <TableCell align="right">{offer.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}