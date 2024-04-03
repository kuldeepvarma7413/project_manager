import './css/rightSection.css'
import Container from './container'

function RightSection(){
    return(
        <>
        <div className="outer-container-right">
            <Container containerId="1" title="No Project Phase" bgcolor="rgb(171 210 255)"></Container>
            <Container containerId="2" title="In Planning" bgcolor="rgb(252 255 162)"></Container>
            <Container containerId="3" title="Estimation" bgcolor="rgb(208 255 156)"></Container>
            <Container containerId="4" title="Active" bgcolor="rgb(251 144 144)"></Container>
            <Container containerId="5" title="Review" bgcolor="rgb(130 255 124)"></Container>
        </div>
        </>
    )
}

export default RightSection