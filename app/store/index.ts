import create, { GetState, SetState } from "zustand";
// import * as types from "../types/Types";
import { devtools, persist, StoreApiWithPersist } from "zustand/middleware";
import * as types from "../types";

interface Todo {
  loggedIn: Boolean;
  setLoggedIn: () => void;
  logout: () => void;
  userId: string;
  setUserId: (userId: string) => void;
  //   removeToken: () => void;
  todos: Array<types.Todo>;
  addTodos: (todos: Array<types.Todo>) => void;
  // addTodo: (todo: types.Todo) => void;

  //   removeZones: () => void;
}

export const useStore = create<
  Todo,
  SetState<Todo>,
  GetState<Todo>,
  StoreApiWithPersist<Todo>
>(
  persist(
    devtools((set) => ({
      // initial state
      loggedIn: false,
      setLoggedIn: () => {
        set(() => ({
          loggedIn: true,
        }));
      },
      logout: () => {
        set(() => ({
          loggedIn: false,
          userId: "",
          todos: [],
        }));
      },
      userId: "",
      setUserId: (Id: string) => {
        set(() => ({
          userId: Id,
        }));
      },

      addTodos: (todos) => {
        set(() => ({
          todos: todos,
        }));
      },
      todos: [],
      // addTodo: (todo: types.Todo) => {
      //   set((state) => ({
      //     todos: [...state.todos, todo],
      //   }));
      // },
    })),
    {
      name: "todo-app", // unique name
    }
  )
);
