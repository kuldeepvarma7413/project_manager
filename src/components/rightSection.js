import './rightSection.css'
import Container from './container'

function RightSection(){
    return(
        <>
        <div className="outer-container-right">
            <Container containerId="1"></Container>
            <Container containerId="2"></Container>
            <Container containerId="3"></Container>
            <Container containerId="4"></Container>
            <Container containerId="5"></Container>
        </div>
        </>
    )
}

export default RightSection