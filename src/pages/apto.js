import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cliente.css';

export const Apto = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [aptoList, setAptoList] = useState([]);
  const [apto, setApto] = useState({
    nombre: '',
    // Otros campos relevantes para Apto
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchAptos();
  }, []);

  const fetchAptos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Aptos/');
      setAptoList(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de aptos', error);
    }
  };

  const handleRegistroClick = () => {
    setApto({
      nombre: '', // Puedes restablecer otros campos aquí
    });
    setCurrentPage('create');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApto({
      ...apto,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/Aptos/', apto);
      if (response.status === 201) {
        setSuccessMessage('Apto creado con éxito');

        setTimeout(() => {
          setSuccessMessage('');
        }, 3500);

        handleRegistroClick();
      }
    } catch (error) {
      setSuccessMessage('Debe comenzar con: apto ');
      console.error('Error al crear el apto', error);
    }
  };

  const handleBorrarApto = async (aptoId, aptoNombre) => {
    const confirmDelete = window.confirm(`¿Seguro que deseas borrar el apto con ID ${aptoId} y nombre ${aptoNombre}?`);

    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/Aptos/${aptoId}`);
        if (response.status === 204) {
          console.log('Apto borrado exitosamente');
          fetchAptos();
        }
      } catch (error) {
        console.error('Error al borrar el apto', error);
      }
    }
  };

  return (
    <div id="cliente-container">
      <h1 id="cliente-title">Registro de Aptos</h1>
      <div className="navigation">
        <button
          onClick={() => {
            if (currentPage !== 'create') {
              setCurrentPage('create');
            } else {
              setCurrentPage(null);
            }
          }}
        >
          {currentPage === 'create' ? 'Cerrar Registro' : 'Registrar Apto'}
        </button>
        <button
          onClick={() => {
            if (currentPage !== 'list') {
              setCurrentPage('list');
              fetchAptos();
            } else {
              setCurrentPage(null);
            }
          }}
        >
          {currentPage === 'list' ? 'Cerrar Lista' : 'Obtener Aptos'}
        </button>
      </div>
      {currentPage === 'create' && (
        <div id="cliente-form">
          <h2>Registrar Apto</h2>
          {successMessage && (
            <div id="cliente-success-message">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={apto.nombre}
              onChange={handleInputChange}
            />
            <button type="submit" id="cliente-button">Registrar Apto</button>
          </form>
        </div>
      )}
      {currentPage === 'list' && (
        <div>
          <h2>Lista de Aptos</h2>
          <ul id="cliente-list">
            {aptoList.map((aptoItem) => (
              <li id="cliente-item" key={aptoItem.id}>
                <div className="apto-info">
                  <strong>Nombre del Apto:</strong> {aptoItem.nombre}
                </div>
                <button onClick={() => handleBorrarApto(aptoItem.id, aptoItem.nombre)} id="cliente-button">
                  Borrar Apto
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
