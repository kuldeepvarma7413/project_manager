import './container.css'
import Card from './card';
function Container(){
    return(
        <>
            <div className='container'>
                <div className="container-header">
                    <p className="container-title">Container 1</p>
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
                    <a href='#' className='addTask'>Add task...</a>
                </div>
            </div>
        </>
    )
}

export default Container;