import chainMiddlewares from "@/util/chainMiddlewares";
import checkMethod from "@/util/checkMethod";
import { updateDocument } from "@/lib/firebase/firestoreAdmin";
import formidable from "formidable";
import { bucket } from "@/lib/firebase/firebaseAdmin";
import updateUser from "@/services/userServices";

export const config = {
  api: {
    bodyParser: false,
  },
};


const formParseMiddleware = async (req, res, next) => {
}

const finalHandler = async (req, res) => {
}


export default chainMiddlewares(
    [checkMethod(["PATCH"]), formParseMiddleware],
    finalHandler
  );
  