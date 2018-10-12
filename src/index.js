import * as d3 from 'd3';

const CIRCLE_PADDING = 50;
var lines = [];
var subline = [];
var countClicks = 0;

function makeId() {
    return Math.random().toString(36).substr(2, 9);
};

d3.select('svg').on('click', svgClickHandler);

// d3.selectAll('circle').append('text')
//             .attr('x', this.x + 10)
//             .attr('y', this.y + 10)
//             .text(()=>{return this.id})

function svgClickHandler() {
    if (d3.event.target.tagName === 'svg') {
        let id = makeId();
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
            .attr('id', id)   
            .on('mouseover', circleMouseOverHandler)
            .on('mouseout', circleMouseOutHandler)
            .on('click', circleClickHandler)
        d3.select(this).append('text')
            .attr('x', x + 10)
            .attr('y', y + 10)
            .text(`id: ${id}`)
        }    

        lines.forEach(line => {
            var start_id = line[0];
            var end_id = line[1];
            var start = d3.select('svg').select(`#${start_id}`);
            var end = d3.select('svg').select(`#${end_id}`);
            d3.select('svg')
                .append('path')
                .attr('d', d3.svg.line()
                    .x()
                )
        })
}

function circleClickHandler() {
    if (countClicks === 2) {
        lines.push(subline);
        subline = [];
        countClicks = 0;
    }
    subline.push(this.id);
    countClicks++;

    console.log(lines);
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
