import  ERRORS  from "../helpers/errors.js";

export const findError = (code) =>{
    return ERRORS.filter((err)=> err.code == code)
}

export const handleDeleteResponse = (affectedRows) => {
    if (affectedRows === 0) {
      return { status: 404, message: "No existe el registro" };
    } else {
      return { status: 200, message: "Registro eliminado con éxito" };
    }
  };

