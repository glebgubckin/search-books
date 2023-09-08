import { FC, MouseEvent } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { bookService } from "@/api";
import { Book } from "@/components";
import { Button } from "@/components/ui";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/stores";
import Loader from "@/components/Loader";
import styles from "./books.module.scss";

const Books: FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const { category, sortingMethod } = useAppSelector(
    (state: RootState) => state.search
  );
  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["books", searchQuery, category, sortingMethod],
    queryFn: ({ pageParam }) =>
      bookService.getBooks({
        searchQuery,
        nextPage: pageParam,
        category,
        sortingMethod,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
  });

  const loadMoreBooks = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchNextPage();
  };

  return (
    <div className={styles.wrapper}>
      {isFetching && !data ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <span>Error: Try again later</span>
          ) : (
            <span className={styles.found}>
              Found {data?.pages[0].data.totalItems} results
            </span>
          )}
          <div id='books' className={styles.books}>
            {data?.pages.map((page) => {
              return page?.data.items.map((book) => (
                <Book key={book.id} book={book} />
              ));
            })}
            {isFetchingNextPage ? <span>Loading...</span> : null}
          </div>
          {hasNextPage ? (
            <Button id='load-more' onClick={(e) => loadMoreBooks(e)}>
              Load more
            </Button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Books;
