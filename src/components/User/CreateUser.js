import { React, useState } from "react";

import { Box, Button, Container, Grid, Typography } from "@material-ui/core";

import joi from "joi-browser";
import axios from "axios";
import { TextInputField } from "../common/TextField";

export default function CreateUser(props) {
  const [state, setState] = useState({
    data: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      contact_number: "",
    },
    errors: {},
  });

  const schema = {
    first_name: joi.string().min(3).max(30).required().label("First Name"),
    last_name: joi.string().min(3).max(30).required().label("Last Name"),
    email: joi.string().email().required().label("Email"),
    address: joi.string().min(3).max(30).required().label("Address"),
    contact_number: joi.string().length(10).required().label("Phone"),
  };

  const handleOnChange = ({ target }) => {
    const { data, errors } = state;
    const { error } = joi.validate(target.value, schema[target.name], {
      abortEarly: true,
    });
    !error
      ? (errors[target.name] = "")
      : (errors[target.name] = error.details[0].message);
    data[target.name] = target.value;
    setState({ data, errors });
  };

  const validate = () => {
    let errorObj = {};
    let { error } = joi.validate(state.data, schema, { abortEarly: false });

    !error
      ? (errorObj = {})
      : error.details.map((item) => (errorObj[item.path] = item.message));
    return errorObj;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let errors = validate();
    let { data } = state;

    console.log("datadata", data);
    setState({ data, errors });

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      // Logic for conneting Api

      axios
        .post("http://localhost:8000/users", data)
        .then(function (response) {
          console.log(response);
          props.history.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Container maxWidth="md" component={Box} mt={4}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ display: "flex" }}
      >
        <Grid item xs={12} sm={8}>
          <Box>
            <Typography
              variant="h3"
              component={"h2"}
              align="center"
              color="primary"
              gutterBottom
            >
              Create User
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {TextInputField({
                name: "first_name",
                onChange: handleOnChange,
                state,
              })}
            </Grid>
            <Grid item xs={12} sm={6}>
              {TextInputField({
                name: "last_name",
                onChange: handleOnChange,
                state,
              })}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {TextInputField({
                name: "email",
                onChange: handleOnChange,
                state,
              })}
            </Grid>
            <Grid item xs={12} sm={6}>
              {TextInputField({
                name: "contact_number",
                onChange: handleOnChange,
                state,
              })}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              {TextInputField({
                name: "address",
                onChange: handleOnChange,
                multiline: true,
                minRows: 4,
                state,
              })}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={handleOnSubmit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
