import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';

import client from './components/config.js';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Post from './components/Post.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [loginInfo, setLoginInfo] = useState({
    isLoggedIn: false,
    username: '',
    token: '',
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header props={{loginInfo}}/>
        <Routes>
          <Route path={'/'} element={<Home props={{loginInfo}}/>} />
          <Route path={'login'} element={<Login props={{loginInfo, setLoginInfo}}/>} />
          <Route path={'register'} element={<Register props={{loginInfo, setLoginInfo}}/>} />
          <Route path={'post/:id/*'} element={ <Post props={{loginInfo}}/>} />
        </Routes>
      </div>
    </ApolloProvider>
  )
}

export default App;
