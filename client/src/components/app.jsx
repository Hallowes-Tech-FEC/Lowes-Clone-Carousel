import React from 'react';
import Carousel from './carousel.jsx';

class App extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            focused: 0,
            swipe: 0,
            currentItem: 1
        }
    }

    render () {
        return (
                <Carousel />
        )
    }
}

export default App;