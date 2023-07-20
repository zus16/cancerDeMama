
function Validation(values) {

    let error = {}

    if(values.name === "") {
        error.name = "Name should not be empty"    
    }
    else {
        error.name = ""
    }

    if(values.correo_electronico === "") {
        error.correo_electronico = "Name should not be empty"    
    }
    else {
        error.correo_electronico = ""
    }


    if(values.contrasenna === "") {
        error.contrasenna = "contrasenna should not be empty"
    }
    else {
        error.contrasenna = ""    
    }    
    return error;
}
export default Validation;