import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  addDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const todosCollectionRefrence = collection(db, "todos");

export const handleSignup = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    return false;
  }
};

export const handleSignin = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log(result);
    return result.user.uid;
  } catch (error) {
    return false;
  }
};

export const addTodo = async (payload: any) => {
  try {
    const result = await addDoc(todosCollectionRefrence, {
      date: payload.date,
      description: payload.description,
      status: payload.status,
      title: payload.title,
      type: payload.type,
      userId: payload.userId,
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getTodos = async (userId: String) => {
  try {
    const q = query(collection(db, "todos"), where("userId", "==", userId));
    const result = await getDocs(q);
    const Todos: any = [];
    result.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      Todos.push({ id: doc.id, data: doc.data() });
    });
    return Todos;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getTodo = async (todoId: string) => {
  try {
    const ref = doc(db, "todos", todoId);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // Convert to City object
      const todo = docSnap.data();
      console.log("🚀 ~ file: index.ts ~ line 94 ~ getTodo ~ todo", todo);
      // Use a City instance method
      return todo;
    } else {
      console.log("No such document!");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateTodo = async (docId: string) => {
  try {
    console.log(docId, "doc id ");
    const todoDoc = doc(db, "todos", docId);
    const result = await updateDoc(todoDoc, {
      status: "Done",
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
