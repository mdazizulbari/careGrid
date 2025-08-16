import React from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { saveUserInDb } from "../../api/utils";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaKey } from "react-icons/fa";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  // if (user) return <Navigate to={from} replace={true} />;
  // if (loading) return <LoadingSpinner />;

  // form submit handler
  const onSubmit = async (userData) => {
    console.log(userData);
    const email = userData.email;
    const password = userData.password;

    // event.preventDefault();
    // const form = event.target;
    // const email = form.email.value;
    // const password = form.password.value;
    try {
      //User Login
      const result = await signIn(email, password);
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };

      // update user
      await saveUserInDb(userData);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const result = await signInWithGoogle();

      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };

      // update user
      await saveUserInDb(userData);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="hero min-h-scree">

      <div className="hero-content flex-col">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="text-center">
              <h1 className="font-gummy text-5xl font-bold">Log In</h1>
              <p className="py-3">Sign in to access your account</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="ng-untouched ng-pristine ng-valid fieldset"
            >
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                name="email"
                id="email"
                type="text"
                className="input w-full"
                placeholder="Enter Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-error">Email is required</p>
              )}

              <label className="label">Password</label>
              <input
                {...register("password", {
                  required: true,
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/i,
                })}
                name="password"
                id="password"
                type="password"
                placeholder="Enter Password"
                className="input"
              />
              {errors.password?.type === "required" && (
                <p className="text-error">Password is required</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-error">
                  Must be more than 8 characters, including
                  <br />
                  At least one number <br />
                  At least one lowercase letter <br />
                  At least one uppercase letter
                </p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-neutral mt-4">
                {/* {loading ? (
                  <TbFidgetSpinner className="m-auto animate-spin" />
                ) : ( */}
                  Continue
                {/* )} */}
              </button>

              <div className="flex w-full flex-col">
                <div className="divider">OR</div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="btn border-[#e5e5e5] bg-white text-black"
              >
                <FcGoogle size={22} />
                Login with Google
              </button>
              <p className="pt-3">
                Don&apos;t have an account yet?{" "}
                <Link to="/signup" className="link link-primary">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
