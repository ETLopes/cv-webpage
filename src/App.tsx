import React from 'react';
import { Box, Container, Paper, Text, Title } from '@mantine/core';
import './App.css';
import GameCanvas from './components/game/Canvas';
import CareerPanel from './components/CareerPanel';
import VisualCues from './components/VisualCues';

const App: React.FC = () => {
  return (
    <Container size="xl" p="md">
      <Title order={1} ta="center" mb="lg">
        MetaTask Simulation
      </Title>

      <Paper shadow="md" p="md" mb="lg">
        <Text mb="md">A canvas-based simulation built with React, TypeScript, and PixiJS.</Text>

        <Box h={500} style={{ border: '1px solid #eee', position: 'relative' }}>
          <GameCanvas width={800} height={500} />
          <VisualCues />
        </Box>
      </Paper>

      <CareerPanel />
    </Container>
  );
};

export default App;
