import { Card, Image, Text, Group, Button } from '@mantine/core';
import { useStyles } from "./styles";

interface CycleCardProps {
  name: string
  description: string
}

export function CycleCard(props: CycleCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt={ props.name } />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text fw={500}>{ props.name }</Text>
          <Text className={ classes.description } fz="xs" c="dimmed">
            { props.description }
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              $168.00
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              per day
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }}>
            Rent now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}