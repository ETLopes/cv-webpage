import React from 'react';
import { Tooltip, Text } from '@mantine/core';

const VisualCues: React.FC = () => {
  return (
    <div style={{ position: 'absolute', top: 10, right: 10 }}>
      <Tooltip label="Use arrow keys to move the character" position="left" withArrow>
        <Text size="sm" color="blue">
          Move Character
        </Text>
      </Tooltip>
      <Tooltip label="Explore the house layout" position="left" withArrow>
        <Text size="sm" color="blue">
          Explore House
        </Text>
      </Tooltip>
      <Tooltip label="Check out different careers" position="left" withArrow>
        <Text size="sm" color="blue">
          Career Info
        </Text>
      </Tooltip>
    </div>
  );
};

export default VisualCues; 