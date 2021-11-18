import { Card, Button, Col } from "react-bootstrap";
import estilos from "./CardProducto.module.css";
import { GetProductoImg } from "../../utils/GetProductoImg";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";


//Importando actions
import { eliminarProducto, changeShowModal, cargarDatosProductoEdicioActiva } from "../../store/slices/productoSlice";

//importando axios
import axios from "axios";

const CardProducto = ({ producto }) => {
  //URL del servidor a donde vamos a eliminar (en este caso es localhost con el puerto que especificamos en el package.json)
  const URL = "http://localhost:3005/productos";

  //Obteniendo el estado de los departamento
  const departamentos = useSelector(state => state.departamentos);
 
 
  const departamento = departamentos.departamentos.find(
    elemento => elemento.id === producto.idDepartamento
  );

  //Obteniendo el estado de los categorias
  const categorias = useSelector(state => state.categorias);
  const categoria = categorias.categorias.find(
    elemento => elemento.cedula === producto.cedulaCategoria
  );

  const dispatch = useDispatch();

  const handlerDelete = async () => {
    Swal.fire({
      title: `Estás seguro de eliminar ${producto.nombre} ?`,
      text: "Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, Eliminarlo!"
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`${URL}/${producto.id}`).then(response => {
          if (response.status === 200) {
            Swal.fire(
              "Eliminado!",
              `Se eliminó con éxito el registro ${producto.nombre}!`,
              "success"
            );

            //------Inicio de codigo adicional pa redux------
            dispatch(eliminarProducto(producto.id));

            //------Fin de codigo adicional pa redux------
          } else {
            Swal.fire(
              "Error!",
              "Hubo un problema al elminar el registro!",
              "error"
            );
          }
        });
      }
    });
  };

  const handlerEdit = () => {
    dispatch(changeShowModal());
    dispatch(cargarDatosProductoEdicioActiva(producto));
  };

  //Es un mecaninsmo para cuando el registro listado no tenga foto poner una foto por defecto
  const imgURL = GetProductoImg(producto.image);
  return (
    
    <Col md={4}>
      <Card style={{ width: "18rem", height: "480px", marginBottom: "10px" }}>
        <Card.Img
          variant="top"
          src={imgURL}
          alt={producto.image}
          className={estilos.imageCard}
        />
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>
            <strong>Costo:</strong> {producto.costo}
            <br />
            <strong>Departamento:</strong> {departamento.nombre}
            <br />
            <strong>Categoria:</strong> {categoria.nombre}
            <br />
          </Card.Text>
          <Button
              onClick={handlerEdit} 
            className={estilos.botonesCard}
            variant="primary"
          >
            Editar
          </Button>
          <Button
            onClick={handlerDelete}
            className={estilos.botonesCard}
            variant="danger"
          >
            Eliminar
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardProducto;
