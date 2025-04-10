import React from 'react';
import { MantineProvider as BaseMantineProvider, MantineThemeOverride } from '@mantine/core';

interface MantineProviderProps {
  children: React.ReactNode;
}

// Create theme with primary color blue
const theme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'blue',
  defaultRadius: 'md',
};

export const MantineProvider: React.FC<MantineProviderProps> = ({ children }) => {
  return <BaseMantineProvider theme={theme}>{children}</BaseMantineProvider>;
};

export default MantineProvider;
