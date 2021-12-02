import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import React from "react";
import { getTodos, handleSignin } from "../../firebase";
import router from "next/router";
import { useStore } from "../../store/index";
import Link from "next/link";
import useFirebase from "../../hooks/useFirebase";
interface IFormInput {
  email: string;
  password: string;
}

const SignIn = () => {
  const [errMessage, setErrorMessage] = useState(false);
  const { setLoggedIn, setUserId, loggedIn, userId, addTodos } = useStore();
  // const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { isTodosLoading, AddTodos } = useFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    if (loggedIn === true && userId !== "") {
      router.push("/todos");
    }
  }, [loggedIn, userId]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    const result = await handleSignin(data.email, data.password);
    if (result === false) {
      setErrorMessage(true);
    } else {
      await AddTodos(result);
      // setIsLoading(true);
      // const data = await getTodos(result);
      // const Todos = data.map((doc: any) => {
      //   const todo = {
      //     id: doc.data.id,
      //     date: doc.data.date,
      //     description: doc.data.description,
      //     status: doc.data.status,
      //     title: doc.data.title,
      //     type: doc.data.type,
      //     userId: doc.data.userId,
      //   };
      //   return todo;
      // });
      // addTodos(Todos);
      // console.log(Todos);
      // setIsLoading(false);
      router.push("/todos");
      setLoggedIn();
      setUserId(result);
    }
  };

  return (
    <div>
      {isTodosLoading === true ? (
        <button type="button" className="bg-rose-600 ..." disabled>
          <svg
            className="animate-spin h-5 w-5 mr-3 ..."
            viewBox="0 0 24 24"
          ></svg>
          Processing
        </button>
      ) : (
        <div className="bg-white flex flex-col justify-center items-center min-h-screen">
          <div className="mb-8">
            <Image src="/icon.png" alt="logo" width={200} height={200} />
          </div>
          <div className=" flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="text"
                  className={`p-2 text-black border-black border-2 rounded-md text-xl mb-4`}
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                  })}
                />
                {errors.email && (
                  <div className="mb-3 text-normal text-error">
                    email is required
                  </div>
                )}
              </div>
              <div>
                <input
                  type="password"
                  className={`p-2 text-black border-black border-2 rounded-md text-xl mb-4`}
                  id="password"
                  aria-label="password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && (
                  <div className="mb-3 text-normal text-error">
                    password is required{" "}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <button
                  className={`bg-black py-2 px-28 text-sm text-white rounded-3xl hover:bg-gray-800`}
                  type="submit"
                  aria-label="submitbutton"
                >
                  Sign in
                </button>

                {errMessage && (
                  <div className="mb-3 text-normal text-error">
                    wrong username or password
                  </div>
                )}
              </div>
            </form>
            <p className="pt-12 mx-auto">
              Does not have an account{" "}
              <Link href="/">
                <a className="underline text-blue-400 hover:text-blue-500">
                  sign up
                </a>
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
