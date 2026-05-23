import api, {
  setSession,
  clearSession,
  getAuthHeaders,
  getCurrentUser as getStoredCurrentUser,
  getAuthErrorMessage,
} from "../lib/parseRest";

export const registerUser = async ({ username, email, password }) => {
  try {
    const res = await api.post(
      "/users",
      { username, email, password },
      { headers: getAuthHeaders() },
    );
    // response contains objectId, sessionToken, createdAt
    const user = res.data;
    setSession(user, user.sessionToken);
    return user;
  } catch (error) {
    throw new Error(
      getAuthErrorMessage(error, "Registration failed. Please try again."),
    );
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    // Back4app accepts email as the username field
    const res = await api.get("/login", {
      params: { username: email, password },
      headers: getAuthHeaders(),
    });
    const user = res.data;
    setSession(user, user.sessionToken);
    return user;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error, "Invalid email or password."));
  }
};

export const logoutUser = async () => {
  await api.post("/logout", null, { headers: getAuthHeaders() });
  clearSession();
};

export const getCurrentUser = () => {
  return getStoredCurrentUser();
};
