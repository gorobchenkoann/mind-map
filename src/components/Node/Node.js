import React from 'react';

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

    onclick = e => {
        console.log('kek')
    }

    render() {
        return (       
            <div                              
                className={styles.node}
                style={{
                    top: this.props.y - 50 + 'px',
                    left: this.props.x - 90 + 'px'                    
                }}            
                onClick={this.focusNode}
                onFocus={this.focusNode}  
                // onBlur={this.blurNode}                                
            >
            {this.state.focused && 
                <React.Fragment>
                    <div data-element='controller' className={`${styles.controller} ${styles.top}`}></div>
                    <div data-element='controller' className={`${styles.controller} ${styles.bottom}`}></div>
                    <div data-element='controller' className={`${styles.controller} ${styles.left}`}></div>
                    <div data-element='controller' className={`${styles.controller} ${styles.right}`}></div>
                </React.Fragment>
            }                
                <div className={styles.header}></div>
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