const REGEX = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
};

export default REGEX;
