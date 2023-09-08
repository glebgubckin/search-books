import { AboutBook } from "@/widgets";
import { FC, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { IBook } from "@/types";

const BookPage: FC = () => {
  const { bookId } = useParams();
  const book = useLoaderData() as IBook;

  useEffect(() => {
    document.title = book.volumeInfo.title;
  }, [book.volumeInfo.title]);

  return <AboutBook bookId={bookId || ""} initialData={book} />;
};

export default BookPage;
