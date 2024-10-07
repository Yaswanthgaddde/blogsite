
import {BrowserRouter as Router , Route,Routes} from 'react-router-dom'
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';
import { ErrorPage } from './components/error';
import { PostPage } from './pages/main/post-page';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <div className='w-[100%] md:w-[100%] h-1 bg-secondary drop-shadow-lg'></div>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='*' element = {<ErrorPage />}/>
          <Route path='/blog/:id' element= {<PostPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
