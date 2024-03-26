import './App.css';
import Header from './components/header';
import LeftSection from './components/leftSection';
import RightSection from './components/rightSection';

function App() {
  return (
    <div className='main-container'>
      <div className='main-container-1'>
        <Header></Header>
      </div>
      <div className='main-container-2'>
        <LeftSection></LeftSection>
        <RightSection></RightSection>
      </div>
    </div>
  );
}

export default App;
