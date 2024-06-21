// Gestiona.js
import React from 'react';
import './gestiona.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faReceipt, faSearch } from '@fortawesome/free-solid-svg-icons';

const Gestiona = () => {
  return (
    <div className="gestiona-container">
      <h1 className="card-title">Gestiona tus opciones</h1>
      <div className="card-container">
        <div className="card">
          <Link to="/admin" className="card-link">
            <FontAwesomeIcon icon={faHome} size="2x" />
            Apto
            <div className="card-text">Gestiona tus propiedades</div>
          </Link>
        </div>
        <div className="card">
          <Link to="/cliente" className="card-link">
            <FontAwesomeIcon icon={faUsers} size="2x" />
            Cliente
            <div className="card-text">Gestiona a los clientes de tus propiedades</div>
          </Link>
        </div>
        <div className="card">
          <Link to="/recibo" className="card-link">
            <FontAwesomeIcon icon={faReceipt} size="2x" />
            Recibo
            <div className="card-text">Gestiona y revisa los recibos</div>
          </Link>
          
        </div>
        
        <div className="card">
          <Link to="/consultas" className="card-link">
            <FontAwesomeIcon icon={faSearch} size="2x" />
            Consultas
            <div className="card-text">Gestiona a los clientes de tus propiedades</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gestiona;
