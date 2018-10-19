import React from 'react';

import styles from './Line.scss';

export class Line extends React.Component {
    render() {
        return (
            <svg>
                <path className={styles.line} onClick={this.props.onClick}
                    d={`M ${this.props.x1} ${this.props.y1} L ${this.props.x2} ${this.props.y2}`}
                >
                </path>
            </svg>
        )
    }    
}