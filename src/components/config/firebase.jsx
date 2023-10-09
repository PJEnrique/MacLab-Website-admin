import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAfvDZhNA4QYX19O63sxreQx5h5E5PrawY",
  authDomain: "maclab-auth-399711.firebaseapp.com",
  databaseURL: "https://maclab-auth-399711-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "maclab-auth-399711",
   storageBucket: "maclab-auth-399711.appspot.com",
  messagingSenderId: "1466418591",
  appId: "1:1466418591:web:d5e89df076c9850fa3e9aa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const createAdminAccount = async (email, password, name, id) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await designateAsAdmin(user.uid, email, name, id);

    return user;
  } catch (error) {
    throw new Error('Failed to create admin account: ' + error.message);
  }
};

const designateAsAdmin = async (userId, email, name, id) => {
  const adminUserRef = doc(db, 'UserAdmin', userId);

  try {
    await setDoc(adminUserRef, {
      isAdmin: true,
      email,
      name,
      id
    }, { merge: true });

    console.log('Admin designated successfully!');
  } catch (error) {
    throw new Error('Failed to designate as admin: ' + error.message);
  }
};

export { createAdminAccount, auth, db, designateAsAdmin };