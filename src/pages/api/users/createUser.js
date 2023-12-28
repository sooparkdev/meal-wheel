import chainMiddlewares from "@/util/chainMiddlewares";
import checkMethod from "@/util/checkMethod";
import { checkAndAddDocument } from "@/lib/firebase/firestoreAdmin";

async function finalHandler(req, res) {
  try {
    const { uid } = req.body; 
    console.log("Received UID:", uid);

    const newUserData = {
      uid,
      hasCompletedOnboarding: false,
    };

    await checkAndAddDocument('users', uid, newUserData)
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
}

export default chainMiddlewares(
  [checkMethod(["POST"])],
  finalHandler
);
