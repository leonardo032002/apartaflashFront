import React, { useState } from 'react';
import './creditos.css';
import Welcome from '../welcome'; // Importa el componente de bienvenida

export const Creditos = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleMensajeChange = (e) => {
    setMensaje(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nombre:', nombre);
    console.log('Mensaje:', mensaje);
  };

  const toggleWelcome = () => {
    setShowWelcome(!showWelcome);
  };

  return (
    <div className="creditos-container">
      <h1 className="creditos-title">Créditos</h1>
      <button onClick={toggleWelcome}>
        {showWelcome ? 'Cerrar Bienvenida' : 'Mostrar Bienvenida'}
      </button>
      <div className="creditos-description">
        <p>ApartaFlash simplifica la gestión de propiedades. Desarrollado por Leonardo y Yonares.</p>
      </div>
      <div className="creditos-content">
        <div className="creditos-item">
          <h2>Leonardo</h2>
          <p>Diseñador y Desarrollador Frontend y Backend</p>
          <p>Correo electrónico: leonardo@example.com</p>
        </div>
        <div className="creditos-item">
          <h2>Yonares</h2>
          <p>Desarrollador FullStack</p>
          <p>Correo electrónico: yonares@example.com</p>
        </div>
      </div>

      <div className="creditos-form">
        <h3>Contáctanos</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={handleNombreChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={mensaje}
              onChange={handleMensajeChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
      {showWelcome && <Welcome />}
    </div>
  );
};
