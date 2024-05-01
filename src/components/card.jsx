import './css/card.css'
import { Pencil } from 'lucide-react';
function Card({card, dragStart, updateCardData}){
    return(
        <>
            <div className="card" draggable onDragStart={(e)=>dragStart(e,card._id)}>
                <div className='card-top'>
                    <div className="card-left">
                        <h3 className='title'>{card.title}</h3>
                        <p className='tagname tag-background'>{card.phase}</p>
                        {<p className='assignedTo'>{card.employee_info.name}</p>}
                    </div>
                    <div className="card-right">
                        <img alt="employee" src={card.employee_info.photo} />
                    </div>
                </div>
                <div className='progressbar'>
                <span className='updateBtn' key={card._id} onClick={(e) => { e.stopPropagation(); updateCardData(card._id); }}>
                    <Pencil size={14} color='white' />
                </span>
                    <p className='deadline tag-background'>{card.deadline}</p>
                    <p className='progress tag-background'>Pg: {card.progress}%</p>
                </div>
            </div>
        </>
    )
}

export default Card