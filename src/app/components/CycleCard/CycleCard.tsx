import { Card, Image, Text, Group, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useStyles } from "./styles";

interface CycleCardProps {
  id: string
  name: string
  description: string
  basePrice: number
}

export function CycleCard(props: CycleCardProps) {
  const { id, name, description, basePrice } = props

  const navigate = useNavigate()

  const { classes } = useStyles();

  const moveToRent = () => { navigate(`/rent/${ id }`) }

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection} onClick={ moveToRent }>
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt={ name } />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text fw={500}>{ name }</Text>
          <Text className={ classes.description } fz="xs" c="dimmed">
            { description }
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.section} >
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              From ${ basePrice }
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              per day
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }} onClick={ moveToRent }>
            Rent now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}