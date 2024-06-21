import React from 'react';
import './inicial.css'; // Importa estilos personalizados
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa estilos de Bootstrap

export const Inicial = () => {
  return (
    <div>
      <div className="container mt-5">
        <h1 className="display-4 text-center">ApartaFlash</h1>
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <p>
              ApartaFlash es un innovador sistema de gestión administrativa y financiera para propiedades e inmuebles, diseñado con una interfaz intuitiva y fácil de usar.
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-3 colored-div my-3">
            <p>
              Descubre cómo ApartaFlash revoluciona la administración de propiedades con su enfoque intuitivo y eficiente.
            </p>
          </div>
          <div className="col-md-3 colored-div my-3">
            <p>
              Explora las ventajas de ApartaFlash y cómo simplifica tus tareas administrativas y financieras de forma inteligente.
            </p>
          </div>
          <div className="col-md-3 colored-div my-3">
            <p>
              Con ApartaFlash, optimiza la gestión de tus inmuebles y ten el control total de tus propiedades de manera sencilla y efectiva.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container text-center">
          <p className="text-muted" style={{ color: 'white' }}>
            &copy; {new Date().getFullYear()} ApartaFlash. Todos los derechos reservados.
          </p>
          <p className="text-muted">
            Correo electrónico: ejemplo@apartaflash.com
          </p>
        </div>
      </footer>
    </div>
  );
};
