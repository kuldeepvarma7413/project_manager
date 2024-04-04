import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import LeftSection from './components/leftSection';
import RightSection from './components/rightSection';
import AddEmployee from './components/addEmployee';
import AllEmployees from './components/AllEmployees';


const organization_id="660958393b2394bb5fe31222";
function App() {
  return (
    <Router>
      <div className='main-container'>
        <div className='main-container-1'>
          <Header></Header>
        </div>
        <div className='main-container-2'>
          <LeftSection></LeftSection>
          <div className='outer-container-right'>
            <Routes>
              <Route path="/" element={<RightSection />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/all-employees" element={<AllEmployees />} />
            </Routes>
          </div>
        </div>
      </div>
      {/* <Popup /> */}
    </Router>
  );
}

export default App;
export {organization_id}