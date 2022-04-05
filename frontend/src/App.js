import './App.css';
import Subs from './component/Subs';
import Header from './component/Header';
import SubForm from './component/SubForm';

export default function App() {
  return (
    <>
      <Header />
      <div className='main'>
        <SubForm />
        <Subs />
      </div>
    </>
  );
}

