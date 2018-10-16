import * as d3 from 'd3';

const CIRCLE_PADDING = 50;

let mouseDownElement = null;

function makeId() {
    return Math.random().toString(36).substr(2, 9);
};

function createNode() {
    let id = makeId();
    let x = d3.event.clientX;
    let y = d3.event.clientY;
 
    d3.select('svg').append('rect') 
        .attr('x', x - CIRCLE_PADDING / 2)
        .attr('y', y - CIRCLE_PADDING / 2)
        .attr('width', CIRCLE_PADDING)
        .attr('height', CIRCLE_PADDING)
        .attr('fill', 'transparent')         
    d3.select('svg').append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('class', 'point')
        .attr('id', id)   
}

function mouseDownHandler() {
    d3.event.preventDefault();

    mouseDownElement = d3.event.target.tagName;
    
    d3.select(this)
        .on('mousemove', mouseMoveHandler)
        .on('mouseup', mouseUpHandler)
}

function mouseMoveHandler() {
    console.log('move')
}

function mouseUpHandler() {
    console.log('up')
    if (d3.event.target.tagName === 'svg') {
        if (mouseDownElement === 'svg') {
            createNode();
        }        
    } else if (d3.event.target.tagName === 'circle') {
        console.log('circle')
    }
        
    d3.select('svg')
        .on('mousemove', null)
        .on('mouseup', null)
}

d3.select('svg')
    .on('mousedown', mouseDownHandler)
 