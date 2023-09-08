import { FC, useEffect } from "react";
import { Books } from "@/widgets";
import { useSearchQuery } from "../../hooks/index";

const HomePage: FC = () => {
  const searchQuery = useSearchQuery();

  useEffect(() => {
    document.title = "Search for books";
  }, []);

  if (searchQuery === "") {
    return <></>;
  } else {
    return (
      <div className='page'>
        <Books searchQuery={searchQuery} />
      </div>
    );
  }
};

export default HomePage;
