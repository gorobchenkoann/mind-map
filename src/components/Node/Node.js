import React from 'react';
import { Header, Button } from '../';

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
        let { id, x, y } = this.props;
        return (     
            <div  
                id={id}                            
                className={styles.node}
                style={{
                    top: y,
                    left: x                   
                }}        
                onDoubleClick={(e) => {e.stopPropagation()}}   
                onMouseEnter={this.mouseEnterHandler}
                onMouseLeave={this.mouseLeaveHandler}               
            >      
                <Controller id={id} position='top' mouseOn={this.state.mouseOn}/>
                <Controller id={id} position='bottom' mouseOn={this.state.mouseOn}/>
                <Controller id={id} position='left' mouseOn={this.state.mouseOn}/>
                <Controller id={id} position='right' mouseOn={this.state.mouseOn}/>

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
                    this.props.children
                }
            </div>
        )
    }    
}