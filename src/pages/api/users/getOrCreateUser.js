import chainMiddlewares from "@/util/chainMiddlewares";
import checkMethod from "@/util/checkMethod";
import { setDocumentWithId, getDocument } from "@/lib/firebase/firestoreAdmin";
import { FieldValue } from '@/lib/firebase/firebaseAdmin';

async function finalHandler(req, res) {
  try {
    const { uid } = req.query; 

    let user = await getDocument('users', uid);

    if(!user) {
      const newUser = {
        uid,
        hasCompletedOnboarding: false,
        createdDate: FieldValue.serverTimestamp()
      }

      try {
        await setDocumentWithId('users', uid, newUser);
        user = newUser;
      } catch (creationError) {
        return res.status(500).json({ error: "Error creating user" });
      }
    }

    /* Deliberately returning the user data instead of getting the doc just pushed to the db as the timestamp is not 
    used in the UI and to reduce additional read operation's cost and latency */
   res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUser API:", error);
    res.status(500).json({ error: error.message });
  }
}

export default chainMiddlewares(
  [checkMethod(["GET"])],
  finalHandler
);

