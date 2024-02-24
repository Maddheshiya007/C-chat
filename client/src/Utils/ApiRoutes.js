
// const host = "http://localhost:4000"; // for development

const host = `${process.env.REACT_APP_BACKEND_URL}`; // for production

export const ApiRegister = `${host}/api/auth/register`;
export const ApiLogin = `${host}/api/auth/login`;

export const ApisetAvatar = `${host}/api/auth/setAvatar`;

export const ApiGetContacts = `${host}/api/auth/allusers`;