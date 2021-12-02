import Todo from "./todoTable";
import { PlusIcon } from "@heroicons/react/outline"; /* This example requires Tailwind CSS v2.0+ */
import Modal from "../modal";
import { useState, useEffect } from "react";
import { ClipboardListIcon } from "@heroicons/react/outline";
import { useStore } from "../../store";
import router from "next/router";
import { Toaster } from "react-hot-toast";
import * as types from "../../types";
const TodoComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { logout, userId, loggedIn, todos } = useStore();
  useEffect(() => {
    if (userId === "" && loggedIn === false) {
      router.push("/signin");
    }
  }, [userId, loggedIn]);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <Toaster />

      <div className="bg-indigo-600">
        <div className="mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-indigo-800">
                <ClipboardListIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <button
                onClick={logout}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal} />
      <div className="m-10 flex flex-col space-y-6">
        <div className="flex flex-row items-center space-x-2">
          <h1 className="text-xl font-medium text-black">Today</h1>
          <h5 className="text-sm text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h5>
        </div>
        <div
          className="flex flex-row bg-gray-300 hover:bg-gray-500 p-2 rounded-box"
          style={{ width: "fit-content" }}
        >
          <PlusIcon width={30} height={30} />

          <button className="text-2xl" onClick={openModal}>
            Add Task
          </button>
        </div>
      </div>

      <div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Mark Done
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Share Todo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {todos.map((todo: types.Todo) => {
                      console.log(todo);
                      return (
                        <Todo
                          key={todo.id}
                          title={todo.title}
                          status={todo.status}
                          date={todo.date}
                          type={todo.type}
                          description={todo.description}
                          id={todo.id}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodoComponent;
