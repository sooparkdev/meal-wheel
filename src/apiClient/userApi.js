import axios from "axios";

export const updateUserForm = async (apiRequestData) => {
  try {
    const response = await axios.patch(
      "/api/users/updateUserForm",
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


/*

custom hook 을 한다고 하면 이 파일은 필요 없을 듯?
we have one hook that sends all axios requests.
and we would have different config objects.
inside the config object, we would set the request type (GET, POST)
and we would also set the header and stuff. The config objects
are all preconfigured for each of the existing server endpoints.
and the client only chooses which config to use when fetching.

*/