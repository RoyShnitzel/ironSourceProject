import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useFormik } from "formik";
import ArrayForm from "./arrayForm";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    overflow: "auto",
    maxHeight: "80%",
  };
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.priceUSD) {
    errors.priceUSD = "Required";
  } else if (isNaN(values.priceUSD)) {
    errors.priceUSD = "Must be a number";
  }

  return errors;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditModal({ open, setOpen, data, fetchData }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [countries, setCountries] = useState([]);
  const [apps, setApps] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: `${data.name}`,
      priceUSD: `${data.priceUSD}`,
      status: `${data.status}`,
    },
    validate,
    onSubmit: async (values) => {
      const updateData = { ...values, targeting: { countries, apps } };
      console.log(updateData);
      await axios.patch(`./api/campaign/${data.id}`, { updateData });
      fetchData();
      setOpen(false);
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setCountries(data.targeting.countries);
    setApps(data.targeting.apps);
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h1>Edit Campaign</h1>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="name">Campaign Name</label>
              <br />
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <br />
              {formik.errors.name ? (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              ) : null}
              <br />
              <label htmlFor="priceUSD">Price USD</label>
              <br />
              <input
                id="priceUSD"
                name="priceUSD"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.priceUSD}
              />
              <br />
              {formik.errors.priceUSD ? (
                <div style={{ color: "red" }}>{formik.errors.priceUSD}</div>
              ) : null}
              <br />
              <label htmlFor="status">Status</label>
              <br />
              <select
                id="status"
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
            <br />
            <ArrayForm
              data={countries}
              setData={setCountries}
              name={"countries"}
            />
            <br />
            <ArrayForm data={apps} setData={setApps} name={"apps"} />
            <br />
            <br />
            <button style={{ width: "80%" }} type="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
