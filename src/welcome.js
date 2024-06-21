import React from 'react';
import './welcome.css'; // Importa el archivo CSS para el estilo del componente

function Welcome() {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">¡Bienvenido a ApartaFlash!</h1>
      <p className="welcome-description">
        Estamos aquí para simplificar la gestión de propiedades.
      </p>
      <p className="welcome-description">
        Descubre nuestras características y cómo podemos ayudarte:
      </p>
      <ul className="welcome-list">
        <li><strong>Inicio:</strong> Explora los objetivos de ApartaFlash.</li>
        <li><strong>Gestiona:</strong> Administra propiedades, clientes y recibos.</li>
        <li><strong>Créditos:</strong> Reconocimiento a nuestros desarrolladores.</li>
      </ul>
    </div>
  );
}

export default Welcome;
