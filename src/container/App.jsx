import React from 'react';
import { Container } from 'react-bootstrap';
import ListarProducto from '../components/listarProducto/ListarProducto';


const App = () => {
    return (
        <Container fluid>
            <h1 className="text-center">Listado de productos</h1>
            <ListarProducto/>
        </Container>
    )
}

export default App
