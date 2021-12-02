import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import React from "react";
import { handleSignup } from "../../firebase";
import router from "next/router";
import { useStore } from "../../store/index";
import Link from "next/link";

interface IFormInput {
  email: string;
  password: string;
}

const Signup = () => {
  const [errMessage, setErrorMessage] = useState(false);
  const { setLoggedIn } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    const result = await handleSignup(data.email, data.password);
    if (result === false) {
      setErrorMessage(true);
    } else {
      router.push("/signin");
    }
  };

  return (
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
              Signup
            </button>
            <p className="pt-12 mx-auto">
              Already have an account{" "}
              <Link href="/signin">
                <a className="underline text-blue-400 hover:text-blue-500">
                  sign in
                </a>
              </Link>
            </p>
            {errMessage && (
              <div className="mb-3 text-normal text-error">
                this email is used before
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
