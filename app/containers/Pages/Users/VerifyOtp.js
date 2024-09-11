import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { VerifyOtpForm } from 'dan-components';
import useStyles from 'dan-components/Forms/user-jss';

function VerifyOtp() {
  const title = brand.name + ' - VerifyOtp';
  const description = brand.desc;
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <VerifyOtpForm />
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
