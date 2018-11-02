import React from 'react';
import { Node, Line, TextEditor } from '..';

import styles from './App.scss';

export class App extends React.Component {
    state = {
        nodeTree: [],
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
        let x = e.clientX - 140;
        let y = e.clientY - 70;
 
        this.setState({
            nodes: [...this.state.nodes, {id, x, y}],
            nodeTree: [...this.state.nodes, {id, pos: {x: x, y: y}, children: []}]
        }) 
    };

    drawLine(from, to, key) {
        let fromNode = document.getElementById(from).getBoundingClientRect();
        let toNode = document.getElementById(to).getBoundingClientRect();
        let coords = {
            x1: fromNode.left + 7,
            y1: fromNode.top + 7,
            x2: toNode.left + 7,
            y2: toNode.top + 7
        }
        return(
            <path key={key} stroke='#896899' strokeWidth={2}
                d={`M ${coords.x1} 
                    ${coords.y1}
                    L ${coords.x2}
                    ${coords.y2} `}
            >
            </path>
        )
 
    }

    doubleClickHandler = e => {
        this.createNode(e);
    };

    mouseDownHandler = e => {
        if (e.target.getAttribute('data-element') === 'header') {
            let currentNode = e.target.parentElement;
            let currentNodeInfo = currentNode.getBoundingClientRect();
            let currentNodeId = currentNode.getAttribute('id');
            this.setState({
                currentNode: {info: currentNodeInfo, id: currentNodeId},
            })
        }
        if (e.target.getAttribute('data-element') === 'controller') {
            console.log(e.target)
            let id = this.makeId();

            let from = e.target.getAttribute('id');
            let to = e.target.getAttribute('id');
            this.setState({
                lines: [...this.state.lines, {id, from, to}],
                currentLine: {
                    id: id,
                    x1: e.clientX,
                    y1: e.clientY,
                    x2: e.clientX,
                    y2: e.clientY
                }
            })
        }
    };

    mouseMoveHandler = e  => {
        if (this.state.currentLine) {
            this.setState({
                currentLine: { ...this.state.currentLine,
                    x2: e.clientX,
                    y2: e.clientY
                }
            })
        } else if (this.state.currentNode) {
            let currentCoords = {
                x: e.clientX - 140, // 140 - half of element's width
                y: e.clientY - 20 // 20 - half of element's header height
            }
            
            let updatedNodes = this.state.nodes;
            let currentNodeIndex = this.state.nodes.findIndex(node => node.id === this.state.currentNode.id)
                        
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
                let to = e.target.id;               
                let currentLineIndex = this.state.lines.findIndex(line => line.id === this.state.currentLine.id)
                let updatedLines = this.state.lines;
                updatedLines[currentLineIndex].to = to;    
                
                // add child node

            } else {
                let currentLineIndex = this.state.lines.findIndex(line => line.id === this.state.currentLine.id)
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
                <svg className={styles.svg}>
                    {this.state.currentLine && 
                        <path stroke='#896899' strokeWidth={2}
                            d={`M ${this.state.currentLine.x1} 
                            ${this.state.currentLine.y1} 
                            L ${this.state.currentLine.x2} 
                            ${this.state.currentLine.y2} `}
                        ></path>
                    }
                    {this.state.lines.map(line => (
                        this.drawLine(line.from, line.to, line.id)
                    ))}
                </svg>
                {this.state.nodes.map(node => (
                    <Node x={node.x} y={node.y} key={node.id} id={node.id}/>
                ))}                
            </div>   
        )
    }
}