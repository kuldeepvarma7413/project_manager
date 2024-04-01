import './css/card.css'
import updatePng from '../raw/icons/update.png'
function Card(){
    return(
        <>
            <div className="card">
                <div className='card-top'>
                    <div className="card-left">
                        <h3 className='title'>Re-design side bar</h3>
                        <p className='tagname tag-background'>design</p>
                        <p className='assignedTo'>assigned to</p>
                    </div>
                    <div className="card-right">
                        <img alt="employee" src="https://t3.ftcdn.net/jpg/00/75/33/10/360_F_75331081_axIcnWZnT1RbSsPGlgLQaCftelG158KV.jpg" />
                    </div>
                </div>
                <div className='progressbar'>
                    <p className='updateBtn'><img src={updatePng} alt="upload button" /></p>
                    <p className='deadline tag-background'>23-02-24</p>
                    <p className='progress tag-background'>Pg: 48%</p>
                </div>
            </div>
        </>
    )
}

export default Card