import 'bootstrap/dist/css/bootstrap.min.css'
import Chat from './components/Chat';
import {useState, useEffect} from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase/firebase';

function App() {
  const [user, setUser]= useState(null)

 

 
  return (
    <div className="App">
      {/* {user? ( ):(<>
        <button onClick={handleLogin} className="btn btn-success mt-5">Login</button>
      </>)} */}
     <Chat user={user} setUser={setUser}/>
    </div>
  );
}

export default App;
