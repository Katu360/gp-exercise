import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  rentDetailWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: theme.white,
  },

  rentDetailTitle: {
    color: theme.colors.gray[6],
  },

  rentDetailDescription: {
    color: theme.black,
  },
}));