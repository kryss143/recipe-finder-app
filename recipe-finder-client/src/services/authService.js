import Parse from "../lib/parse";

export const registerUser = async ({ username, email, password }) => {
  const user = new Parse.User();
  user.set("username", username);
  user.set("email", email);
  user.set("password", password);
  return await user.signUp();
};

export const loginUser = async ({ email, password }) => {
  // Back4app accepts email as the username field
  return await Parse.User.logIn(email, password);
};

export const logoutUser = async () => {
  return await Parse.User.logOut();
};

export const getCurrentUser = () => {
  return Parse.User.current();
};
