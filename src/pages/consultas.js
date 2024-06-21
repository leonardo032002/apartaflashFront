import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './consultas.css'; // Importa tus estilos CSS aquí

export const Consultas = () => {
  const [resultados, setResultados] = useState(null);
  const [nombreCliente, setNombreCliente] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const buscarClienteConAptoYRecibos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8080/Clientes/buscar?nombreCliente=${nombreCliente}`);
      const data = response.data;
      setResultados(data);
    } catch (error) {
      console.error('Error al buscar cliente:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="consulta-container">
      <input
        type="text"
        value={nombreCliente}
        onChange={(e) => setNombreCliente(e.target.value)}
        placeholder="Ingrese el nombre del cliente"
      />
      <button className="button" onClick={buscarClienteConAptoYRecibos}>
        Buscar Cliente
      </button>

      {isLoading && <p>Cargando...</p>}

      {resultados && (
  <div className="resultados-container">
    <h2>Resultados</h2>
    <div className="resultado-row">
      {resultados.map((resultado, index) => (
        <div key={index} className="resultado-item">
          <p>Nombre del Cliente: {resultado[0]}</p>
          <p>Nombre del Apartamento: {resultado[1]}</p>
          <p>Fecha de Generación del Recibo: {resultado[2]}</p>
          <p>Fecha de Vencimiento del Recibo: {resultado[3]}</p>
          <p>Precio del Recibo: {resultado[4]}</p>
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  );
};

export default Consultas;
