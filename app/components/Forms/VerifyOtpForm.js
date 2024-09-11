import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
import axios from 'axios'; // Add axios for HTTP requests

// validation functions
const validationSchema = yup.object({
});

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} />; // eslint-disable-line
});

function VerifyOtpForm() {
  const { classes, cx } = useStyles();
  const deco = useSelector((state) => state.ui.decoration);

  const [emaillink, setemail] = useState('');
  const [otplink, setotp] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      termsAndConditions: false
    },
    validationSchema,
    onSubmit: async () => {

      const requestData = {
        email: emaillink,
        otp: otplink,
      };

      try {
        const response = await axios.post(
          'https://arifbackend-upm3c5mlxq-et.a.run.app/Auth/VerifyOtp',
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
            },
          }
        );
        console.log('sukses Verify OTP');
        alert('Sukses Verify OTP');
        alert(response.data.message);
      } catch (error) {
        console.error('Error during verify otp:', error);
        alert('Error during verify otp. Please try again.');
      } finally {
        console.log('Finally block');
      }

    },
  });

  const [tab, setTab] = useState(0);
 
  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  const handleChangeEmail = event => {
    setemail(event.target.value);
  };
  const handleChangeOtp = event => {
    setotp(event.target.value);
  };

  const handleChangeTab = (event, value) => {
    setTab(value);
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
          Verify OTP
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          Lorem ipsum dolor sit amet
        </Typography>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label="With Email" />
          <Tab label="With Social Media" />
        </Tabs>
        {tab === 0 && (
          <section className={classes.formWrap}>
            <form onSubmit={formik.handleSubmit}>
              <div>

                <FormControl variant="standard" className={classes.formControl}>
                  <Input id="email" value={emaillink} onChange={handleChangeEmail} />
                </FormControl>

                <FormControl variant="standard" className={classes.formControl}>
                  <Input id="otp" value={otplink} onChange={handleChangeOtp} />
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

export default VerifyOtpForm;