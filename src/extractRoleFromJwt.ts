import convertTokenToJwt from "./convertTokenToJwt.ts";

const extractRoleFromJwt = () => {
    const token = localStorage.getItem("token")
    if (token === null)
        return null;
    const jwt = convertTokenToJwt(token)
    return jwt.getField("role");
}

export default extractRoleFromJwt