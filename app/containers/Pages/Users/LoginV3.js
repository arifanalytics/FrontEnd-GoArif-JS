import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { LoginFormV3 } from 'dan-components';
import useStyles from 'dan-components/Forms/user-jss';

function LoginV3() {
  const title = brand.name + ' - Login Version 3';
  const description = brand.desc;
  const { classes } = useStyles();
  return (
    <div className={classes.rootFull}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.fullFormWrap}>
          <LoginFormV3 />
        </div>
      </div>
    </div>
  );
}

export default LoginV3;
