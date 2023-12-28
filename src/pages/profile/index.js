import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/profile.module.css";

const ProfilePage = () => {
  const { userDetails } = useAuthContext();

  const {
    username,
    email,
    profileImageUrl,
    bio,
    neighborhoods,
    dietaryPreferences,
  } = userDetails || {};

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <Image
          src={profileImageUrl}
          alt="Profile Image"
          width={100}
          height={100}
          className={styles.profileImage}
        />
        <h1>{username}</h1>
      </div>
      <Link href="/profile/update">
        <span className={styles.text}>Edit Profile</span>
      </Link>
      <div className={styles.profileDetails}>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Bio:</strong> {bio}
        </p>
        <div>
          <strong>Neighborhoods:</strong>
          <ul>
            {neighborhoods?.map((neighborhood) => (
              <li key={neighborhood}>{neighborhood}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Dietary Preferences:</strong>
          <ul>
            {dietaryPreferences?.map((preference) => (
              <li key={preference}>{preference}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
