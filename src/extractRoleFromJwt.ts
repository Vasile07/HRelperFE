const convertTokenToJwt = (token: string) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT token format');
    }

    const payload = JSON.parse(
        atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
    );

    return {
        getField: (fieldName: string) => payload[fieldName] || null
    };
};

const extractRoleFromJwt = () => {
    const token = localStorage.getItem("token")
    if (token === null)
        return null;
    const jwt = convertTokenToJwt(token)
    return jwt.getField("role");
}

export default extractRoleFromJwt