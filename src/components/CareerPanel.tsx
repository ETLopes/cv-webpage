import React from 'react';
import { Card, Text, Title } from '@mantine/core';
import { Career, careers } from '../models/Career';

const CareerPanel: React.FC = () => {
  return (
    <div>
      {careers.map((career: Career) => (
        <Card key={career.id} shadow="sm" padding="lg" style={{ marginBottom: '20px' }}>
          <Title order={3}>{career.name}</Title>
          <Text size="sm" color="dimmed">
            {career.description}
          </Text>
          <Text size="sm">Salary: ${career.salary.toLocaleString()}</Text>
          <Text size="sm">Skills Required: {career.skillsRequired.join(', ')}</Text>
        </Card>
      ))}
    </div>
  );
};

export default CareerPanel; 