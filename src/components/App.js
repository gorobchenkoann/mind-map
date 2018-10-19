import React from 'react';

import styles from './App.scss';

function Node(props) {
    return (
        <circle 
            className={styles.point}
            cx={props.x}
            cy={props.y}
        >
        </circle>
    )
}

function Line(props) {
    return (
        <path className={styles.line} onClick={props.onClick}
            d={`M${props.x1} ${props.y1} L ${props.x2} ${props.y2}`}
        >
        </path>
    )
}

export class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            nodes: [],
            lines: [],
            currentLine: null
        }
    }

    makeId() {
        return Math.random().toString(36).substr(2, 9);
    };

    createNode(e) {
        let id = this.makeId();
        let x = e.clientX;
        let y = e.clientY;

        this.setState({
            nodes: [...this.state.nodes, {id, x, y}]
        }) 
    }

    createLine(e) {
        let id = this.makeId();
        let x1 = +e.target.getAttribute('cx');
        let y1 = +e.target.getAttribute('cy');

        let x2 = e.clientX;
        let y2 = e.clientY;

        this.setState({
            lines: [...this.state.lines, {id, x1, y1, x2, y2}],
            currentLine: id
        })
    }

    mouseDownHandler(e) {
        e.preventDefault();

        if (e.target.tagName === 'circle') {
            this.createLine(e);          
        }
    };

    mouseMoveHandler(e) {
        if (this.state.currentLine) {
            let currentLineIndex = this.state.lines.findIndex(line => line.id === this.state.currentLine)
            let updatedLines = this.state.lines;
            updatedLines[currentLineIndex].x2 = e.clientX;
            updatedLines[currentLineIndex].y2 = e.clientY;
            this.setState({
                lines: updatedLines
            })
        }
    };

    mouseUpHandler(e) {  
        if (this.state.currentLine) {
            if (e.target.tagName === 'circle'){
                let currentLineIndex = this.state.lines.findIndex(line => line.id === this.state.currentLine)
                let updatedLines = this.state.lines;
                updatedLines[currentLineIndex].x2 = e.target.getAttribute('cx');
                updatedLines[currentLineIndex].y2 = e.target.getAttribute('cy');
            } else {
                let currentLineIndex = this.state.lines.findIndex(line => line.id === this.state.currentLine)
                let updatedLines = this.state.lines;
                updatedLines.splice(currentLineIndex, 1)
            }
            this.setState({
                currentLine: null
            })
            
        } else if (e.target.tagName === 'svg') {
            this.createNode(e);
        } 
        
    };

    lineClickHandler(lineId) {
        let lineIndex = this.state.lines.findIndex(line => line.id === lineId);
        let newLines = this.state.lines;
        newLines.splice(lineIndex, 1);
        this.setState({
            lines: newLines
        })
    }

    render() {
        return (         
            <svg 
                className={styles.svg}
                onMouseDown={(e) => {this.mouseDownHandler(e)}}
                onMouseMove={(e) => {this.mouseMoveHandler(e)}}
                onMouseUp={(e) => {this.mouseUpHandler(e)}}
            >
            {this.state.lines.map(line => (
                <Line 
                    x1={line.x1} 
                    y1={line.y1} 
                    x2={line.x2} 
                    y2={line.y2} 
                    key={line.id} 
                    onClick={()=>{this.lineClickHandler(line.id)}}
                />
            ))}
            {this.state.nodes.map(node => (
                <Node 
                    x={node.x} 
                    y={node.y} 
                    key={node.id} 
                />
            ))}
            </svg>
        )
    }
}