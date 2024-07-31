import styles from "./avatar.module.css";

function Avatar({ src, size }) {
  return (
    <div className={styles.avatar_wrapper}>
      <img
        className={styles.avatar_img}
        src="./public/default_u.jfif"
        alt="User profile"
      />
    </div>
  );
}

export default Avatar;
