import React, { Component } from 'react';

class MiComponente extends Component {
  constructor() {
    super();
    this.state = {
      alumnos: [],
      error: null,
      dni: '',
      nombres: '',
      apellidos: '',
      sexo: '',
      successMessage: '', // Nuevo estado para el mensaje de éxito
    };
  }

  componentDidMount() {
    fetch('https://emeheco.000webhostapp.com/JSON/json.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud falló');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ alumnos: data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData;
    formData.append('dni', this.state.dni);
    formData.append('nombres', this.state.nombres);
    formData.append('apellidos', this.state.apellidos);
    formData.append('sexo', this.state.sexo);

    fetch('https://emeheco.000webhostapp.com/JSON/alumno_add.php', {
      method: 'POST',
      body: formData,
      
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud falló');
        }
        return response.json();
      })
      .then((data) => {
        this.setState((prevState) => ({
          alumnos: [...prevState.alumnos, data],
          dni: '',
          nombres: '',
          apellidos: '',
          sexo: '',
          successMessage: 'Alumno registrado con éxito',
        }));
  
        setTimeout(() => {
          this.setState({ successMessage: '' });
        }, 3000);
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }
  

  render() {
    const { alumnos, error, successMessage } = this.state;

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <div className="form-container-table">
          <h2>Lista de Alumnos</h2>
          <table className="tabla-alumnos">
            <thead>
              <tr>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Sexo</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno, index) => (
                <tr key={index}>
                  <td>{alumno.dni}</td>
                  <td>{alumno.nombres}</td>
                  <td>{alumno.apellidos}</td>
                  <td>{alumno.sexo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-container">
          <h2>Registrar Nuevo Alumno</h2>
          {successMessage && <div className="success-message">{successMessage}</div>}
          <form onSubmit={this.handleSubmit} className="form">
            <div className="form-group">
              <label>DNI:</label>
              <input
                type="text"
                name="dni"
                value={this.state.dni}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Nombres:</label>
              <input
                type="text"
                name="nombres"
                value={this.state.nombres}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Apellidos:</label>
              <input
                type="text"
                name="apellidos"
                value={this.state.apellidos}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Sexo:</label>
              <input
                type="text"
                name="sexo"
                value={this.state.sexo}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default MiComponente;

