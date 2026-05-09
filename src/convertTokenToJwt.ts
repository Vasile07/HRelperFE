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

export default convertTokenToJwt