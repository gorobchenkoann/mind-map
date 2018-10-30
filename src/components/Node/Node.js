import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { Header, Button, TextEditor } from '../';

import styles from './Node.scss';

export class Node extends React.Component {    
    state = {
        mouseOn: false,
        showEditor: true,
    }
    node = React.createRef();

    headerClickHandler = () => {
        console.log('kek')
        return <h1>kek</h1>
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
                {this.state.mouseOn && 
                <React.Fragment>
                    <div id={Math.random().toString(36).substr(2, 9)} data-element='controller' className={`${styles.controller} ${styles.top}`}></div>
                    <div id={Math.random().toString(36).substr(2, 9)} data-element='controller' className={`${styles.controller} ${styles.bottom}`}></div>
                    <div id={Math.random().toString(36).substr(2, 9)} data-element='controller' className={`${styles.controller} ${styles.left}`}></div>
                    <div id={Math.random().toString(36).substr(2, 9)} data-element='controller' className={`${styles.controller} ${styles.right}`}></div>
                </React.Fragment>
                }   
                <Header 
                    className={styles.header} 
                    onDoubleClick={this.headerClickHandler}
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