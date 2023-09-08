import { FC, MouseEvent, KeyboardEvent, useEffect } from "react";
import { Input } from "@/components/ui";
import { Search } from "lucide-react";
import { categories, sortingMethods } from "@/lib/constants";
import { FilterBlock } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/stores";
import {
  changeValue,
  changeCategory,
  changeSortingMethod,
} from "@/stores/search.slice";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./header.module.scss";

const Header: FC = () => {
  const { value, category, sortingMethod } = useAppSelector(
    (state: RootState) => state.search
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";

  const search = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    navigate(`/?search=${value}`);
  };

  useEffect(() => {
    dispatch(changeValue(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Search for books</h1>
        <div className={styles.search}>
          <Input
            id='search'
            className={styles.input}
            value={value}
            onChange={(e) => dispatch(changeValue(e.target.value))}
            onKeyDown={(e) => e.key === "Enter" && search(e)}
          />
          <button className={styles.search__btn} onClick={(e) => search(e)}>
            <Search color='#ffffff' size={20} />
          </button>
        </div>
        <div className={styles.filter}>
          <FilterBlock
            title='Categories'
            selectValue={category}
            setSelectValue={changeCategory}
            options={categories}
          />
          <FilterBlock
            title='Sorting by'
            selectValue={sortingMethod}
            setSelectValue={changeSortingMethod}
            options={sortingMethods}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
