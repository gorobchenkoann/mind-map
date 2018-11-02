import React from 'react';
import { Header, Button, TextEditor } from '../';

import styles from './Node.scss';

const Controller = ({id, position, mouseOn}) => {
    return (
        <div 
            style={{
                visibility: mouseOn ? 'visible' : 'hidden'
            }}
            id={`${id}-${position}`} 
            data-element='controller' 
            className={`${styles.controller} ${styles[position]}`}
        ></div>
    )
}

export class Node extends React.Component {    
    state = {
        mouseOn: false,
        showEditor: true,
    }

    mouseEnterHandler = () => {
        this.setState({
            mouseOn: true
        })
    }

    mouseLeaveHandler = () => {
        this.setState({
            mouseOn: false
        })
    }

    btnClickHandler = () => {
        this.setState({
            showEditor: !this.state.showEditor
        })
    }

    makeId() {
        return Math.random().toString(36).substr(2, 9);
    };

    render() {
        return (     
            <div  
                id={this.props.id}                            
                className={styles.node}
                style={{
                    top: this.props.y,
                    left: this.props.x                   
                }}        
                onDoubleClick={(e) => {e.stopPropagation()}}   
                onMouseEnter={this.mouseEnterHandler}
                onMouseLeave={this.mouseLeaveHandler}               
            >      
                <Controller id={this.props.id} position='top' mouseOn={this.state.mouseOn}/>
                <Controller id={this.props.id} position='bottom' mouseOn={this.state.mouseOn}/>
                <Controller id={this.props.id} position='left' mouseOn={this.state.mouseOn}/>
                <Controller id={this.props.id} position='right' mouseOn={this.state.mouseOn}/>

                <Header 
                    className={styles.header} 
                >          
                    <Button 
                        onClick={this.btnClickHandler} 
                        className={styles.button} 
                        showEditor={this.state.showEditor}
                    />
                </Header>
                
                {this.state.showEditor && 
                    <TextEditor className={styles.editor}/>
                }
            </div>
        )
    }    
}