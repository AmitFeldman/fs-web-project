import React, {FC, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {getRandomColor} from '../../../utils/random-util';

interface BarProps<Data> {
  data: Data[];
  xProp: keyof Data;
  yProp: keyof Data;
  width: number;
  height: number;
  xLabel: string;
  yLabel: string;
}

// This is all trash code
const Bar: FC<BarProps<any>> = ({
  data,
  xProp,
  yProp,
  width: originalWidth,
  height: originalHeight,
  xLabel,
  yLabel,
}) => {
  const bar = useRef<SVGSVGElement>(null);

  // set the dimensions and margins of the graph
  const margin = {top: 30, right: 30, bottom: 50, left: 60},
    width = originalWidth - margin.left - margin.right,
    height = originalHeight - margin.top - margin.bottom;

  useEffect(() => {
    // Container
    const svg = d3
      .select(bar.current)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // X Axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map(d => d[xProp]))
      .padding(0.2);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');
    svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'end')
      .attr('fill', 'white')
      .attr('x', width)
      .attr('y', height + 25)
      .text(xLabel);

    // Add Y axis
    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, Math.max(...data.map(d => d[yProp]))]);
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

    // Bars
    svg
      .selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d): any => x(d[xProp]))
      .attr('y', d => y(d[yProp]))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d[yProp]))
      .attr('fill', getRandomColor());
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
  ]);

  return (
    <svg
      className="container"
      ref={bar}
      width={originalWidth}
      height={originalHeight}
    />
  );
};

export default Bar;
