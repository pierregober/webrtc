import axios from "axios";
axios.defaults.baseURL =
  "https://3gd1kf5t66.execute-api.us-east-1.amazonaws.com/development";

export const signInApi = async (props) => {
  return await axios.post("/auth/signin", props);
};

export const signUpApi = async (props) => {
  return await axios.post("/auth/signup", props);
};
