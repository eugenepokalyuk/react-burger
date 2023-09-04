import styles from "./ProfilePage.module.css";
import { ProfileNav } from "../../components/ProfileNav/ProfileNav";
import { ProfileDetails } from "../../components/ProfileDetails/ProfileDetails";

export const ProfilePage = () => (
  <div className={styles.wrapper}>
    <ProfileNav />
    <ProfileDetails />
  </div>
)