import { Header } from "@/widgets";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./mainLayout.module.scss";

const MainLayout: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.inner}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
