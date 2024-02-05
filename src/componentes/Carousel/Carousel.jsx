import { useState } from 'react';
import './Carousel.css';

const Carousel = ({images, onIndexChange}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPreviousSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.imageList.length - 1 : prevIndex - 1
        );
        const updatedIndex = currentIndex === 0 ? images.imageList.length - 1 : currentIndex - 1;
        onIndexChange(updatedIndex);
    };

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.imageList.length - 1 ? 0 : prevIndex + 1
        );
        const updatedIndex = currentIndex === images.imageList.length - 1 ? 0 : currentIndex + 1;
        onIndexChange(updatedIndex);
    };

    return images.names.length === 0 ? (
        <div>
            <h1 className="no-elements">No hay elementos para mostrar</h1>
        </div>
    )
    :
    (
        <div className="carousel">
            <button className="carousel-button" onClick={goToPreviousSlide}>&lt;</button>
            <h3>{images.names[currentIndex]}</h3>
            <img className="carousel-image" src={images.imageList[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
            <button className="carousel-button" onClick={goToNextSlide}>&gt;</button>
        </div>
    );
}

export default Carousel