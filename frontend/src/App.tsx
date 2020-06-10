import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TypingPage from './components/TypingPage';
import AddQuoteForm from './components/AddQuoteForm';
import Header from './components/Header';
import { setUser, useStateValue } from './state';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/"   render={() => <TypingPage />} />
        <Route path="/login"    render={() => <LoginForm />} />
        <Route path="/register" render={() => <RegisterForm />} />
        <Route path="/submit"   render={() => <AddQuoteForm />} />
      </Switch>
    </Router>
  )
}

export default App;
