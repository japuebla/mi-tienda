import React, { useState } from "react";

//Es la misma cosa que hace el hook useHistory pero problema de versiones este es el tipo
import { useNavigate } from "react-router-dom";

import estilos from "./NewProducto.module.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

//importando a axios
import axios from "axios";

//importando los hooks que me permiten manipular el estado global
import { useSelector } from "react-redux";

const NewProducto = () => {
  //URL del servidor a donde vamos a insertar (en este caso es localhost con el puerto que especificamos en el package.json)
  const URL = "http://localhost:3005/";

  //Hook para cambiar la url a donde me debo mover
  const navigate = useNavigate();

  //Estado de los datos a insertar
  const [data, setData] = useState({
    nombre: "",
    image: "",
    costo: "",
    idDepartamento: null,
    cedulaCategoria: null
  });

  //Obteniendo las categias y departamentos del estado global
  const categorias = useSelector(state => state.categorias);
  const departamentos = useSelector(state => state.departamentos);

  //Evitando perder los datos cuando se reinicia la pagina
  if (departamentos.departamentos.length > 0) {
    localStorage.setItem(
      "departamentos",
      JSON.stringify(departamentos.departamentos)
    );
  }
  //Evitando perder los datos cuando se reinicia la pagina
  if (categorias.categorias.length > 0) {
    localStorage.setItem("categorias", JSON.stringify(categorias.categorias));
  }

  //Con estos son los datos que trabajaremos, estos siempre estaran ahi pase lo que pase
  const departamentosPersistentes = JSON.parse(
    localStorage.getItem("departamentos")
  );
  const categoriasPersistentes = JSON.parse(localStorage.getItem("categorias"));

  //estado del select categoria
  const [misCategorias, setMisCategorias] = useState([]);

  //funcion auxialiar para obtener las cedulas de categorias dado un id de departamento
  const cedulasCateghoriasByIdDepartamento = id => {
    const departamentoReferido = departamentosPersistentes.find(
      elemento => elemento.id === id
    );

    return departamentoReferido.cedulaCategorias;
  };

  const handlerChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value
    });
  };

  const handlerChangeSelectCategoria = ({ target }) => {
    setData({
      ...data,
      [target.name]: parseInt(target.value)
    });
  };

  const handlerChangeSelectDepartameto = ({ target }) => {
    setData({
      ...data,
      [target.name]: parseInt(target.value)
    });

    const categoriasReferidas = cedulasCateghoriasByIdDepartamento(
      parseInt(target.value)
    );

    const categoriasReferentes = categoriasPersistentes.filter(
      elemento => categoriasReferidas.indexOf(elemento.cedula) !== -1
    );
    setMisCategorias(categoriasReferentes);
  };

  const handlerSubmit = async e => {
    e.preventDefault();
    const response = await axios.post(`${URL}productos`, data);
    if (response.status === 201) {
      Swal.fire(
        "Guardado!",
        `El registro ${response.data.nombre} ha sido guardado exitosamente!`,
        "success"
      );
      //history.push("/");
      navigate("/");
    } else {
      Swal.fire("Error!", "Hubo un problema al crear el registro!", "error");
    }
  };

  return (
    <Container>
      <h1 className={estilos.textoCentrado}>Nueva producto</h1>

      <Row>
        <Col></Col>
        <Col>
          <Form onSubmit={handlerSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Referencia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del producto"
                name="nombre"
                value={data.nombre}
                required
                onChange={handlerChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL de la imagen"
                name="image"
                value={data.image}
                required
                onChange={handlerChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio"
                name="costo"
                value={data.costo}
                required
                onChange={handlerChange}
              />
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              name="idDepartamento"
              required
              onChange={handlerChangeSelectDepartameto}
              className={estilos.listados}
            >
              <option value="">Seleccione el departamento</option>

              {departamentosPersistentes.map((departamento, index) => {
                return (
                  <option key={index} value={departamento.id}>
                    {departamento.nombre}
                  </option>
                );
              })}
            </Form.Select>

            <Form.Select
              aria-label="Default select example"
              name="cedulaCategoria"
              required
              onChange={handlerChangeSelectCategoria}
              className={estilos.listados}
            >
              <option value="">Seleccione la categoria</option>

              {misCategorias.map((categoria, index) => {
                return (
                  <option key={index} value={categoria.cedula}>
                    {categoria.nombre}
                  </option>
                );
              })}
            </Form.Select>

            <Button className={estilos.botones} variant="success" type="submit">
              Guardar
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default NewProducto;
