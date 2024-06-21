import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import './loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading">
        <FontAwesomeIcon icon={faSync} spin size="3x" />
      </div>
      <div className="loading-text">
        ApartaFlash Cargando... Waiting
      </div>
    </div>
  );
}

export default Loading;

