import styles from "./ProfileFeed.module.css";
import {ProfileItems} from "../../components/ProfileItems/ProfileItems";
import {ProfileNav} from "../../components/ProfileNav/ProfileNav";

export const ProfileFeed = () => (
    <div className={styles.wrapper}>
        <ProfileNav/>

        <ProfileItems/>
    </div>
);
