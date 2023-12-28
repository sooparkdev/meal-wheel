import styles from "@/components/UserAvatar/UserAvatar.module.css";
import Image from "next/image";

const UserAvatar = ({ imageUrl, altText, size }) => {
  let width = 10; // Default width
  let height = 10; // Default height

  // Adjust dimensions based on size prop
  if (size === "small") {
    width = 30;
    height = 30;
  } else if (size === "large") {
    width = 100;
    height = 100;
  }

  const handleError = (e) => {
    if (e.target.src !== defaultAvatar) {
      e.target.src = defaultAvatar;
    }
  };

  return (
    <div className={styles.imageContainer}>
      <Image
        className={`${styles.avatar} ${styles[size] || ""}`}
        src={imageUrl || "/rat.jpg"}
        alt={altText || "Profile Image"}
        width={width}
        height={height}
        layout="responsive"
        objectFit="contain"
      />
    </div>
    //   <Image
    //   className={`${styles.avatar} ${sizeClass}`}
    //     src={imageUrl || defaultAvatar}
    //     alt={altText || 'Profile Image'}
    //     onError={handleError}
    // width={width}
    // height={height}
    // layout="responsive"
    //   />
  );
};

export default UserAvatar;
