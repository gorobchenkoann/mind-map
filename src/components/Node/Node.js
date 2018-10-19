import React from 'react';

import styles from './Node.scss';

export class Node extends React.Component {
    constructor(props) {
        super(props);
        this.node = React.createRef();
    }

    componentDidMount() {
        this.focusNode();
    }

    focusNode() {
        this.node.current.focus();
    }

    render() {
        return (            
            <div 
                data-element='node'                
                className={styles.node}
                style={{
                    display: 'flex',
                    top: this.props.y - 30 + 'px',
                    left: this.props.x - 70 + 'px',
                    width: '140px',
                    minHeight: '60px'
                }}
                onClick={()=>{this.focusNode()}}
                onFocus={()=>{this.focusNode()}}
                            
            >
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