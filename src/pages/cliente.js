import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cliente.css';

export const Cliente = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    cedula: 0,
    apto: {
      id: 0,
    },
  });
  const [apartamentos, setApartamentos] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [clienteToUpdate, setClienteToUpdate] = useState(null);

  useEffect(() => {
    fetchClientes();
    fetchApartamentos();
  }, []);

  async function fetchClientes() {
    try {
      const clientesResponse = await axios.get('http://localhost:8080/Clientes/');
      const apartamentosResponse = await axios.get('http://localhost:8080/Aptos/');

      const clientsWithApartments = clientesResponse.data.map(client => {
        const associatedApartment = apartamentosResponse.data.find(apto => apto.id === client.aptoId);
        return {
          ...client,
          associatedApartment,
        };
      });

      setClientes(clientsWithApartments);
    } catch (error) {
      console.error('Error al recuperar la lista de clientes', error);
    }
  }

  async function fetchApartamentos() {
    try {
      const response = await axios.get('http://localhost:8080/Aptos/');
      setApartamentos(response.data);
    } catch (error) {
      console.error('Error al recuperar la lista de apartamentos', error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'aptoId') {
      const selectedApartment = apartamentos.find(apto => apto.id === parseInt(value, 10));
      setCliente({
        ...cliente,
        apto: selectedApartment || { id: 0 },
      });
    } else {
      setCliente({
        ...cliente,
        [name]: value,
      });
    }
  };

  const handleCreateOrUpdateCliente = async (e) => {
    e.preventDefault();
    try {
      if (isUpdateMode) {
        const response = await axios.put(`http://localhost:8080/Clientes/${clienteToUpdate.id}`, {
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          cedula: cliente.cedula,
          apto: {
            id: cliente.apto.id,
          },
        });
        if (response.status === 200) {
          console.log("Cliente actualizado exitosamente");
          setSuccessMessage('Cliente actualizado con éxito');
          setErrorMessage('');
          setCliente({
            nombre: '',
            apellido: '',
            cedula: 0,
            apto: {
              id: 0,
            },
          });
          setClienteToUpdate(null);
          setIsUpdateMode(false);
          fetchClientes();
          setTimeout(() => {
            setSuccessMessage('');
          }, 3500);
        }
      } else {
        const response = await axios.post('http://localhost:8080/Clientes/', {
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          cedula: cliente.cedula,
          apto: {
            id: cliente.apto.id,
          },
        });
        try{
        if (response.status === 201) {
          console.log("Cliente creado exitosamente");
          setSuccessMessage('Cliente creado con éxito');
          setErrorMessage('');
          setCliente({
            nombre: '',
            apellido: '',
            cedula: 0,
            apto: {
              id: 0,
            },
          });
          fetchClientes();
          setTimeout(() => {
            setSuccessMessage('');
          }, 3500);
        }
      }catch(error){
        setSuccessMessage('Cedula cliente existente');
      } 
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        
        console.error('Error al crear o actualizar el cliente', error.response.data);
        setErrorMessage(error.response.data);
        setSuccessMessage('Cliente creado con éxito');
        // Muestra un alert con el mensaje de error
        window.alert(`Error: ${error.response.data}`);
      } else {
        setSuccessMessage('Cedula cliente existente');
        console.error(isUpdateMode ? 'Error al actualizar el cliente' : 'Error al crear el cliente', error);
      }
    }
  };

  const handleBorrarCliente = async (client) => {
    const confirmDeletion = window.confirm(
      `¿Seguro que quiere borrar al cliente con ID: ${client.id}, Nombre: ${client.nombre}, Cédula: ${client.cedula}?`
    );

    if (confirmDeletion) {
      try {
        const response = await axios.delete(`http://localhost:8080/Clientes/${client.id}`);
        if (response.status === 204) {
          console.log('Cliente borrado exitosamente');
          fetchClientes();
        }
      } catch (error) {
        console.error('Error al borrar el cliente', error);
       
      }
    }
  };

  return (
    <div id="cliente-container">
      <h1 id="cliente-title">Registro de Clientes</h1>
      <div className="navigation">
        <button
          onClick={() => {
            if (currentPage !== 'create') {
              setCurrentPage('create');
              setIsUpdateMode(false);
              setErrorMessage('');
            } else {
              setCurrentPage(null);
            }
          }}
        >
          {currentPage === 'create' ? 'Cerrar Registro' : 'Registrar Cliente'}
        </button>
        <button
          onClick={() => {
            if (currentPage !== 'list') {
              setCurrentPage('list');
              fetchClientes();
              setErrorMessage('');
            } else {
              setCurrentPage(null);
            }
          }}
        >
          {currentPage === 'list' ? 'Cerrar Lista' : 'Obtener Clientes'}
        </button>
      </div>
      {currentPage === 'create' && (
        <div id="cliente-form">
          <h2>{isUpdateMode ? 'Actualizar Cliente' : 'Registrar Cliente'}</h2>
          {successMessage && (
            <div id="cliente-success-message">{successMessage}</div>
          )}
          {errorMessage && (
            <div id="cliente-error-message">{errorMessage}</div>
          )}
          <form onSubmit={handleCreateOrUpdateCliente}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={cliente.nombre}
              onChange={handleInputChange}
            />

            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={cliente.apellido}
              onChange={handleInputChange}
            />

            <label htmlFor="cedula">Cédula:</label>
            <input
              type="number"
              id="cedula"
              name="cedula"
              value={cliente.cedula}
              onChange={handleInputChange}
            />

            <label htmlFor="aptoId">Apartamento:</label>
            <select
              id="aptoId"
              name="aptoId"
              value={cliente.apto.id}
              onChange={handleInputChange}
            >
              <option value={0}>Selecciona un apartamento</option>
              {apartamentos.map(apto => (
                <option key={apto.id} value={apto.id} disabled={!apto.disponible}>
                  ID: {apto.id} - {apto.nombre} ({apto.disponible ? 'Disponible' : 'No disponible'})
                </option>
              ))}
            </select>

            <button type="submit" id="cliente-button">
              {isUpdateMode ? 'Actualizar Cliente' : 'Registrar Cliente'}
            </button>
            {isUpdateMode && (
              <button
                type="button"
                onClick={() => {
                  setIsUpdateMode(false);
                  setClienteToUpdate(null);
                  setErrorMessage('');
                }}
              >
                Cancelar Actualización
              </button>
            )}
          </form>
        </div>
      )}
      {currentPage === 'list' && (
        <div>
          <h2>Lista de Clientes</h2>
          <ul id="cliente-list">
            {clientes.map((client) => (
              <li id="cliente-item" key={client.id}>
                <div className="cliente-info">
                  {client.nombre} {client.apellido} - Cédula: {client.cedula}
                </div>

                <div className="cliente-buttons">
                  <button onClick={() => handleBorrarCliente(client)} className="cliente-delete-button">
                    Borrar Cliente
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('create');
                      setIsUpdateMode(true);
                      setClienteToUpdate(client);
                      setCliente({
                        nombre: client.nombre,
                        apellido: client.apellido,
                        cedula: client.cedula,
                        apto: client.associatedApartment || { id: 0 },
                      });
                      setErrorMessage('');
                    }}
                    className="cliente-update-button"
                  >
                    Actualizar Cliente
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )}
