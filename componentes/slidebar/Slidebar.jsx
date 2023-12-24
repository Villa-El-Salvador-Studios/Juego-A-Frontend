import './Slidebar.css'; 

const Slidebar = ({titulo}) => {

    return (
        <div className='sliderbar'>
            <h1 className='titulo-sliderbar'>{titulo}</h1>
            <input className='slider' type="range" />
        </div>
    )
}

export default Slidebar