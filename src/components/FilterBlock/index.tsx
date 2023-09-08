import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/hooks/index";
import styles from "./filterBlock.module.scss";
import { useQueryClient } from "@tanstack/react-query";

interface FilterBlockProps {
  title: string;
  selectValue: string;
  setSelectValue: ActionCreatorWithPayload<string>;
  options: string[];
}

const FilterBlock: FC<FilterBlockProps> = ({
  title,
  selectValue,
  setSelectValue,
  options,
}) => {
  const dispatch = useAppDispatch();
  const queryClinet = useQueryClient();

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <Select
        defaultValue={selectValue}
        onValueChange={(value: string) => {
          dispatch(setSelectValue(value));
          queryClinet.resetQueries();
        }}
      >
        <SelectTrigger className={styles.select}>
          <SelectValue placeholder='all' />
        </SelectTrigger>
        <SelectContent>
          {
            // Использовал index как key, так как количество опций не меняется
            options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBlock;
