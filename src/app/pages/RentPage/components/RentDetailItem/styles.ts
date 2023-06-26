import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  rentDetailWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: theme.white,
  },

  rentDetailTitle: {
    color: theme.colors.gray[ 6 ],
  },

  rentDetailDescription: {
    color: theme.black,
  },
}));