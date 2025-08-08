import React from "react";
import toast from "react-hot-toast";
import { imageUpload, saveUserInDb } from "../../api/utils";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { FaKey } from "react-icons/fa";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form?.image?.files[0];

    // image url response from imgbb
    const imageUrl = await imageUpload(image);

    try {
      //2. User Registration
      const result = await createUser(email, password);

      //3. Save username & profile photo
      await updateUserProfile(name, imageUrl);
      console.log(result);

      const userData = {
        name,
        email,
        image: imageUrl,
      };
      // save user data in db
      await saveUserInDb(userData);

      navigate("/");
      toast.success("Signup Successful");
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

      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="text-center">
              <h1 className="font-gummy text-5xl font-bold">Sign Up</h1>
              <p className="py-3">Sign in to access your account</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="ng-untouched ng-pristine ng-valid fieldset"
            >
              <label htmlFor="email" className="label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="input"
                data-temp-mail-org="0"
                required
              />

              <label htmlFor="image" className="label">
                Select Profile Image:
              </label>
              <input
                className="file-input"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                required
              />

              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                data-temp-mail-org="0"
                className="input"
              />

              <label className="label">Password</label>
              <label className="input validator">
                <FaKey />
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  id="password"
                  required
                  placeholder="Password"
                  minlength="6"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must be more than 6  characters, including number, lowercase letter, uppercase letter"
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>

              <button type="submit" className="btn btn-neutral mt-4">
                {loading ? (
                  <TbFidgetSpinner className="m-auto animate-spin" />
                ) : (
                  "Continue"
                )}
              </button>

              <div className="flex w-full flex-col">
                <div className="divider">OR</div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="btn border-[#e5e5e5] bg-white text-black"
              >
                <FcGoogle size={22} />
                Sign Up with Google
              </button>
              <p className="pt-3">
                Don&apos;t have an account yet?{" "}
                <Link to="/login" className="link link-primary">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
