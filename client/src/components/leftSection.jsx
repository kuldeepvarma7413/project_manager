import { useNavigate, useLocation } from 'react-router-dom';
import './css/leftSection.css';

function LeftSection() {
    const navigate = useNavigate();
    const location = useLocation();

    const onItemClick = (event, path) => {
        const items = event.currentTarget.parentNode.children;
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
        }
        event.currentTarget.classList.add('active');
        navigate(path);
    };

    const isItemActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <>
            <div className='outer-container-left'>
                <ol>
                    <li onClick={(event) => onItemClick(event, '/')} className={isItemActive('/')}>Overview</li>
                    <li onClick={(event) => onItemClick(event, '/add-employee')} className={isItemActive('/add-employee')}>Add Employee</li>
                    <li onClick={(event) => onItemClick(event, '/all-employees')} className={isItemActive('/all-employees')}>All Employees</li>
                </ol>
            </div>
        </>
    );
}

export default LeftSection;
