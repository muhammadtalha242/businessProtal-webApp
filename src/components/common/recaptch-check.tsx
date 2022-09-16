import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

//Site 6LdRHfchAAAAAFx1f9CjokQGpu3apwcNpeQtJ6JM
//Secret 6LdRHfchAAAAAKViFe030_o48l429gxmxIWTif7t

const REACT_APP_SITE_KEY = '6LdRHfchAAAAAFx1f9CjokQGpu3apwcNpeQtJ6JM';

const ReCAPTCHACheck = () => {
  const recaptchaRef = React.useRef(null);
  const handleSubmit = () => {
    // apply to form data
  };

  return (
       <ReCAPTCHA sitekey={REACT_APP_SITE_KEY} ref={recaptchaRef} onChange={handleSubmit}/>
  );
};
export default ReCAPTCHACheck;
