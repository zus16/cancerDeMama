
function Validation(values) {

    let error = {}
    const correo_electronico_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const contrasenna_pattern = /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/


    if(values.correo_electronico === "") {
        error.correo_electronico = "email should not be empty"    
    }
    else if(!correo_electronico_pattern.test(values.correo_electronico)) {
        error.correo_electronico = "email Didn't match"    
    }else {
        error.correo_electronico = ""
    }


    if(values.contrasenna === "") {
        error.contrasenna = "password should not be empty"
    }
    else if(!contrasenna_pattern.test(values.contrasenna)) {
        error.contrasenna = "password didn't match"   
    }else {
        error.contrasenna = ""    
    }    
    return error;
}
export default Validation;