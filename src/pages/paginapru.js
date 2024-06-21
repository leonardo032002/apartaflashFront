import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import { Inicial } from './pages/inicial';
import { Admin } from './pages/admin';
import { Creditos } from './pages/creditos';
import { Cliente } from './pages/cliente';
import { Recibo } from './pages/recibo';
import Loading from './loading'; // Importa el componente de carga
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [collapsed, setCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Estado para la pantalla de carga

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    // Simula una carga asincrónica, puedes reemplazar esto con tu propia lógica.
    setTimeout(() => {
      setIsLoading(false); // Una vez que la carga haya terminado, establece isLoading en false
    }, 1500); // Simulamos 2 segundos de carga
  }, []);

  return (
    <Router>
      {isLoading ? ( // Mostrar la pantalla de carga si isLoading es true
        <Loading />
      ) : (
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              ApartaFlash
            </Link>

            <button
              className={`navbar-toggler ${collapsed ? '' : 'collapsed'}`}
              type="button"
              onClick={toggleNavbar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`} id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Administra
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cliente">
                    Cliente
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/recibo">
                    Recibo
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/creditos">
                    Créditos/Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <hr />

          <Routes>
            <Route exact path="/" element={<Inicial />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/creditos" element={<Creditos />} />
            <Route path="/cliente" element={<Cliente />} />
            <Route path="/recibo" element={<Recibo />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
