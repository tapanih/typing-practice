import { logout, Action } from "../state";

const handleErrors = (error: { response: { status: number }} | undefined, dispatch: React.Dispatch<Action>) => {
  if (error?.response.status === 401) {
    dispatch(logout());
  }
}

export default handleErrors;