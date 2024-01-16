import chainMiddlewares from "@/util/chainMiddlewares";
import checkMethod from "@/util/checkMethod";
import { updateDocument } from "@/lib/firebase/firestoreAdmin";
import { bucket } from "@/lib/firebase/firebaseAdmin";
import updateUser from "@/services/userServices";

async function finalHandler(req, res) {
  const { uid, ...updateData } = req.body;
  console.log("Received UID:", uid);
  console.log("update data:", updateData);

  const result = await updateUser(uid, updateData);

  // Respond with success message and updated fields
  if (result.success) {
    return res.status(200).json({
      message: result.message,
      updatedFields: result.updatedFields,
    });
  } else {
    // Handle any errors that the service might throw
    return res.status(500).json({
      message: result.message,
      error: result.error.message,
    });
  }
}

export default chainMiddlewares([checkMethod(["PATCH"])], finalHandler);
