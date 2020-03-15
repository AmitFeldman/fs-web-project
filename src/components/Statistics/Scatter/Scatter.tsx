import React, {FC, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {getRandomColor} from '../../../utils/random-util';

interface ScatterProps<Data> {
  data: Data[];
  xProp: keyof Data;
  yProp: keyof Data;
  sizeProp: keyof Data;
  width: number;
  height: number;
  xLabel: string;
  yLabel: string;
}

// This is all trash code
const Scatter: FC<ScatterProps<any>> = ({
  data,
  xProp,
  yProp,
  sizeProp,
  width: originalWidth,
  height: originalHeight,
  xLabel,
  yLabel,
}) => {
  const scatter = useRef<SVGSVGElement>(null);

  // set the dimensions and margins of the graph
  const margin = {top: 30, right: 30, bottom: 50, left: 60},
    width = originalWidth - margin.left - margin.right,
    height = originalHeight - margin.top - margin.bottom;

  useEffect(() => {
    // Container
    const svg = d3
      .select(scatter.current)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    var x = d3
      .scaleLinear()
      .domain([0, Math.max(...data.map(d => d[xProp]))])
      .range([0, width]);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(Math.max(...data.map(d => d[yProp])))
          .tickFormat(d3.format('d'))
      );
    svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'end')
      .attr('fill', 'white')
      .attr('x', width)
      .attr('y', height + 40)
      .text(xLabel);

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([0, Math.max(...data.map(d => d[yProp]))])
      .range([height, 0]);
    svg.append('g').call(
      d3
        .axisLeft(y)
        .ticks(Math.max(...data.map(d => d[yProp])))
        .tickFormat(d3.format('d'))
    );
    svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', -45)
      .attr('fill', 'white')
      .attr('dy', '.75em')
      .attr('transform', 'rotate(-90)')
      .text(yLabel);

    // Add dots
    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d[xProp]))
      .attr('cy', d => y(d[yProp]))
      .attr('r', d => d[sizeProp] * 3)
      .style('fill', () => getRandomColor());
  }, [
    data,
    height,
    margin.left,
    margin.top,
    width,
    xProp,
    yProp,
    xLabel,
    yLabel,
    sizeProp,
  ]);

  return (
    <svg
      className="container"
      ref={scatter}
      width={originalWidth}
      height={originalHeight}
    />
  );
};

export default Scatter;
