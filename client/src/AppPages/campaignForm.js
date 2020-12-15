import React, { useState } from "react";
import { useFormik } from "formik";
import ArrayForm from "../Components/arrayForm";
import axios from "axios";
import { useHistory } from "react-router-dom";

// validation conditions
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

function CampaignForm() {
  const [countries, setCountries] = useState([]);
  const [apps, setApps] = useState([]);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      priceUSD: "",
      status: "active",
    },
    validate,
    onSubmit: async (values) => {
      const data = { ...values, targeting: { countries, apps } };
      console.log(data);
      await axios.post("./api/campaign", { data });
      history.push("/");
    },
  });
  return (
    <div
      style={{
        marginTop: "6%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Add Campaign</h1>
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
        <ArrayForm data={countries} setData={setCountries} name={"countries"} />
        <ArrayForm data={apps} setData={setApps} name={"apps"} />
        <br />
        <br />
        <button style={{ width: "80%" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CampaignForm;
