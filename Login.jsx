import { loginRequest } from "../api/authApi";

const { user } = await loginRequest({ username, password });
