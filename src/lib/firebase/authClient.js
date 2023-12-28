import { auth } from "@/lib/firebase/firebaseClient";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const login = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result;

      // const AdditionalUserInfo = getAdditionalUserInfo(result)
      // if (AdditionalUserInfo?.isNewUser) {
      //   console.log('User is logging in for the first time.');
      //   // You can perform actions specific to a new user here.
      // } else {
      //   console.log('User has logged in before.');
      // }
      // const user = result.user;
      // return user;
    })
    .catch((error) => {
      throw error;
    });
};

export const logout = async () => {
  return signOut(auth).then(() => {
    console.log("sign out successful");
    return null;
  });
};

export const onUserStateChange = (callback) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log(user);
    callback(user);
  });
  return unsubscribe;
};

export const isNewUser = (userCredential) => {
  const AdditionalUserInfo = getAdditionalUserInfo(userCredential);
  return AdditionalUserInfo.isNewUser;
};

/* onAuthStateChanged is called with two arguments: the Firebase authentication object (auth) and a callback function. The callback function (user) => { callback(user); } is 
a function that will be executed by onAuthStateChanged when there is a change in the user's authentication state. When a change in authentication state occurs (e.g., a user logs in or out), 
onAuthStateChanged will invoke the provided callback function with the user object as an argument. The user object contains information about the authenticated user or null if the user is not authenticated.
You have the flexibility to use the user object in any way that suits your application's needs. For example, you can update the UI, set the user in your application's state, perform actions based 
on the user's role, or make further API calls, among other possibilities.

Why does the onAuthStateChanged function use a callback to provide user information instead of returning it directly? Why is it designed to execute operations on the user's behalf through a callback, rather than letting the caller handle user information separately?
The reason Firebase and many other authentication libraries use a callback approach, as opposed to returning the user information directly, is related to how authentication state changes are typically handled in web applications.

Here are a few reasons why a callback-based approach is commonly used:

1. **Asynchronous Nature of Authentication State Changes**: Authentication state changes can occur asynchronously, and the user information may change in response to various events, such as a successful login, a logout, or token expiration. Using a callback allows you to respond to these changes in real-time without having to explicitly poll for state changes.

2. **Event-Driven Architecture**: Firebase and similar libraries often use an event-driven architecture, where you register callbacks to be executed when specific events occur. This is a common pattern in modern web development and is used for various purposes, not just authentication. It allows your application to react immediately to changes without having to repeatedly check for updates.

3. **Decoupling Concerns**: By providing a callback, Firebase decouples the responsibility of handling authentication state changes from the core library itself. This separation of concerns allows you to define your own custom logic for how to react to these changes. It also makes the library more flexible and extensible.

4. **Support for Complex Use Cases**: Authentication state changes can trigger a wide range of actions in an application, such as updating UI components, making API requests, or dispatching Redux actions. A callback-based approach allows you to define and execute these actions based on the user's authentication state.

While the callback approach may require you to write a bit more code to handle the callback function, it provides the flexibility and responsiveness needed for handling authentication state changes in a dynamic and event-driven manner.

It's worth noting that you can encapsulate the callback logic within a function or a custom hook, as you've done in your code, to make it more reusable and easier to manage.*/

// Other auth-related functions...
