import React, { useState } from 'react';
import {
  PapperBlock
} from 'dan-components';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from 'tss-react/mui';
import Button from '@mui/material/Button';
import axios from 'axios';
import Input from '@mui/material/Input';

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between', // Space between left and right sections
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  leftSection: {
    flex: 1, // Takes up 50% of the container width
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  rightSection: {
    flex: 1, // Takes up 50% of the container width
  },
  formControl: {
    minWidth: 120,
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
    '& .MuiInputBase-root': {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      padding: theme.spacing(1),
      height: 'auto',
      userSelect: 'text', // Ensures text can be selected
      cursor: 'text', // Ensures cursor remains as text
    },
    '& .MuiInputLabel-root': {
      lineHeight: '1.5rem',
    },
  },
}));

function ChangePassword() {
  const {
    classes
  } = useStyles();

  const [emailInput, setEmail] = useState('');
  const [otpInput, setOTP] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [confirmPasswordInput, setConfirmPassword] = useState('');

  const [showInputEmailForm, setshowInputEmailForm] = useState(true);
  const [showInputOTPForm, setshowInputOTPForm] = useState(false);
  const [showInputPasswordForm, setshowInputPasswordForm] = useState(false);
  
  const [accessToken, setAccessToken] = useState('');


  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };

  const handleChangeOTP = event => {
    setOTP(event.target.value);
  };
 
  const handleChangePassword = event => {
    setPassword(event.target.value);
  };
  
  const handleChangeConfirmPassword = event => {
    setConfirmPassword(event.target.value);
  };



  const handleInputEmail = async () => {

    if (!emailInput) {
      alert('Please input your Email!');
      return;
    }
    
    const requestData = {
      email: emailInput
    };

    try {
      const response = await axios.post(
        'https://arifbackend-upm3c5mlxq-et.a.run.app/Auth/RequestOtpEmail',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
          },
        }
      );
      //alert('Sukses Kirim Email OTP');
      alert(response.data.message);
      setEmail(emailInput);
      setshowInputEmailForm(false);
      setshowInputOTPForm(true);
      setshowInputPasswordForm(false);
    } catch (error) {
      console.error('Error during Kirim Email OTP:', error);
      alert('Error during Kirim Email OTP', error);
    } finally {
      console.log('Finally block');
    }
  };

  const handleInputOTP = async () => {

    if (!otpInput) {
      alert('Please input your OTP!');
      return;
    }
    
    const requestData = {
      email: emailInput,
      otp: otpInput
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
      alert('Sukses Verify OTP');
      setAccessToken(response.data.accessToken);
      setEmail(emailInput);
      setOTP(otpInput);
      setshowInputEmailForm(false);
      setshowInputOTPForm(false);
      setshowInputPasswordForm(true);
    } catch (error) {
      console.error('Error during Verify OTP:', error);
      alert('Error during Verify OTP', error);
    } finally {
      console.log('Finally block');
    }
  };

  const handleInputPassword = async () => {

    if (!passwordInput) {
      alert('Please input your New Password!');
      return;
    }

    if (!confirmPasswordInput) {
        alert('Please input your Confirm Password!');
        return;
    }
    
    const requestData = {
      password: passwordInput,
      confirmPassword: confirmPasswordInput,
    };

    try {
      const response = await axios.post(
        'https://arifbackend-upm3c5mlxq-et.a.run.app/Auth/UpdatePassword',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken + '',
          },
        }
      );
      //alert('Sukses Update Password');
      alert(response.data.message);
      setEmail(emailInput);
      setOTP(otpInput);
      setOTP(passwordInput);
      setshowInputEmailForm(false);
      setshowInputOTPForm(false);
      setshowInputPasswordForm(false);
      window.location.href = '/app/SpeechToTextFile';
    } catch (error) {
      console.error('Error during Update Password:', error);
      alert('Error during Update Password', error);
    } finally {
      console.log('Finally block');
    }
  };


  return (
    <div>

    {showInputEmailForm && (
      <PapperBlock title="Masukkan E-mail Anda" icon="ion-ios-images-outline" whiteBg desc="Pastikan E-mail anda sudah terdaftar!">
        <div className={classes.container}>
          <div className={classes.leftSection}>
            <form className={classes.leftSection} autoComplete="off">
              <FormControl size="large" variant="standard" className={classes.formControl}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" value={emailInput} onChange={handleChangeEmail} />
              </FormControl>
            </form>
            <br/>           
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                onClick={handleInputEmail}
                color="secondary"
              >
                Submit E-mail
              </Button>         

          </div>
  
        </div>
      </PapperBlock>
    )}


    {showInputOTPForm && (
      <PapperBlock title="Masukkan OTP Anda" icon="ion-ios-images-outline" whiteBg desc="Cek E-mail anda untuk melihat Kode OTP!">
        <div className={classes.container}>
          <div className={classes.leftSection}>
            <form className={classes.leftSection} autoComplete="off">
              <FormControl size="large" variant="standard" className={classes.formControl}>
                <InputLabel htmlFor="otp">OTP</InputLabel>
                <Input id="otp" value={otpInput} onChange={handleChangeOTP} />
              </FormControl>
            </form>
            <br/>           
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                onClick={handleInputOTP}
                color="secondary"
              >
                Submit OTP
              </Button>         

          </div>
  
        </div>
      </PapperBlock>
    )}


    {showInputPasswordForm && (
      <PapperBlock title="Masukkan Password Baru Anda" icon="ion-ios-images-outline" whiteBg desc="Pastikan Password sama dengan Confirm Password!">
        <div className={classes.container}>
          <div className={classes.leftSection}>
            <form className={classes.leftSection} autoComplete="off">
              <FormControl size="large" variant="standard" className={classes.formControl}>
                <InputLabel htmlFor="password">New Password</InputLabel>
                <Input type="password" id="password" value={passwordInput} onChange={handleChangePassword} />
              </FormControl>
              <FormControl size="large" variant="standard" className={classes.formControl}>
                <InputLabel htmlFor="confirmPassword">Confirm New Password</InputLabel>
                <Input type="password" id="confirmPassword" value={confirmPasswordInput} onChange={handleChangeConfirmPassword} />
              </FormControl>
            </form>
            <br/>           
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                onClick={handleInputPassword}
                color="secondary"
              >
                Update Your Password
              </Button>         

          </div>
  
        </div>
      </PapperBlock>
    )}


    </div>
  );
}

export default ChangePassword;
