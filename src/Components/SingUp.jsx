// @ts-nocheck
import React, { useEffect, useState } from "react";
import style from "./SingUp.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/hooks";

export default function SingUp() {
  const [userFirstName, setUserFirstName] = useState("");
  const [user_Sur_name, setuser_Sur_name] = useState("");
  const [user_email, setuser_email] = useState("");
  const [user_password, setuser_password] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleEmailChange = (e) => {
    setuser_email(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setuser_password(e.target.value);
    setPasswordError("");
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };
  const submitForm = async () => {
    try {
      if (!validateEmail(user_email)) {
        setEmailError("Email is not valid");
        return;
      }

      if (!validatePassword(user_password)) {
        setPasswordError("Password is not valid");
        return;
      }
      const responce = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectId: "duzgori635w9",
          },
          body: JSON.stringify({
            name: `${userFirstName} ${user_Sur_name}`,
            email: user_email,
            password: user_password,
            appType: "facebook",
          }),
        }
      );
      const data = await responce.json();
      if (responce.status >= 400) {
        setError(data.message);
        return;
      }
      localStorage.setItem("userDetails", JSON.stringify(data));
      setUser(data);

      navigate("/login");
    } catch {
      setError("Something went wrong");
    }
    // .then((data) => {
    //   if (data.status >= 400) {
    //     new Error("Invalid error");
    //   }
    //   return data.json();
    // })
    // .then((data) => {
    //   localStorage.setItem("userDetails", JSON.stringify(data));
    //   setUser(data);
    //   console.log("success");
    //   navigate("/login");
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-3xl font-bold tracking-tight text-lightblue text-center sm:text-4xl">
            facebook
          </h2>

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <div className="flex space-x-4">
              <div className="flex flex-col">
                <label
                  htmlFor="firstname"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  onChange={(e) => setUserFirstName(e.target.value)}
                  placeholder="first name"
                  autoComplete="firstname"
                  required
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="lastname"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Surname
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  onChange={(e) => setuser_Sur_name(e.target.value)}
                  placeholder="Surname"
                  autoComplete="lastname"
                  required
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                />
              </div>
            </div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={user_email}
                onChange={handleEmailChange}
                placeholder="Email address"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className={style.error}>{emailError}</div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user_password}
                  onChange={handlePasswordChange}
                  placeholder="New Password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className={style.error}>{passwordError}</div>
              </div>
            </div>
            {error && <div className={style.error}>{error}</div>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-5"
                onClick={submitForm}
              >
                Sign up
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Already have an account?
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
