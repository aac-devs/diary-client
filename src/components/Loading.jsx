import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Loader
        type="TailSpin"
        color="#e91e63"
        height={100}
        width={100}
        // timeout={3000}
      />
    </div>
  );
};

export default Loading;
