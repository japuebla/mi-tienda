//importando axios
import axios from "axios";

const URL = "http://localhost:3005/";


  export const cargarDatosProductos = async () => {
    try {
        
      const response = await axios.get(`${URL}productos`);
      
        return response.data;
    } catch (error) {
      console.error("Cuidado!!!..., estas teniendo este " + error);
    }
  };

  export const cargarDatosDepartamentos = async () => {
    try {
      const response = await axios.get(`${URL}departamentos`);

      return response;
    } catch (error) {
      console.error("Cuidado!!!..., estas teniendo este " + error);
    }
  };

  export const cargarDatosCategoarias = async () => {
    try {
      const response = await axios.get(`${URL}categorias`);

      return response;
    } catch (error) {
      console.error("Cuidado!!!..., estas teniendo este " + error);
    }
  };