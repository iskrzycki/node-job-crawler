import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import CircularProgress from "@material-ui/core/CircularProgress";
import { format } from 'date-fns';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles({
  tableCellHeader: {
    fontSize: "30px",
    textAlign: "center",
    margin: "15px",
    fontWeight: 600,
    width: "14%",
  },
  tableCellContent: {
    textAlign: "center",
    fontSize: "16px",
    width: "14%",
  },
  applyIcon: {
    cursor: "pointer",
  },
  wrapper: {
    height: "100%",
    overflowY: "scroll",
    width: "100%",
    margin: "auto",
  },
  spinnerContainer: {
    marginLeft: '1000px',
    width: '100%'
  }
});

export default function BasicTable() {
  const [offers, setOffers] = useState<any[]>([]); // TODO fix any
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const tableRef = useRef<HTMLDivElement>();

  const handleScroll = useCallback((e: React.ChangeEvent<any>) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop === scrollHeight) {
      setSkip(offers.length);
      setLoading(true);
    }
  }, [offers]);

  useEffect(() => {
    // @ts-ignore
    tableRef.current.onscroll = handleScroll;
  }, [handleScroll, offers]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://praca.bieda.it/api/offers?skip=${skip}`
        )
        const data = await response.json();
        setLoading(false)
        setOffers(offers => [...offers, ...data]);
      } catch (err) {
        setLoading(false)
        setOpenSnackbar(true)
      }

    };
    fetchData();
  }, [skip]);

  const classes = useStyles();

  return (

    <TableContainer
      component={Paper}
      className={classes.wrapper}
      ref={tableRef}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" className={classes.tableCellHeader}>
              Position
            </TableCell>
            <TableCell align="right" className={classes.tableCellHeader}>
              Salary
            </TableCell>
            <TableCell align="right" className={classes.tableCellHeader}>
              Location
            </TableCell>
            <TableCell align="right" className={classes.tableCellHeader}>
              Company
            </TableCell>
            <TableCell align="right" className={classes.tableCellHeader}>
              Source
            </TableCell>
            <TableCell align="right" className={classes.tableCellHeader}>
              Create date
            </TableCell>
            <TableCell align="right" className={classes.tableCellHeader}>
              Apply
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {openSnackbar ? <Snackbar anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
            open={openSnackbar}
            autoHideDuration={10000}
            onClose={() => setOpenSnackbar(false)}
            message="Failed to load data"
            action={
              <>
                <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpenSnackbar(false)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          /> : null}
          {offers.map((offer) => (
            <TableRow key={offer._id}>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableCellContent}
              >
                {offer.position}
              </TableCell>
              <TableCell align="right" className={classes.tableCellContent}>
                {offer.salary}
              </TableCell>
              <TableCell align="right" className={classes.tableCellContent}>
                {offer.location}
              </TableCell>
              <TableCell align="right" className={classes.tableCellContent}>
                {offer.company}
              </TableCell>
              <TableCell align="right" className={classes.tableCellContent}>
                {offer.source}
              </TableCell>
              <TableCell align="right" className={classes.tableCellContent}>
                {format(new Date(offer.createdAt), 'dd/MM/yyyy - H:m')}
              </TableCell>
              <TableCell align="right" className={classes.tableCellContent}>
                <NextWeekIcon
                  className={classes.applyIcon}
                  fontSize="large"
                  onClick={() => window.open(offer.url)}
                />
              </TableCell>
            </TableRow>
          ))}
          {loading ?
            <TableRow className={classes.spinnerContainer}>
              <CircularProgress />
            </TableRow> : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
