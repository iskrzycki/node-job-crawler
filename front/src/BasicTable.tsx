import React, { useState, useEffect, useRef, useCallback } from "react";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import CircularProgress from "@material-ui/core/CircularProgress";
import { format } from 'date-fns';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import "./BasicTable.css";


export default function BasicTable() {
  const [offers, setOffers] = useState<any[]>([]); // TODO fix any
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  
  const tableRef = useRef<HTMLDivElement>(null);

  const { t, i18n } = useTranslation();


  //@ts-ignore
  const changeLanguage = (ln) => {
    return () => {
      i18n.changeLanguage(ln)
    }
  }

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

  return (
    
    <div className="TableWrapper" ref={tableRef}>
        <nav className="LanguageBar">
          <Button variant="outlined" onClick={changeLanguage("en")}>EN</Button>
          <Button variant="outlined" onClick={changeLanguage("pl")}>PL</Button>
        </nav>
        <table>  
          <thead>
            <tr>
              <th scope="col">{t("position")}</th>
              <th scope="col">{t("salary")}</th>
              <th scope="col">{t("location")}</th>
              <th scope="col">{t("company")}</th>
              <th scope="col">{t("source")}</th>
              <th scope="col">{t("create_date")}</th>
              <th scope="col">{t("apply")}</th>
            </tr>
          </thead>
          <tbody>
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
              <tr key={offer._id} className="TableRow">
                <td data-label={t("position")}>{offer.position ? offer.position : "?"}</td>
                <td data-label={t("salary")}>{offer.salary}</td>
                <td data-label={t("location")}>{offer.location}</td>
                <td data-label={t("company")}>{offer.company}</td>
                <td data-label={t("source")}>{offer.source}</td>
                <td data-label={t("create_date")}>{format(new Date(offer.createdAt), 'dd/MM/yyyy - H:m')}</td>
                <td data-label={t("apply")}>
                  <NextWeekIcon
                    className="ApplyIcon"
                    fontSize="large"
                    onClick={() => window.open(offer.url)}/>
                  </td>
              </tr>
            ))}
            {loading ?
                <tr>
                  <CircularProgress />
                </tr> : null}
          </tbody>
      </table>
      </div>
  );
}