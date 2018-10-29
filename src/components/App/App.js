import React from 'react';
import { Node, Line } from '../';

import styles from './App.scss';

export class App extends React.Component {
    state = {
        nodes: [],
        lines: [],
        currentNode: null,
        currentLine: null
    }    

    makeId() {
        return Math.random().toString(36).substr(2, 9);
    };

    createNode(e) {
        let id = this.makeId();
        let x = e.clientX - 110;
        let y = e.clientY - 70;
 
        this.setState({
            nodes: [...this.state.nodes, {id, x, y}]
        }) 
    }

    doubleClickHandler = e => {
        this.createNode(e);
    };

    mouseDownHandler = e => {
        if (e.target.getAttribute('data-element') === 'header') {
            let currentNode = e.target.parentElement.getBoundingClientRect();
            let currentNodeId = e.target.parentElement.getAttribute('id');
            this.setState({
                currentNode: {info: currentNode, id: currentNodeId}
            })
        }
        if (e.target.getAttribute('data-element') === 'controller') {
            let id = this.makeId();
            let from = e.target.getBoundingClientRect();
            let to = e.target.getBoundingClientRect();
            this.setState({
                lines: [...this.state.lines, {id, from, to}],
                currentLine: id
            })
        }
    };

    mouseMoveHandler = e => {
        if (this.state.currentLine) {
            // let currentLineIndex = this.state.lines.findIndex(line => line.id === this.state.currentLine)
            // let updatedLines = this.state.lines;
            // updatedLines[currentLineIndex].x2 = e.clientX;
            // updatedLines[currentLineIndex].y2 = e.clientY;
            // this.setState({
            //     lines: updatedLines
            // })
        } else if (this.state.currentNode) {
            let currentCoords = {
                x: e.clientX - 110, // 110 - half of element's width
                y: e.clientY - 20 // 20 - half of element's header height
            }
            let updatedNodes = this.state.nodes;
            let currentNodeIndex = this.state.nodes.findIndex(node => node.id === this.state.currentNode.id)
            if (currentCoords.x < 0) {
                currentCoords.x = 10;
            }
            if (currentCoords.y < 0) {
                currentCoords.y = 10;
            }
            if (currentCoords.x + 220 > e.currentTarget.offsetWidth) {
                currentCoords.x = e.currentTarget.offsetWidth - 230;
            }
            if (currentCoords.y + 140 > e.currentTarget.offsetHeight) {
                currentCoords.y = e.currentTarget.offsetHeight - 145;
            }
           
            updatedNodes[currentNodeIndex].x = currentCoords.x;
            updatedNodes[currentNodeIndex].y = currentCoords.y; 
            this.setState({
                nodes: updatedNodes
            })
        }
    };

    mouseUpHandler = e => {  
        if (this.state.currentLine) {
            if (e.target.getAttribute('data-element') === 'controller') { 
                let to = e.target.getBoundingClientRect();               
                let currentLineIndex = this.state.lines.findIndex(line => line.id === this.state.currentLine)
                let updatedLines = this.state.lines;
                updatedLines[currentLineIndex].to = to;
                //     // let coords = this.getControllerCoords(e);
                //     // updatedLines[currentLineIndex].x2 = coords.horizontal;
                //     // updatedLines[currentLineIndex].y2 = coords.vertical;                
            } else {
                let currentLineIndex = this.state.lines.findIndex(line => line.id === this.state.currentLine)
                let updatedLines = this.state.lines;
                updatedLines.splice(currentLineIndex, 1)
            }
            
            this.setState({
                currentLine: null
            })
        }

        if (this.state.currentNode) {
            this.setState({
                currentNode: null
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
                        // x1={line.x1} 
                        // y1={line.y1} 
                        // x2={line.x2} 
                        // y2={line.y2} 
                        from={line.from}
                        to={line.to}
                        key={line.id} 
                        onClick={this.lineClickHandler}
                    />
                ))}
                {this.state.nodes.map(node => (
                    <Node x={node.x} y={node.y} key={node.id} id={node.id}/>
                ))}                
            </div>        
        )
    }
}