import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Navbar from './components/Navbar/Navbar';
import BookList from './components/BookList/BookList';
import Books from './components/Books/Books';
import Home from './components/Home/Home'
import BookEntity from './components/BookEntity/BookEntity';
import LoginForm from './components/LoginForm/LoginForm';
import Logout from './components/Logout/Logout';
import Signup from './components/Signup/Signup';
//import { useState } from 'react';



function App() {
  //const [token, setToken] = useState()
  //if (!token) {
  //  return <LoginForm setToken={setToken} />
  //}

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/"><Redirect to="/home" /></Route>
        <Route path='/home' component={Home} />
        <Route path='/user/:username/booklist' component={BookList} />
        <Route path='/books' component={Books} />
        <Route path='/book/:id/:title' component={BookEntity} />
        <Route path='/login' component={LoginForm} />
        <Route path='/logout' component={Logout} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </Router>
  )
}

export default App;