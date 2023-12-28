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
  const form = formidable({ multiples: true }); // Formidable parses every field and files into an array
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: "Error parsing the form data" });
      return;
    }

    console.log("~~~~~~~~~~~~~~~~~ FIELDS AFTER PARSING: ", fields);

    req.body = fields;
    req.files = files;
    next();
  });
};

const imageUploadMiddleware = async (req, res, next) => {
  if (req.files?.profileImage) {
    try {
      const file = req.files.profileImage[0];
      const filePath = file.filepath;
      const fileName = file.originalFilename;
      const contentType = file.mimetype;

      const [fileRef] = await bucket.upload(filePath, {
        destination: fileName,
        metadata: {
          contentType,
        },
      });
      const [url] = await fileRef.getSignedUrl({
        action: "read",
        expires: "2030-12-25",
      });
      req.body.profileImageUrl = url;

      next();
    } catch (uploadError) {
      res.status(500).json({
        message: "Error uploading the image file to Firebase Storage",
        error: uploadError.message,
      });
    }
  }
  next();
};

// ** ADD A CHECK ON THE SERVER SIDE TO SEE IF UID, USERNAME, EMAIL, ANE NEIGHBORHOOD IS PASSED. THOSE ARE REQUIRED TO PROCESS THE REQUEST ON THE SERVER. CREATE AMIDDLEWARE FOR THIS.

// const finalHandler = async (req, res) => {
//   const {
//     uid,
//     username,
//     email,
//     bio,
//     neighborhoods,
//     dietaryPreferences,
//     profileImageUrl,
//   } = req.body;

//   await updateDocument("users", uid[0], {
//     username: username[0],
//     email: email[0],
//     bio: bio[0] === "" ? null : bio[0],
//     neighborhoods: neighborhoods ?? null,
//     dietaryPreferences: dietaryPreferences ?? null,
//     profileImageUrl: profileImageUrl ?? null,
//   });
//   res.status(200).json({ message: "Document updated successfully" });
// };

const finalHandler = async (req, res) => {
  const possibleFields = [
    "username",
    "email",
    "bio",
    "neighborhoods",
    "dietaryPreferences",
    "profileImageUrl",
  ];

  const primitiveFields = ["username", "email", "bio"]; // Fields that are arrays with single elements
  const referenceFields = [
    "neighborhoods",
    "dietaryPreferences",
    "profileImageUrl",
  ];

  const updateData = {};
  possibleFields.forEach((field) => {
    const value = req.body[field];
    if (value !== undefined) {
      if (primitiveFields.includes(field)) {
        updateData[field] = value?.[0];
      } else if (referenceFields.includes(field) && value[0] === "null") {
        updateData[field] = null;
      } else {
        updateData[field] = value;
      }
    }
  });

  if (req.body["isInitialSetup"]) {
    updateData["hasCompletedOnboarding"] = true;
  }

  console.log("~~~~~~~~~~~~~~~~SERVER UPDATE DATA", updateData);

  // 서버에서 hasCompletedOnboarding true 해야 함 - client 에서 하면 formidable 이 parsing 할 때 boolean 에서 string으로 바뀜 value가


  const result = await updateUser(req.body.uid[0], updateData);

  if (result.success) {
    res.status(200).json({
      message: result.message,
      updatedFields: result.updatedFields,
    });
  } else {
    res.status(500).json({
      message: result.message,
      error: result.error.message,
    });
  }  // try {
  //   await updateDocument("users", req.body.uid[0], updateData);
  //   res.status(200).json({
  //     message: "User updated successfully",
  //     updatedFields: updateData,
  //   });
  // } catch (error) {
  //   console.error("Error in finalHandler:", error);
  //   res
  //     .status(500)
  //     .json({ message: "Error updating user", error: error.message });
  // }
};

export default chainMiddlewares(
  [checkMethod(["PATCH"]), formParseMiddleware, imageUploadMiddleware],
  finalHandler
);

/* 
    User schema
    username: string
    email: string -- needed for sending notifications in the future
    profileImageUrl: string -- don't i have to store the image ?? how can i present a picture just by having a link? their picture is not hosted on the internet? userDetails access
    creationDate: DateTime
    bio: string
    neighborhoods: Array[string]
    joinedCircles: Array of Strings (IDs of Circles)
    dietaryPreferences: Array of Strings  (e.g., vegetarian, gluten-free)
    
    --------------- maybe
    contactPreferences: Object or string
*/

// Middleware for validating user data
const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  // Add more complex validation as needed
  next();
};
