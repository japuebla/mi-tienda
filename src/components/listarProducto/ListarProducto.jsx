import React, { useEffect, useState } from "react";

//Importando hoja de estilos
import estilos from "./ListarProducto.module.css";

//Importando a axios
import axios from "axios";

import Swal from "sweetalert2";

//Hooks utilizados en redux/toolkit
import { useDispatch, useSelector } from "react-redux";

//Importando las action
import {
  changeShowModal,
  getProductos
} from "../../store/slices/productoSlice";
import { getDepartamentos } from "../../store/slices/departamentoSlice";
import { getCategorias } from "../../store/slices/categoriaSlice";

import CardProducto from "../cardProducto/CardProducto";

//IMportando bootstrap
import { Container, Row, Modal, Button, Form } from "react-bootstrap";

const ListarProducto = () => {
  //URL del servidor a quien le vamos a hacer la peticion (en este caso es localhost con el puerto que especificamos en el package.json)
  const URL = "http://localhost:3005/productos";

  const dispatch = useDispatch();

  //Estado global
  const productos = useSelector(state => state.productos);
  const departamentos = useSelector(state => state.departamentos);
  const categorias = useSelector(state => state.categorias);

  //Manejador del close del Modal
  const handleCloseModal = () => dispatch(changeShowModal());

  //Estado que vela por los cambios de update para mandar a renderizar en el efecto
  const [updateData, setUpdateData] = useState(false);

  //Estado del select categoria
  const [misCategorias, setMisCategorias] = useState([]);

  //Datos para inicializar el Modal
  const [dataModal, setDataModal] = useState({
    nombre: "",
    image: "",
    costo: "",
    idDepartamento: "",
    cedulaCategoria: ""
  });
  

  //manejador de los cambios en los input del modal
  const handlerChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value
    });
  };

  //funcion auxialiar para obtener las cedulas de categorias dado un id de departamento
  const cedulasCateghoriasByIdDepartamento = id => {
    const departamentoReferido = departamentos.departamentos.find(
      elemento => elemento.id === id
    );
    return departamentoReferido.cedulaCategorias;
  };

  //Actualizando las categorias del select en dependencia del departamento
  const actualizandoCategoriasSelect = idDepartamento => {
    const categoriasReferidas = cedulasCateghoriasByIdDepartamento(
      parseInt(idDepartamento)
    );

    const categoriasReferentes = categorias.categorias.filter(
      elemento => categoriasReferidas.indexOf(elemento.cedula) !== -1
    );
    setMisCategorias(categoriasReferentes);
  };

  /*  if(productos.showModal){
    actualizandoCategoriasSelect(productos.productoEditadoActivo.idDepartamento)
  }  */

  //Manejador del Select departamento
  const handlerChangeSelectDepartameto = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: parseInt(target.value)
    });

    actualizandoCategoriasSelect(target.value);

  };

  //Manejador del Select categorias
  const handlerChangeSelectCategoria = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: parseInt(target.value)
    });
  };

  //Manejador del submit que se encuentra dentro del Modal
  const handlerSubmit = async e => {
    e.preventDefault();
    const datosProducto = {
      nombre: dataModal.nombre || productos.productoEditadoActivo.nombre,
      image: dataModal.image || productos.productoEditadoActivo.image,
      costo: dataModal.costo || productos.productoEditadoActivo.costo,
      idDepartamento:
        dataModal.idDepartamento ||
        productos.productoEditadoActivo.idDepartamento,
      cedulaCategoria:
        dataModal.cedulaCategoria ||
        productos.productoEditadoActivo.cedulaCategoria
    };
    const response = await axios.put(
      `${URL}/${productos.productoEditadoActivo.id}`,
      datosProducto
    );
    if (response.status === 200) {
      Swal.fire(
        "Editado!",
        `El registro ${response.data.nombre} ha sido editado exitosamente!`,
        "success"
      );
      setUpdateData(!updateData);
    } else {
      Swal.fire("Error!", "Hubo un problema al editar el registro!", "error");
    }
  };

  useEffect(() => {
    dispatch(getProductos());
    dispatch(getDepartamentos());
    dispatch(getCategorias());
    
    if(productos.showModal){
      setDataModal(productos.productoEditadoActivo);
      actualizandoCategoriasSelect(productos.productoEditadoActivo.idDepartamento)
    } 
  }, [updateData, productos.productoEditadoActivo]);

  return (
    <Container>
      <Row>
        {departamentos.status === "success" &&
          categorias.status === "success" &&
          productos.productos.map((producto, index) => {
            return <CardProducto key={index} producto={producto} />;
          })}

        <Modal show={productos.showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar Datos</Modal.Title>
          </Modal.Header>

          <Form onSubmit={handlerSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre del producto"
                  name="nombre"
                  value={dataModal.nombre}
                  required
                  onChange={handlerChangeModal}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="URL de la imagen"
                  name="image"
                  value={dataModal.image}
                  required
                  onChange={handlerChangeModal}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Precio"
                  name="costo"
                  value={dataModal.costo}
                  required
                  onChange={handlerChangeModal}
                />
              </Form.Group>

              <Form.Select
                aria-label="Default select example"
                name="idDepartamento"
                required
                value={dataModal.idDepartamento}
                onChange={handlerChangeSelectDepartameto}
                className={estilos.listados}
              >
                {departamentos.departamentos.map((departamento, index) => {
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
                value={dataModal.cedulaCategoria}
                onChange={handlerChangeSelectCategoria}
                className={estilos.listados}
              >
                {misCategorias.map((categoria, index) => {
                  return (
                    <option key={index} value={categoria.cedula}>
                      {categoria.nombre}
                    </option>
                  );
                })}
              </Form.Select>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                type="reset"
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
              <Button
                variant="success"
                onClick={handleCloseModal}
                type="submit"
              >
                Guardar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Row>
    </Container>
  );
};

export default ListarProducto;
