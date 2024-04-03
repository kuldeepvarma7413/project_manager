import './css/container.css'
import Card from './card';
function Container(props){
    return(
        <>
            <div className='container'>
                <div className="container-header" style={{backgroundColor: props.bgcolor}}>
                    <p className="container-title">{props.title}</p>
                    <div className="container-header-right">
                        <p className='taskCount'>0</p>
                    </div>
                </div>
                <div className="container-content">
                    {/* cards */}
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                </div>
                <div>
                    <button href='#' className='addTask'>Add task...</button>
                </div>
            </div>
        </>
    )
}

export default Container;