// components/Sidebar.js
import React from "react";
import Link from "next/link";
import styles from "./SidebarNav.module.css";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import { BsCalendar3 } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { MdFoodBank } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const SidebarNav = ({isExpanded, toggleSidebar}) => {
  const { logout } = useAuthContext();

  return (
    <nav
      className={`${styles.sidebar} ${
        isExpanded ? styles.expanded : styles.collapsed
      }`}
    >
      <div className={styles.section}>
        <MdFoodBank size={isExpanded ? 50 : 60} />
        <span className={styles.text}>
          <h1 className={styles.appName}> Meal Wheel </h1>
        </span>
      </div>

      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">
            <BsCalendar3 size={30} />
            <span className={styles.text}>Calendar</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/findCircles">
            <MdSearch size={40} />
            <span className={styles.text}>Find a Circle</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/myCircles">
            <HiUserGroup size={35} />
            <span className={styles.text}>My Circles</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/profile">
            <FaUserCircle size={35} />
            <span className={styles.text}>Profile</span>
          </Link>
        </li>
      </ul>
      <button onClick={logout} className={styles.section}>
        <MdOutlineLogout size={35} />
        <span className={styles.text}> Log Out </span>
      </button>

      <div className={styles.toggleButton} onClick={toggleSidebar}>
        {isExpanded ? (
          <MdKeyboardArrowLeft size={60} />
        ) : (
          <MdKeyboardArrowRight size={60} />
        )}
      </div>
    </nav>
  );
};

export default SidebarNav;
