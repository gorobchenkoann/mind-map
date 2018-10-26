import React from 'react';

import styles from './App.scss';
import {Node} from '../';
import {Line} from '../';

export class App extends React.Component {
    state = {
        nodes: [],
        lines: [],
        currentLine: null
    }

    makeId() {
        return Math.random().toString(36).substr(2, 9);
    };

    getControllerCoords(e) {
        let element = e.target.getBoundingClientRect();
        let horizontal = element.left + element.width / 2 || element.right + element.width / 2;
        let vertical = element.top + element.height / 2 || element.bottom + element.height / 2;
        return({
            horizontal: horizontal,
            vertical: vertical
        })
    }

    createNode(e) {
        let id = this.makeId();
        let x = e.clientX;
        let y = e.clientY;
 
        this.setState({
            nodes: [...this.state.nodes, {id, x, y}]
        }) 
    }

    createLine(e) {
        let coords = this.getControllerCoords(e);
        let id = this.makeId();
        let x1 = coords.horizontal;
        let y1 = coords.vertical;

        let x2 = e.clientX;
        let y2 = e.clientY;

        this.setState({
            lines: [...this.state.lines, {id, x1, y1, x2, y2}],
            currentLine: id
        })
    };

    doubleClickHandler = e => {
        this.createNode(e);
    };

    mouseDownHandler = e => {
        if (e.target.getAttribute('data-element') === 'controller') {
            this.createLine(e); 
        }
    };

    mouseMoveHandler = e => {
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

    mouseUpHandler = e => {  
        if (this.state.currentLine) {
            if (e.target.getAttribute('data-element') === 'controller') {                
                let currentLineIndex = this.state.lines.findIndex(line => line.id === this.state.currentLine)
                let updatedLines = this.state.lines;
                let coords = this.getControllerCoords(e);
                updatedLines[currentLineIndex].x2 = coords.horizontal;
                updatedLines[currentLineIndex].y2 = coords.vertical;
            } else {
                let currentLineIndex = this.state.lines.findIndex(line => line.id === this.state.currentLine)
                let updatedLines = this.state.lines;
                updatedLines.splice(currentLineIndex, 1)
            }
            
            this.setState({
                currentLine: null
            })
        }
               
    };

    lineClickHandler = (lineId) => {
        let lineIndex = this.state.lines.findIndex(line => line.id === lineId);
        let newLines = this.state.lines;
        newLines.splice(lineIndex, 1);
        this.setState({
            lines: newLines
        })
    };

    render() {
        return (  
            <div 
                data-element='container'
                className={styles.container}
                onDoubleClick={this.doubleClickHandler}
                onMouseDown={this.mouseDownHandler}
                onMouseMove={this.mouseMoveHandler}
                onMouseUp={this.mouseUpHandler}
            >
                {this.state.lines.map(line => (
                    <Line 
                        x1={line.x1} 
                        y1={line.y1} 
                        x2={line.x2} 
                        y2={line.y2} 
                        key={line.id} 
                        onClick={this.lineClickHandler}
                    />
                ))}
                {this.state.nodes.map(node => (
                    <Node x={node.x} y={node.y} key={node.id}/>
                ))}                
            </div>        
        )
    }
}