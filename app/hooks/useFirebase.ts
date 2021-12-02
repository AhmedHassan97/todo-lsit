import { useState, useEffect } from "react";
import * as firebase from "../firebase";
import { useStore } from "../store";
const useFirebase = () => {
  const { addTodos } = useStore();
  const [isTodosLoading, setIsTodosLoading] = useState<boolean>();
  const AddTodos = async (result: String) => {
    setIsTodosLoading(true);
    const data = await firebase.getTodos(result);
    const Todos = data.map((doc: any) => {
      const todo = {
        id: doc.id,
        date: doc.data.date,
        description: doc.data.description,
        status: doc.data.status,
        title: doc.data.title,
        type: doc.data.type,
        userId: doc.data.userId,
      };
      return todo;
    });
    addTodos(Todos);
    setIsTodosLoading(false);
  };

  const AddTodo = async (data: any, userId: String) => {
    const payload = {
      date: new Date().toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      description: data.description,
      status: data.status,
      title: data.title,
      type: data.type,
      userId: userId,
    };
    const result = await firebase.addTodo(payload);
    if (result !== false) {
      AddTodos(userId);
    }
    return result;
  };
  const UpdateTodo = async (docId: string, userId: string) => {
    const result = await firebase.updateTodo(docId);
    if (result !== false) {
      AddTodos(userId);
    }
    return result;
  };

  return { AddTodos, isTodosLoading, AddTodo, UpdateTodo };
};

export default useFirebase;
