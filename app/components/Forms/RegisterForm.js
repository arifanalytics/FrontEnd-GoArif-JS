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
import { useFormik } from 'formik';
import * as yup from 'yup';
import useStyles from './user-jss';
import Input from '@mui/material/Input';
import axios from 'axios';

const validationSchema = yup.object({
});

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} />; // eslint-disable-line
});

function RegisterForm() {
  const { classes, cx } = useStyles();
  const deco = useSelector((state) => state.ui.decoration);

  const [emailInput, setemail] = useState('');
  const [usernameInput, setusername] = useState('');
  const [localIANATimeZoneInput, setlocalIANATimeZone] = useState('');
  const [passwordInput, setpassword] = useState('');
  const [confirmPasswordInput, setconfirmPassword] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      termsAndConditions: false
    },
    validationSchema,
    onSubmit: async () => {

      const requestData = {
        email: emailInput,
        username: usernameInput,
        password: passwordInput,
        confirmPassword: confirmPasswordInput,
        localIANATimeZone: localIANATimeZoneInput,
      };

      try {
        const response = await axios.post(
          'https://arifbackend-upm3c5mlxq-et.a.run.app/Auth/Register',
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
            },
          }
        );
        console.log('sukses register');
        alert(response.data.message);
        window.location.href = '/login';
      } catch (error) {
        console.error('Error during register:', error);
        alert('Error during register. Please try again.');
      } finally {
        console.log('Finally block');
      }

    },
  });

  const tab = 0;
 
  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  const handleChangeEmail = event => {
    setemail(event.target.value);
  };
  const handleChangeUsername = event => {
    setusername(event.target.value);
  };
  const handleChangePassword = event => {
    setpassword(event.target.value);
  };
  const handleChangeConfirmPassword = event => {
    setconfirmPassword(event.target.value);
  };
  const handleChangeLocalIANATimeZone = event => {
    setlocalIANATimeZone(event.target.value);
  };

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
            <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
              <Icon className={classes.icon}>arrow_forward</Icon>
              Already have account ?
            </Button>
          </div>
        )}
        <Typography variant="h4" className={classes.title} gutterBottom>
          Register
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          &nbsp;
        </Typography>

        {tab === 0 && (
          <section className={classes.formWrap}>
            <form onSubmit={formik.handleSubmit}>
              <div>

                <FormControl variant="standard" className={classes.formControl}>
                  <Input id="email" placeholder="E-mail" value={emailInput} onChange={handleChangeEmail} />
                </FormControl>

                <FormControl variant="standard" className={classes.formControl}>
                  <Input id="username" placeholder="Username" value={usernameInput} onChange={handleChangeUsername} />
                </FormControl>

                <FormControl variant="standard" className={classes.formControl}>
                  <Input type="password" id="password"  placeholder="Password" value={passwordInput} onChange={handleChangePassword} />
                </FormControl>

                <FormControl variant="standard" className={classes.formControl}>
                  <Input type="password" id="confirmPassword"  placeholder="Re-Type Password" value={confirmPasswordInput} onChange={handleChangeConfirmPassword} />
                </FormControl>

                <FormControl variant="standard" className={classes.formControl}>
                  <Input id="localIANATimeZone" placeholder="Local IANA TimeZone" value={localIANATimeZoneInput} onChange={handleChangeLocalIANATimeZone} />
                </FormControl>

              </div>

              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>
                  Continue
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

export default RegisterForm;