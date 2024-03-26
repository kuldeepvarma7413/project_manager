import './header.css'
import logo from '../raw/logo.png'
import profile_pic from '../raw/default-user.png'

function Header(){
    return(
        <>
            <div className='header'>
                <div className='logo'>
                    <img src={logo} />
                </div>
                <div className='profile'>
                    <p>Lovely Professional University</p>
                    <img src={profile_pic} />
                </div>
            </div>
        </>
    )
}

export default Header