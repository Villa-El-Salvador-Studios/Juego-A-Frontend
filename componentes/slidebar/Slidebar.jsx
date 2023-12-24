import './Slidebar.css'; 

const Slidebar = ({titulo}) => {

    return (
        <div className='slidebar'>
            <h1>{titulo}</h1>
            <input type="range" />
        </div>
    )
}

export default Slidebar