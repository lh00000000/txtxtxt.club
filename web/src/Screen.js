import React, {
    Component
} from 'react';
import './Screen.css';

class Cell extends Component {
    render() {
        return (
            <span 
                className="cell"
                style={{color:this.props.color}}>
                {this.props.char}
            </span>
        )
    }
}

class Row extends Component {
    render() {
        return <div>{this.props.rowBuffer.map((pixelDatum, i) => <Cell key={i} {...pixelDatum}/>)}</div>
    }
}

class Screen extends Component {
    render() {
        return (
            this.props.buffer
            .map(
                (rowBuffer, i) => <Row key={i} rowBuffer={rowBuffer} />
            )
        )
    }
}

export default Screen;