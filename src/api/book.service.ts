import { IBook, IBooks } from "@/types";
import request from "./api";

interface getBooksparameters {
  searchQuery?: string;
  nextPage?: number;
  category?: string;
  sortingMethod?: string;
}

class BookService {
  async getBookById(bookId: string): Promise<IBook> {
    try {
      const response = await request(`/${bookId}`);
      return await response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async getBooks({
    searchQuery = "",
    nextPage = 0,
    category = "all",
    sortingMethod = "relevance",
  }: getBooksparameters): Promise<{ data: IBooks; nextPage?: number }> {
    const startIndex = nextPage * 30;
    const subject = category === "all" ? "" : `+subject:${category}`;
    try {
      const response = await request.get("", {
        params: {
          q: `${searchQuery}${subject}`,
          startIndex: startIndex,
          orderBy: sortingMethod,
        },
      });
      const books = (await {
        ...response.data,
        items: response.data.items ?? [],
      }) as IBooks;
      if (!books.items.length || books.items.length % 30 !== 0) {
        return {
          data: books,
        };
      }
      return {
        data: books,
        nextPage: nextPage + 1,
      };
    } catch (error) {
      throw new Error();
    }
  }
}

const bookService = new BookService();

export default bookService;
