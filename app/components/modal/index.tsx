import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useStore } from "../../store";
import { useForm, SubmitHandler } from "react-hook-form";
import { addTodo } from "../../firebase/index";
import useFirebase from "../../hooks/useFirebase";
import toast, { Toaster } from "react-hot-toast";

interface IFormInput {
  title: string;
  description: string;
  status: string;
  type: string;
}

const Modal = (props: any) => {
  const { userId } = useStore();
  const { AddTodo } = useFirebase();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    const result = await AddTodo(data, userId);
    if (result === false) {
      toast.error("This is an error!");
    } else {
      toast.success("Successfully created!");
    }
    props.closeModal();
  };

  return (
    <Transition appear show={props.isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto text-black"
        onClose={props.closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-yellow-50 p-20 inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl text-lg">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                <div className="bg-black h-2"></div>
                <div className="p-2 text-2xl py-4">Add new task</div>
                <div className="divider m-0 px-2 text-gray-500"></div>
              </Dialog.Title>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    type="text"
                    className={`p-2 text-black border-black border-2 rounded-md text-xl mb-4`}
                    placeholder="Title"
                    {...register("title", {
                      required: true,
                    })}
                  />
                  {errors.title && (
                    <div className="mb-3 text-normal text-error">
                      title is required
                    </div>
                  )}
                </div>
                <div>
                  <textarea
                    cols={45}
                    rows={10}
                    className={`p-2 text-black border-black border-2 rounded-md text-xl mb-4`}
                    id="description"
                    aria-label="description"
                    placeholder="Description"
                    {...register("description", {
                      required: true,
                    })}
                  />
                  {errors.description && (
                    <div className="mb-3 text-normal text-error">
                      description is required
                    </div>
                  )}
                </div>
                <div>
                  <select
                    {...register("status")}
                    className="p-4 mb-4 rounded-box bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    className={`p-2 text-black border-black border-2 rounded-md text-xl mb-4`}
                    placeholder="Type"
                    {...register("type", {
                      required: true,
                    })}
                  />
                  {errors.type && (
                    <div className="mb-3 text-normal text-error">
                      type is required
                    </div>
                  )}
                </div>
                <div className="flex flex-row space-x-2 mx-auto mt-4">
                  <button
                    className={`bg-green-700 py-2 px-28 text-md text-white rounded-3xl hover:bg-green-500 text-md font-semibold`}
                    type="submit"
                    aria-label="submitbutton"
                  >
                    Add Task
                  </button>
                  <button
                    className={`bg-red-700 py-2 px-28 text-md font-semibold text-white rounded-3xl hover:bg-red-500`}
                    aria-label="submitbutton"
                    onClick={() => props.closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>{" "}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
