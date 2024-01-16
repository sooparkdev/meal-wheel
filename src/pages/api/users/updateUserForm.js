import chainMiddlewares from "@/util/chainMiddlewares";
import checkMethod from "@/util/checkMethod";
import { updateDocument } from "@/lib/firebase/firestoreAdmin";
import { bucket } from "@/lib/firebase/firebaseAdmin";
import updateUser from "@/services/userServices";
import multer from 'multer';

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.memoryStorage();
const formParseMiddleware = multer({ storage: storage }).single('profileImage');

const imageUploadMiddleware = async (req, res, next) => {
  if (req.file) {
    try {
      const file = req.file;
      const buffer = file.buffer;
      const fileName = file.originalname;
      const contentType = file.mimetype;

      const fileRef = bucket.file(fileName);

      const stream = fileRef.createWriteStream({
        metadata: {
          contentType,
        },
      });

      stream.on('error', (error) => {
        res.status(500).json({
          message: "Error uploading the image file to Firebase Storage",
          error: error.message,
        });
      });

      stream.on('finish', async () => {
        // File uploaded successfully, get the URL
        const [url] = await fileRef.getSignedUrl({
          action: "read",
          expires: "2030-12-25",
        });
        req.body.profileImageUrl = url;
        next();
      });

      stream.end(buffer);
    } catch (uploadError) {
      res.status(500).json({
        message: "Error processing the image file",
        error: uploadError.message,
      });
    }
  } else {
    next();
  }
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

  console.log("BODY~~~~~~~~~~", req.body)
  const possibleFields = [
    "username",
    "email",
    "bio",
    "neighborhoods",
    "dietaryPreferences",
    "profileImageUrl",
    "hasCompletedOnboarding",
  ];

  const referenceFields = [
    "neighborhoods",
    "dietaryPreferences"
  ];
  
  const updateData = {};
  
  for (const field of possibleFields) {
    if (field in req.body) {
      let value = req.body[field];
  
      if (referenceFields.includes(field)) {
        if (value === 'null') {
          value = null;
        } else if (!Array.isArray(value)) {
          value = [value];
        }
      }
  
      if (field === 'hasCompletedOnboarding') {
        value = value === 'true';
      }
  
      updateData[field] = value;
    }
  }
  
  const result = await updateUser(req.body.uid, updateData);
  


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

