import { FC } from "react";
import { IBook } from "@/types";
import { Link } from "react-router-dom";
import styles from "./book.module.scss";

const Book: FC<{ book: IBook }> = ({ book }) => {
  return (
    <div className={styles.book} id={`book ${book.id}`}>
      <Link className={styles.link} to={`/${book.id}`}>
        <img
          className={styles.cover}
          src={
            book.volumeInfo.imageLinks?.smallThumbnail ||
            book.volumeInfo.imageLinks?.thumbnail ||
            ""
          }
          alt={book.volumeInfo.title}
        />
      </Link>
      <span className={styles.category}>
        {book.volumeInfo.categories ? book.volumeInfo.categories[0] : ""}
      </span>
      <span className={styles.title}>{book.volumeInfo.title}</span>
      <span className={styles.author}>
        {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : ""}
      </span>
    </div>
  );
};

export default Book;
