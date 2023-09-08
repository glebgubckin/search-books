import { createBrowserRouter } from "react-router-dom";
import BookPage from "./BookPage/BookPage";
import HomePage from "./HomePage/HomePage";
import { MainLayout } from "@/layouts";
import { bookService } from "@/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/:bookId",
        element: <BookPage />,
        loader: async ({ params }) => {
          const bookId = params.bookId || "";
          return await bookService.getBookById(bookId);
        },
      },
    ],
  },
]);

export default router;
