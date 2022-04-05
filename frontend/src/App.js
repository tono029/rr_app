import './App.css';
import Subs from './component/Subs';
import Header from './component/Header';
import SubForm from './component/SubForm';
import axios from "axios"

export default function App() {
  const client = axios.create({
    // APIのURL
    baseURL: "http://localhost:3001/"
  })

  return (
    <>
      <Header />
      <div className='main'>
        <SubForm client={client}/>
        <Subs client={client} />
      </div>
    </>
  );
}

