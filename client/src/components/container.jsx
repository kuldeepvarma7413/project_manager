import './css/container.css'
import Card from './card';
function Container({containerId, title, bgcolor, showPop, tasks, onadd, handleDrop, updateCardData}){

    const handleDrag=(e, cardId)=>{
        console.log(e.target, cardId)
        e.dataTransfer.setData("cardId", cardId);
    }

    const handleDragover=(e)=>{
        e.preventDefault();
    }

    return(
        <>
            <div className='container'>
                <div className="container-header" style={{backgroundColor: bgcolor}}>
                    <p className="container-title">{title}</p>
                    <div className="container-header-right">
                        <p className='taskCount'>0</p>
                    </div>
                </div>
                <div className="container-content" onDragOver={handleDragover} onDrop={(e)=>handleDrop(e, containerId.toString())}>
                    {tasks.map(task => <Card key={task.id} card={task} dragStart={handleDrag} updateCardData={updateCardData}></Card>)}
                    {/* cards */}
                </div>
                <div>
                    <button href='#' className='addTask' onClick={() => showPop(containerId, onadd)}>Add task...</button>
                </div>
            </div>
        </>
    )
}

export default Container;