import './css/header.css'

function Header(){
    return(
        <>
            <div className='header'>
                <div className='logo'>
                    <img src={process.env.PUBLIC_URL+'/raw/logo.png'} alt='website logo'/>
                </div>
                <div className='profile'>
                    <p>Lovely Professional University</p>
                    <img src={process.env.PUBLIC_URL+'/raw/default-user.png'} alt='organisation logo'/>
                </div>
            </div>
        </>
    )
}

export default Header