import './App.css';
import axios from 'axios';

require('dotenv').config();
axios.defaults.withCredentials = true;

function App() {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const test = () => {
    axios
      .get(`${url}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='App'>
      <button onClick={test}>click</button>
    </div>
  );
}

export default App;
