import * as d3 from 'd3';

const CIRCLE_PADDING = 50;

function makeId() {
    return Math.random().toString(36).substr(2, 9);
};

d3.select('svg').on('click', svgClickHandler);

function svgClickHandler() {
    if (d3.event.target.tagName === 'svg') {
        let [x, y] = d3.mouse(this);
        // Добавляет прямоугольную область вокруг circle,
        // чтобы точки не располагались слишком близко
        d3.select(this).append('rect') 
            .attr('x', x - CIRCLE_PADDING / 2)
            .attr('y', y - CIRCLE_PADDING / 2)
            .attr('width', CIRCLE_PADDING)
            .attr('height', CIRCLE_PADDING)
            .attr('fill', 'transparent')         
        d3.select(this).append('circle')
            .attr('cx', x)
            .attr('cy', y)
            .classed('point', true)
            .attr('id', makeId())   
            .on('mouseover', circleMouseOverHandler)
            .on('mouseout', circleMouseOutHandler)
        }    
}

function circleMouseOverHandler() {
    d3.select(this)
        .classed('point--active', true)
}

function circleMouseOutHandler() {
    d3.select(this)
        .classed('point--active', false)
        .classed('point', true)
}
