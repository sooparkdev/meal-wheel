import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import SearchableDropdown from "@/components/SearchableDropdown";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/components/ProfileForm/ProfileForm.module.css";
import UserAvatar from "../UserAvatar";
import Spinner from "@/components/Spinner";
import { updateUser } from "@/apiClient/userApi";

const neighborhoodsList = ["Downtown", "Midtown", "Uptown", "Suburb", "Rural"];
const dietaryPreferencesList = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Keto",
  "Paleo",
];

const ProfileForm = ({ isInitialSetup }) => {
  const router = useRouter();
  const { userAuthStatus, userDetails, setUserDetails } = useAuthContext();
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profileImage: null, // SHOULD THIS BE SOMETHING ELSE
    bio: "",
    neighborhoods: [],
    dietaryPreferences: [],
  });

  useEffect(() => {
    if (!isInitialSetup && userDetails) {
      console.log(userDetails);
      const {
        uid: _uid,
        createdDate: _createdDate,
        hasCompletedOnboarding: _hasCompletedOnboarding,
        ...displayData
      } = userDetails;
      setFormData(displayData);
    }
  }, [isInitialSetup, userDetails]);

  const [previewProfileImageUrl, setPreviewProfileImageUrl] = useState("");

  const fileInputRef = useRef();
  const triggerFileInput = (e) => {
    // Trigger the hidden file input click event
    e.stopPropagation();
    // Check if the input is not already active to avoid double clicks
    if (!fileInputRef.current || fileInputRef.current.disabled) {
      return;
    }
    fileInputRef.current.click();
  };

  if (userDetails === undefined) {
    return <Spinner />;
  }

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validateEmailFormat(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (formData.neighborhoods.length === 0)
      errors.neighborhoods = "Please select at least one neighborhood";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateFormData = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleStandardFieldChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the image to preview it
      setPreviewProfileImageUrl(URL.createObjectURL(file));
      updateFormData("profileImage", file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return; // 나중에 character limit, type verification 같은 거 implement

    const apiRequestData = new FormData();
    apiRequestData.append("uid", userAuthStatus.uid);

    if (isInitialSetup) {
      apiRequestData.append("isInitialSetup", true);

      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (key === "neighborhoods" || key === "dietaryPreferences") {
          if (value.length > 0) {
            value.forEach((item) => apiRequestData.append(key, item));
          } else {
            apiRequestData.append(key, null);
          }
        } else {
          apiRequestData.append(key, value);
        }
      });
    } else {
      let hasDataToSend = false;

      Object.keys(formData).forEach((key) => {
        console.log(key);
        console.log(formData[key]);
        console.log(userDetails[key]);
        if (formData[key] !== userDetails[key]) {
          const value = formData[key];
          if (key === "neighborhoods" || key === "dietaryPreferences") {
            if (value.length > 0) {
              value.forEach((item) => apiRequestData.append(key, item));
              hasDataToSend = true;
            } else {
              apiRequestData.append(key, null);
              hasDataToSend = true;
            }
          } else {
            apiRequestData.append(key, value);
            hasDataToSend = true;
          }
        }
      });

      if (!hasDataToSend) {
        return;
      }
    }
//
    try {
      const response = await updateUser(apiRequestData);
      setUserDetails((prev) => {
        // console.log("^^^^^PREV", prev);
        // console.log("^^^^^UPDATED FIELDS", response.updatedFields);
        return {
          ...prev,
          ...response.updatedFields,
        };
      });
      if (isInitialSetup) {
        router.push("/");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleStandardFieldChange}
        />
        {validationErrors.username && <p>{validationErrors.username}</p>}
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleStandardFieldChange}
        />
        {validationErrors.email && <p>{validationErrors.email}</p>}
      </label>
      <label>
        Profile Image:
        {/* <div
          for="profileImage"
          className={styles.custom}
          onClick={triggerFileInput}
        > */}
        <UserAvatar
          imageUrl={previewProfileImageUrl || formData.profileImageUrl}
        />
        {/* </div> */}
        <input
          ref={fileInputRef}
          type="file"
          name="profileImage"
          onChange={handleProfileImageChange}
          className={styles.hiddenInput}
        />
      </label>
      <label>
        Bio:
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleStandardFieldChange}
        />
      </label>
      Neighborhoods:
      <SearchableDropdown
        options={neighborhoodsList}
        selectedOptions={formData.neighborhoods}
        onSelectionChange={(newSelection) =>
          updateFormData("neighborhoods", newSelection)
        }
      />
      {validationErrors.neighborhoods && (
        <p>{validationErrors.neighborhoods}</p>
      )}
      Dietary Preferences:
      <SearchableDropdown
        options={dietaryPreferencesList}
        selectedOptions={formData.dietaryPreferences}
        onSelectionChange={(newSelection) =>
          updateFormData("dietaryPreferences", newSelection)
        }
      />
      <button type="submit"> {isInitialSetup ? "Submit" : "Update"}</button>
    </form>
  );
};

export default ProfileForm;
