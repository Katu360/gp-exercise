import React from "react";
import { Text } from "@mantine/core";

import { RentDetailModalItem } from "../../../../core/types/RentDetailItem";

import { useStyles } from "./styles";


interface RentDetailItemProps extends RentDetailModalItem {}

export function RentDetailItem(item: RentDetailItemProps) {

  const { classes } = useStyles()

  return (
    <div className={ classes.rentDetailWrapper }>
      <Text size="md" className={classes.rentDetailTitle}>
        { item.label }
      </Text>
      <Text className={classes.rentDetailTitle}>{ item.value }</Text>
    </div>
  )
}