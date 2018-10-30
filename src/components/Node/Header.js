import React from 'react';

export class Header extends React.Component {
    render() {
        return (
            <div
                data-element='header'
                className={this.props.className}
                onDoubleClick={this.props.onDoubleClick}
            >
                {this.props.children}
            </div>
        )
    }
}