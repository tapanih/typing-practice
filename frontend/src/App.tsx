import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import TypingPage from './components/TypingPage';
import AddQuoteForm from './components/AddQuoteForm';
import Header from './components/Header';
import { setUser, useStateValue } from './state';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App: React.FC = () => {
  const [state, dispatch] = useStateValue();

  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <div className="bg-blue-300 h-screen font-mono">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/"   render={() => <TypingPage />} />
          <Route path="/login"    render={() => state.user ? <Redirect to="/" /> : <LoginForm />} />
          <Route path="/register" render={() => <RegisterForm />} />
          <Route path="/submit"   render={() => <AddQuoteForm />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
