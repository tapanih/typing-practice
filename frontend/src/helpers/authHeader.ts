const authHeader = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    if (user?.token) {
      return { Authorization: `Bearer ${user.token}` };
    } else {
      return {};
    }
  }
}

export default authHeader;