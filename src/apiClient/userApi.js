import axios from "axios";

export const updateUser = async (apiRequestData) => {
  try {
    const response = await axios.patch(
      "/api/users/updateUser",
      apiRequestData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
