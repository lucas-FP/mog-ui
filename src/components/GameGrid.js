import React from 'react';
import styled from 'styled-components';

const getGridString = (n) => {
  let str = '';
  for (let i = 0; i < n; i++) {
    str += ' 1fr';
  }
  return str;
};

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: ${(props) => getGridString(props.xSize)};
  grid-template-rows: ${(props) => getGridString(props.ySize)};
`;
const GridCell = styled.div`
  border: 1px solid #000;
`;

export function GameGrid({
  className,
  gridData,
  renderMap,
  onClick,
  width,
  unit,
}) {
  const ySize = (gridData && gridData.length) || 0;
  const xSize = (ySize && gridData[0].length) || 0;

  const handleClick = (i) => {
    const coordinates = [i % xSize, Math.floor(i / xSize)];
    onClick && onClick(coordinates);
  };

  const renderCells = () =>
    xSize &&
    gridData.flat().map((c, i) => (
      <GridCell key={i} onClick={() => handleClick(i)}>
        {renderMap[c]}
      </GridCell>
    ));

  return (
    <GridContainer xSize={xSize} ySize={ySize} className={className}>
      {renderCells()}
    </GridContainer>
  );
}
