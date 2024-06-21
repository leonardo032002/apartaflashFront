import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import './recibo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export const Recibo = () => {
  const [recibos, setRecibos] = useState([]);
  const [newRecibo, setNewRecibo] = useState({
    fechaVencimiento: '',
    pagado: false,
    precio: 0,
    cliente: {
      id: 0,
    },
  });
  const [clientes, setClientes] = useState([]);
  const [showRecibos, setShowRecibos] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'clienteId') {
      const selectedCliente = clientes.find(cliente => cliente.id === parseInt(value, 10));
      setNewRecibo({
        ...newRecibo,
        cliente: selectedCliente || { id: 0 },
      });
    } else {
      setNewRecibo({
        ...newRecibo,
        [name]: value,
      });
    }
  };

  const handleCreateRecibo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/Recibo/', newRecibo);
      if (response.status === 201) {
        console.log('Recibo creado exitosamente');
        setNewRecibo({
          fechaVencimiento: '',
          pagado: false,
          precio: 0,
          cliente: {
            id: 0,
          },
        });
        fetchRecibos();
        setShowRecibos(true);
      }
    } catch (error) {
      console.error('Error al crear el recibo', error);
    }
  };

  const fetchRecibos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Recibo/');
      setRecibos(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de recibos', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Clientes/');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de clientes', error);
    }
  };

  const handleBorrarRecibo = async (reciboId, reciboPrecio) => {
    const confirmDelete = window.confirm(`¿Seguro que deseas borrar el recibo con ID ${reciboId} y precio $${reciboPrecio}?`);

    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/Recibo/${reciboId}`);
        if (response.status === 204) {
          console.log('Recibo borrado exitosamente');
          fetchRecibos();
        }
      } catch (error) {
        console.error('Error al borrar el recibo', error);
      }
    }
  };

  const handleDescargarRecibo = async (reciboId) => {
    try {
      // Primera solicitud para obtener los datos básicos del recibo
      const response = await axios.get(`http://localhost:8080/Recibo/${reciboId}`);
      console.log('Respuesta del servidor:', response.data);

      const { fechaGenerado, fechaVencimiento, precio, cliente, pagado } = response.data;

      let clienteInfo = {};

      // Si hay información del cliente, realiza una segunda solicitud para obtener los detalles completos del cliente
      if (cliente && cliente.id) {
        const clienteResponse = await axios.get(`http://localhost:8080/Clientes/${cliente.id}`);
        clienteInfo = clienteResponse.data;
      }

      const doc = new jsPDF();

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);

      doc.text(`Recibo #${reciboId}`, 10, 20);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(14);
      doc.text(`Fecha de Generación: ${fechaGenerado}`, 10, 30);
      doc.text(`Fecha de Vencimiento: ${fechaVencimiento}`, 10, 40);
      doc.text(`Precio: $${precio}`, 10, 50);

      if (clienteInfo && clienteInfo.nombre && clienteInfo.cedula) {
        doc.text(`Cliente: ${clienteInfo.nombre} - ${clienteInfo.cedula}`, 10, 60);
      } else {
        doc.text('Cliente: No disponible', 10, 60);
      }

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 128, 0); // Color verde para indicar pagado
      doc.text(pagado ? 'Estado: Pagado' : 'Estado: Pendiente de pago', 10, 70);

      doc.save(`Recibo_${reciboId}.pdf`);
    } catch (error) {
      console.error('Error al descargar el recibo como PDF', error);
    }
  };

  useEffect(() => {
    fetchRecibos();
    fetchClientes();
  }, []);

  return (
    <div className="recibo-container">
      <h1 className="recibo-title">Recibos</h1>
      <div className="navigation">
        <div className="button-container">
          <button onClick={() => setShowRecibos(false)} className="recibo-button">
            Crear Recibo
          </button>
          <button
            onClick={() => {
              setShowRecibos(true);
              fetchRecibos();
            }}
            className="recibo-button"
          >
            Lista de Recibos
          </button>
        </div>
      </div>
    
      {showRecibos === true && (
        <div>
          <h2>Lista de Recibos</h2>
          <ul className="recibo-list">
            {recibos.map((recibo) => (
              <li key={recibo.id} className="recibo-item">
                <div className="recibo-info">
                  ID del Recibo: {recibo.id}, Vencimiento: {recibo.fechaVencimiento}, Precio: {recibo.precio}, ID del Cliente: {recibo.cliente ? recibo.cliente.id : 'No disponible'}
                </div>
                <div className="recibo-buttons">
                  <button onClick={() => handleBorrarRecibo(recibo.id, recibo.precio)} className="recibo-button">
                    Borrar Recibo
                  </button>
                  <button onClick={() => handleDescargarRecibo(recibo.id)} className="recibo-button">
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showRecibos === false && (
        <div>
          <h2>Crear Recibo</h2>
          <form className="recibo-form" onSubmit={handleCreateRecibo}>
            <label htmlFor="fechaVencimiento">Vencimiento:</label>
            <input
              type="date"
              id="fechaVencimiento"
              name="fechaVencimiento"
              value={newRecibo.fechaVencimiento}
              onChange={handleInputChange}
            />

            <label htmlFor="precio">Precio:</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={newRecibo.precio}
              onChange={handleInputChange}
            />

            <label htmlFor="clienteId">Cliente:</label>
            <select
              id="clienteId"
              name="clienteId"
              value={newRecibo.cliente.id}
              onChange={handleInputChange}
            >
              <option value={0}>Selecciona un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  ID: {cliente.id} - {cliente.nombre} - {cliente.cedula}
                </option>
              ))}
            </select>

            <button type="submit" className="recibo-button">
              Registrar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
