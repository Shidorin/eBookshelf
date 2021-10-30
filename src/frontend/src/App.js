import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Navbar from './components/Navbar/Navbar';
import BookList from './components/BookList/BookList';
import Home from './components/Home/Home'
import BookEntity from './components/BookEntity/BookEntity';
import LoginForm from './components/LoginForm/LoginForm';



function App() {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/"><Redirect to="/home" /></Route>
        <Route path='/home' component={Home} />
        <Route path='/bookList' component={BookList} />
        <Route path='/book/:id/:title' component={BookEntity} />
        <Route path='/login' component={LoginForm} />
      </Switch>
    </Router>
  )
}

export default App;