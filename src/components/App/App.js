import React from 'react';
import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react';
import { Node } from '..';

import styles from './App.scss';

export class App extends React.Component {
    state = {
        nodes: {},
        lines: [],
        currentNode: null,
        currentLine: null,
    }    

    makeId() {
        return Math.random().toString(36).substr(2, 9);
    };

    createNode(e) {
        let id = this.makeId();
        let x = e.clientX - 140;
        let y = e.clientY - 70;
        let text = Plain.deserialize("");
 
        this.setState({
            nodes: {
                ...this.state.nodes,
                [id]: {
                    text: text,
                    x: x,
                    y: y                    
                }
            }
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
        let shift = {
            horizontal: (toNode.left - fromNode.left) / 2,
            vertical: (toNode.top - fromNode.top) / 2
        }
        let path = {
            horizontal: `M ${coords.x1} 
                ${coords.y1}
                L ${coords.x1 + shift.horizontal} 
                ${coords.y1}
                L ${coords.x1 + shift.horizontal} 
                ${coords.y2}
                L ${coords.x2}
                ${coords.y2} `,
            vertical: `M ${coords.x1} 
                ${coords.y1}
                L ${coords.x1} 
                ${coords.y1 + shift.vertical}
                L ${coords.x2} 
                ${coords.y1 + shift.vertical}
                L ${coords.x2}
                ${coords.y2} `,
            verticalHorizontal: `M ${coords.x1} 
                ${coords.y1}
                L ${coords.x1} 
                ${coords.y1 + shift.vertical * 2}
                L ${coords.x2}
                ${coords.y2} `,
            horizontalVertical: `M ${coords.x1} 
                ${coords.y1}
                L ${coords.x1 + shift.horizontal * 2} 
                ${coords.y1}
                L ${coords.x2}
                ${coords.y2} `
        }
        let fromContr = from.split('-')[1];
        let toContr = to.split('-')[1];

        const directionDict = {
            left: 'horizontal',
            right: 'horizontal',
            top: 'vertical',
            bottom: 'vertical'
        }

        if (directionDict[fromContr] === directionDict[toContr]) {
            var d = directionDict[fromContr] === 'horizontal' ? path.horizontal : path.vertical;
        } else {
            var d = directionDict[fromContr] === 'horizontal' ? path.horizontalVertical : path.verticalHorizontal
        }

        return(
            <path key={key} stroke='#896899' strokeWidth={2} fill='transparent'
                d={d}
            >
            </path>
        )
 
    }

    doubleClickHandler = e => {
        this.createNode(e);
    };

    mouseDownHandler = e => {
        // drag node
        if (e.target.getAttribute('data-element') === 'header') {
            let currentNode = e.target.parentElement.getAttribute('id');
            this.setState({ currentNode })
        }
        // draw line
        if (e.target.getAttribute('data-element') === 'controller') {
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
            let nodes = {
                ...this.state.nodes, 
                [this.state.currentNode]: {
                    ...this.state.nodes[this.state.currentNode],
                    x: currentCoords.x,
                    y: currentCoords.y
                }
            }
            this.setState({ nodes })
        }
    };

    mouseUpHandler = e => {  
        if (this.state.currentLine) {
            if (e.target.getAttribute('data-element') === 'controller') { 
                let to = e.target.id;               
                let currentLineIndex = this.state.lines.findIndex(line => line.id === this.state.currentLine.id)
                let updatedLines = this.state.lines;
                updatedLines[currentLineIndex].to = to;                
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

    editorChangeHandler = ({value}, id) => {
        let nodes = {
            ...this.state.nodes, 
            [id]: {
                ...this.state.nodes[id],
                text: value
            }
        }
        this.setState({ nodes })
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
                    {this.state.lines.map(line => 
                        this.drawLine(line.from, line.to, line.id)                      
                    )}
                </svg>
                {Object.entries(this.state.nodes).map(([id, node]) => (
                    <Node x={node.x} y={node.y} key={id} id={id} >
                        <Editor 
                            className={styles.editor} 
                            value={node.text} 
                            onChange={(editor) => this.editorChangeHandler(editor, id)} 
                        />
                    </Node>
                ))}                
            </div>   
        )
    }
}