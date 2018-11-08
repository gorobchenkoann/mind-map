import React from 'react';
import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react';
import { Node, Line } from '..';

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
                        <Line from={line.from} to={line.to} id={line.id}/>                    
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