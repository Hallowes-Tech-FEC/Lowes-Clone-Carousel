import React from 'react';
import CarouselEntry from './carouselEntry.jsx';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import { Swipeable } from 'react-swipeable';
import $ from 'jquery';
import sampleData from '../../sampleData.json';
import axios from 'axios';

const CarouselEntryWrapper = styled.div`
    position: absolute;
    width: 225px;
    height: 440px;
    left: ${props => props.left}px;
`

class Carousel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            items: sampleData,
            currentPosition: 0,
            maxPositions: Math.floor(sampleData.length / 2)
        }
    }

    moveLeft () {
        this.moveDots(this.state.currentPosition / 2 - 1);
        this.checkShifters(this.state.currentPosition / 2 - 1);
        this.setState({currentPosition: this.state.currentPosition - 2});
    }

    moveRight () {
        this.moveDots(this.state.currentPosition / 2 + 1);
        this.checkShifters(this.state.currentPosition / 2 + 1);
        this.setState({currentPosition: this.state.currentPosition + 2});
    }

    checkShifters (newPosition) {
        if (newPosition === 0) {
            $("#shifterLeft").css("visibility", "hidden");
        } else {
            $("#shifterLeft").css("visibility", "visible");
        }
        if (newPosition === this.state.maxPositions - 1) {
            $("#shifterRight").css("visibility", "hidden");
        } else {
            $("#shifterRight").css("visibility", "visible");
        }
    }

    spawnDots(maxPositions) {
        $(".dotSubContainer").empty();
        for (let i = 0; i < maxPositions; i++) {
            if (i === 0) {
                $(".dotSubContainer").append('<span class="dot" style="background-color:royalblue;left:' + (20 * i) + 'px"></span>');  
            } else {
                $(".dotSubContainer").append('<span class="dot" style="left:' + (20 * i) + 'px"></span>');
            }
        }
    }

    moveDots (newPosition) {
        let dots = $(".dotSubContainer").children();
        for (let i = 0; i < dots.length; i++) {
            if (i === newPosition) {
                dots.eq(i).css("background-color", "royalblue");
            } else {
                dots.eq(i).css("background-color", "gray");
            }
        }
    }

    changeItems (items) {
        if (items.length > 10) {
            let newStartingIndex = Math.floor(Math.random() * (items.length - 10));
            items = items.slice(newStartingIndex, newStartingIndex + 10);
        }
        this.setState({
            items: items,
            currentPosition: 0,
            maxPositions: Math.floor(items.length / 2)
        })
        this.spawnDots(Math.floor(items.length / 2));
        this.checkShifters(0);
    }

    componentDidMount () {
        axios.get("/items")
        .then ((data) => {
            this.changeItems(data.data);
        })
        .catch ((err) => {
            console.log("Uh-oh Spaghettios");
            console.log(err);
        })
    }

    render() {
        let spaceBetweenEntries;
        if (screen.width > 600) {
            spaceBetweenEntries = 235;
        } else {
            spaceBetweenEntries = screen.width / 3.3;
        }
        return (
            <div id="carousel">
                <Swipeable
                    onSwipedRight={() => {
                        if (this.state.currentPosition > 0) {
                            this.moveLeft.call(this)
                        }
                    }}
                    onSwipedLeft={() => {
                        if (this.state.currentPosition / 2 < this.state.maxPositions) {
                            this.moveRight.call(this)
                        }
                    }}
                >
                    {this.state.items.map((item, index) => (
                        <Motion
                            defaultStyle={{left: (index - this.state.currentPosition) * spaceBetweenEntries}}
                            style={{
                                left: spring((index - this.state.currentPosition) * spaceBetweenEntries)
                            }}
                            key={index.toString()}
                        >
                            {style => (
                                <CarouselEntryWrapper key={index.toString()} left={style.left}>
                                    <CarouselEntry key={index.toString()} item={item}/>
                                </CarouselEntryWrapper>
                            )}
                        </Motion>
                    ))}
                    <button className="carouselShifter" id="shifterLeft" onClick={this.moveLeft.bind(this)} style={{position: "absolute"}}>{"<"}</button>
                    <button className="carouselShifter" id="shifterRight" onClick={this.moveRight.bind(this)} style={{position: "absolute", left: "1000px"}}>{">"}</button>
                </Swipeable>
                <div className="dotContainer">
                    <div className="dotSubContainer"></div>
                </div>
            </div>
        )
    }
}

export default Carousel;