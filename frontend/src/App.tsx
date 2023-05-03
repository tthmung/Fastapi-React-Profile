import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import API from './api'

function App() {

  const [back, setBack] = useState<string>('');
  const api = new API();

  useEffect(() => {

    const fetchData = async () => {
      let respose = await api.test();
      console.log(respose.data.message);
      setBack(respose.data.message);
    }


    fetchData();

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          {back}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>
  );
}

export default App;