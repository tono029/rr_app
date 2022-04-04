import './App.css';
import Home from './component/Home';
import Subs from './component/Subs';
import Header from './component/Header';

export default function App() {
  return (
    <>
      <Header />
      <div className='main'>
        <Home />
        <Subs />

      </div>
    </>
  );
}

