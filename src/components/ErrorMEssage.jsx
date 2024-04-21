import React from 'react'

const ErrorMEssage = ({message}) => {
  return (
    <div className='error-message'>
        <p>{message}</p>
    </div>
  );
};

export default ErrorMEssage;