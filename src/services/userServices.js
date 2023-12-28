import { updateDocument } from "@/lib/firebase/firestoreAdmin";

export default async function updateUser(uid, data) {

console.log(uid, data)
     try {
       await updateDocument("users", uid, data);
       return {
         success: true,
         message: "User updated successfully",
         updatedFields: data,
       };
     } catch (error) {
       console.error("Error updating user:", error);
       return {
         success: false,
         message: "Error updating user",
         error: error,
       };
     }
   }