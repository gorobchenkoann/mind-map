import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import styles from './Node.scss';

export class Node extends React.Component {
    
    state = {
        focused: false
    }
    node = React.createRef();
    
    componentDidMount() {
        this.focusNode();
    }

    focusNode = () => {   
        this.setState({
            focused: true,
        });     
        this.node.current.focus();
    }

    blurNode = (e) => {
        this.setState({
            focused: false
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
                onClick={this.focusNode}
                onFocus={this.focusNode}  
                // onBlur={this.blurNode}                                
            >
                {this.state.focused && 
                <React.Fragment>
                    <div id={Math.random().toString(36).substr(2, 9)} data-element='controller' className={`${styles.controller} ${styles.top}`}></div>
                    <div id={Math.random().toString(36).substr(2, 9)} data-element='controller' className={`${styles.controller} ${styles.bottom}`}></div>
                    <div id={Math.random().toString(36).substr(2, 9)} data-element='controller' className={`${styles.controller} ${styles.left}`}></div>
                    <div id={Math.random().toString(36).substr(2, 9)} data-element='controller' className={`${styles.controller} ${styles.right}`}></div>
                </React.Fragment>
                }                
                <div 
                    className={styles.header} 
                    data-element='header'                    
                ></div>
                <div                    
                    className={styles.editor}
                    ref={this.node}
                    contentEditable={true}  
                    placeholder={'Type something...'}  
                >
                </div>                
            </div>
        )
    }    
}