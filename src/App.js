import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import { Inicial } from './pages/inicial';
import { Apto } from './pages/apto';
import { Creditos } from './pages/creditos';
import { Cliente } from './pages/cliente';
import { Recibo } from './pages/recibo';
import { Consultas } from './pages/consultas';
import Gestiona from './pages/gestiona';



import Loading from './loading';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa el nuevo componente Welcome
import Welcome from './welcome';

function App() {
  const [collapsed, setCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeNote, setShowWelcomeNote] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    // Mostrar la nota de bienvenida durante la primera carga
    if (showWelcomeNote) {
      setTimeout(() => {
        setShowWelcomeNote(false);
      }, 3500); 
    }
  }, [showWelcomeNote]);

  return (
    <Router>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          {/* Renderiza el componente de bienvenida */}
          {showWelcomeNote && <Welcome />}

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
                  <Link className="nav-link" to="/gestiona">
                    Gestiona
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/creditos">
                    Créditos
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <hr />

          <Routes>
            <Route exact path="/" element={<Inicial />} />
            <Route path="/gestiona" element={<Gestiona />} />
            <Route path="/admin" element={<Apto />} />
            <Route path="/creditos" element={<Creditos />} />
            <Route path="/cliente" element={<Cliente />} />
            <Route path="/recibo" element={<Recibo />} />
            <Route path="/consultas" element={<Consultas />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
