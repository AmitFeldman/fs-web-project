import React, {FC, useEffect, useRef} from 'react';
import * as d3 from 'd3';

interface BarProps<Data> {
  data: Data[];
  xAxis: keyof Data;
  yAxis: keyof Data;
  width: number;
  height: number;
}

// This is all trash code
const Bar: FC<BarProps<any>> = ({
  data,
  xAxis,
  yAxis,
  width: originalWidth,
  height: originalHeight,
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
      .domain(data.map(d => d[xAxis]))
      .padding(0.2);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, Math.max(...data.map(d => d[yAxis]))]);
    svg.append('g').call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d): any => x(d[xAxis]))
      .attr('y', d => y(d[yAxis]))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d[yAxis]))
      .attr('fill', '#558b2f');
  }, [data, height, margin.left, margin.top, width, xAxis, yAxis]);

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
