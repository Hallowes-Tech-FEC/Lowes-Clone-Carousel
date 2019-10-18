import React from 'react';
import CarouselEntry from './carouselEntry.jsx';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import $ from 'jquery';
import sampleData from '../../sampleData.json';
import { isAbsolute } from 'path';

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

    componentDidMount () {
        for (let i = 0; i < this.state.maxPositions; i++) {
            if (i === 0) {
                $(".dotSubContainer").append('<span class="dot" style="background-color:royalblue;left:' + (20 * i) + 'px"></span>');  
            } else {
                $(".dotSubContainer").append('<span class="dot" style="left:' + (20 * i) + 'px"></span>');
            }
        }
        this.checkShifters(0);
    }

    render() {
        return (
            <div id="carousel">
                {this.state.items.map((item, index) => (                                       
                    <Motion
                        defaultStyle={{left: (index - this.state.currentPosition) * 235}}
                        style={{
                            left: spring((index - this.state.currentPosition) * 235)
                        }}
                    >
                        {style => (
                            <CarouselEntryWrapper left={style.left}>
                                <CarouselEntry item={item}/>
                            </CarouselEntryWrapper>
                        )}
                    </Motion>
                ))}
                <button className="carouselShifter" id="shifterLeft" onClick={this.moveLeft.bind(this)} style={{position: "absolute"}}>{"<"}</button>
                <button className="carouselShifter" id="shifterRight" onClick={this.moveRight.bind(this)} style={{position: "absolute", left: "1000px"}}>{">"}</button>

                <div className="dotContainer">
                    <div className="dotSubContainer"></div>
                </div>
            </div>
        )
    }
}

export default Carousel;