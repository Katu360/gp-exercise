import {Card, Container, Stack, Title} from "@mantine/core";
import React, {PropsWithChildren} from "react";

export function RentDetailModal({ children }: PropsWithChildren){

  return (
    <Container>
      <Title order={4}>Your rent details</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          { children }
        </Stack>
      </Card>
    </Container>
  )
}