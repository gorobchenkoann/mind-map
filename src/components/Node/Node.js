import React from 'react';
import { IconContext } from 'react-icons';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import styles from './Node.scss';

export class Node extends React.Component {    
    state = {
        mouseOn: false,
        showEditor: true
    }
    node = React.createRef();
      
    componentDidMount() {
        this.focusNode();
    }

    focusNode = () => {    
        this.node.current.focus();
    }


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
                {(this.state.mouseOn || this.state.focused) && 
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
                    onDoubleClick={this.headerClickHandler}        
                >
                    <button 
                        onClick={this.btnClickHandler}
                        className={styles.button}
                    >
                        {this.state.showEditor ? 
                        <IconContext.Provider value={{ color: '#e987d9'}}>
                            <FaAngleUp />
                        </IconContext.Provider> :
                        <IconContext.Provider value={{ color: '#e987d9'}}>
                            <FaAngleDown />
                        </IconContext.Provider>
                        }
                    </button>
                </div>
                <div       
                    style={{
                        display: this.state.showEditor ? 'block' : 'none'
                    }}             
                    className={styles.editor}
                    ref={this.node}
                    onClick={this.focusNode}
                    onFocus={this.focusNode}  
                    contentEditable={true}  
                    placeholder={'Type something...'}  
                >
                </div>                
            </div>
        )
    }    
}