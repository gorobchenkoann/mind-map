import React from 'react';

import styles from './Line.scss';

export class Line extends React.Component {
    render() {
        return (
            <svg style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '100vw',
                height: '100vh'
            }}>
                <path className={styles.line} onClick={this.props.onClick}
                    d={`M ${this.props.x1} ${this.props.y1} L ${this.props.x2} ${this.props.y2}`}
                >
                </path>
            </svg>
        )
    }    
}