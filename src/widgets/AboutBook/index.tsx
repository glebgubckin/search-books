import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { IBook } from "@/types";
import { bookService } from "@/api";
import { Loader } from "@/components";
import { useNavigate } from "react-router-dom";
import styles from "./aboutBook.module.scss";

interface AboutBookProps {
  bookId: string;
  initialData: IBook;
}

const AboutBook: FC<AboutBookProps> = ({ bookId, initialData }) => {
  const {
    data: book,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => bookService.getBookById(bookId),
    refetchOnWindowFocus: false,
    initialData,
  });
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.cover}>
        <img
          src={book?.volumeInfo.imageLinks.thumbnail}
          alt={book?.volumeInfo.title}
        />
      </div>
      <div className={styles.info}>
        {isFetching ? (
          <Loader />
        ) : (
          <>
            {isError ? <span>Error. Try again later</span> : null}
            <span className='goBack' onClick={() => navigate(-1)}>
              Go back
            </span>
            {book.volumeInfo.categories ? (
              <>
                {book.volumeInfo.categories.map((category) => (
                  <p>{category}</p>
                ))}
              </>
            ) : null}
            <h1 className={styles.title}>{book.volumeInfo.title}</h1>
            <p className={styles.author}>
              {book.volumeInfo.authors && book.volumeInfo.authors.join(", ")}
            </p>
            <p className={styles.description}>{book?.volumeInfo.description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutBook;
