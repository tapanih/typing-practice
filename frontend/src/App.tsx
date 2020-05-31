import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TypingPage from './components/TypingPage';
import AddQuoteForm from './components/AddQuoteForm';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <TypingPage />} />
          <Route path="/submit" render={() => <AddQuoteForm />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
