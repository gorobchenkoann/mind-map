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
        this.node.current.focus();
    }

    render() {
        return (       
            <div 
                data-element='node'                
                className={styles.node}
                style={{
                    top: this.props.y - 50 + 'px',
                    left: this.props.x - 90 + 'px'                    
                }}                                           
            >
                <div className={`${styles.controller} ${styles.top}`}></div>
                <div className={`${styles.controller} ${styles.bottom}`}></div>
                <div className={`${styles.controller} ${styles.left}`}></div>
                <div className={`${styles.controller} ${styles.right}`}></div>
                <div className={styles.header}>
                </div>
                <div
                    onClick={this.focusNode}
                    onFocus={this.focusNode}   
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