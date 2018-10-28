import React from 'react';

import styles from './Line.scss';

export class Line extends React.Component {
    getCoords = (element) => {
        let horizontal = element.left + element.width / 2 || element.right + element.width / 2;
        let vertical = element.top + element.height / 2 || element.bottom + element.height / 2;
        return({
            horizontal: horizontal,
            vertical: vertical
        })
    }
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
                    d={`M 
                        ${this.getCoords(this.props.from).horizontal} 
                        ${this.getCoords(this.props.from).vertical} 
                        L ${this.getCoords(this.props.to).horizontal} 
                        ${this.getCoords(this.props.to).vertical} `}
                >
                </path>
            </svg>
        )
    }    
}