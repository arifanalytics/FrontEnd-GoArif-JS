import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import AllInclusive from '@mui/icons-material/AllInclusive';
import Brightness5 from '@mui/icons-material/Brightness5';
import People from '@mui/icons-material/People';
import Icon from '@mui/material/Icon';
import useMediaQuery from '@mui/material/useMediaQuery';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import { useSelector } from 'react-redux';
import { ErrorMessage, useFormik } from 'formik';
import * as yup from 'yup';
import Input from '@mui/material/Input';
import axios from 'axios';
import useStyles from './user-jss';

const validationSchema = yup.object({
});

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} />; // eslint-disable-line
});

function LoginForm() {
  const { classes, cx } = useStyles();
  const deco = useSelector((state) => state.ui.decoration);

  const tab = 0;

  const [emailInput, setemail] = useState('');
  const [passwordInput, setpassword] = useState('');

  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  const handleChangeEmail = event => {
    setemail(event.target.value);
  };
  const handleChangePassword = event => {
    setpassword(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async () => {
      const requestData = {
        email: emailInput,
        password: passwordInput,
      };

      try {
        const response = await axios.post(
          'https://arifbackend-upm3c5mlxq-et.a.run.app/Auth/Login',
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer YOUR_ACCESS_TOKEN',
            },
          }
        );
        console.log('Sukses login');
        alert('Sukses login');
        console.log(response.data.accessToken);
        window.location.href = '/app/SpeechToTextFile';
      } catch (error) {
        console.error('Error during login:', ErrorMessage);
        alert('Error during login', ErrorMessage);
      } finally {
        console.log('Finally block');
      }
    },
  });

  return (
    <Fragment>
      {!mdUp && (
        <NavLink to="/" className={cx(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      )}
      <Paper className={cx(classes.paperWrap, deco && classes.petal)}>
        {!mdDown && (
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </NavLink>
            <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/register">
              <Icon className={classes.icon}>arrow_forward</Icon>
              Don&apos;t have account ?
            </Button>
          </div>
        )}
        <Typography variant="h4" className={classes.title} gutterBottom>
          Login
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          Input your Email & Password
        </Typography>

        {tab === 0 && (
          <section className={classes.formWrap}>
            <form onSubmit={formik.handleSubmit}>
              <div>

                <FormControl variant="standard" className={classes.formControl}>
                  <Input id="email" placeholder="E-mail" value={emailInput} onChange={handleChangeEmail} />
                </FormControl>

                <FormControl variant="standard" className={classes.formControl}>
                  <Input type="password" id="password" placeholder="Password" value={passwordInput} onChange={handleChangePassword} />
                </FormControl>

              </div>

              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>
                  Submit
                  <ArrowForward className={cx(classes.rightIcon, classes.iconSmall)} />
                </Button>
              </div>
            </form>
          </section>
        )}
        {tab === 1 && (
          <section className={classes.socmedFull}>
            <Button fullWidth variant="outlined" size="large" className={classes.redBtn} type="button">
              <AllInclusive className={cx(classes.leftIcon, classes.iconSmall)} />
              Socmed 1
            </Button>
            <Button fullWidth variant="outlined" size="large" className={classes.blueBtn} type="button">
              <Brightness5 className={cx(classes.leftIcon, classes.iconSmall)} />
              Socmed 2
            </Button>
            <Button fullWidth variant="outlined" size="large" className={classes.cyanBtn} type="button">
              <People className={cx(classes.leftIcon, classes.iconSmall)} />
              Socmed 3
            </Button>
          </section>
        )}
      </Paper>
    </Fragment>
  );
}

export default LoginForm;
