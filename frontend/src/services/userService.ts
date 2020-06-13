const logout = () => {
  window.localStorage.removeItem("loggedUser");
}

export default {
  logout
}