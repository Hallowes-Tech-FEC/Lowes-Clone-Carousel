import React from 'react';

const CarouselEntry = props => {

    let ratingWidth = props.item.rating * 16;

    return (
        <div>
            <img src={props.item.picture} className="carouselPhoto"></img>
            <div className="carouselTitle">
                <strong>{props.item.name}</strong>
            </div>
            <div className="carouselRating">
                <div className="emptyStars">
                    <span>&#9734;</span>
                    <span>&#9734;</span>
                    <span>&#9734;</span>
                    <span>&#9734;</span>
                    <span>&#9734;</span>
                </div>
                <div className="filledInStars" style={{
                    width: ratingWidth
                }}>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                </div>
            </div>
            <div className="carouselPrice">
                <strong>${props.item.price}</strong>
            </div>
            <button className="carouselButton">ADD TO CART</button>
        </div>
    )
}

export default CarouselEntry;