/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import UploadImage from "../../Utils/UploadImage";

const SignUp = () => {
  const {
    createUser,
    signInWithGoogle,
    updateUserProfile,
    loading,
    setLoading,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.image.files[0];

    try {
   
      const imageUrl = await UploadImage(imageFile)
      createUser(email, password).then((res) => {
        if (res?.user?.email) {
          updateUserProfile(name, imageUrl).then(() => {
            toast.success("Signup successful with profile update");
            form.reset();
            navigate(from);
          });
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signinWithGoogle = () => {
    setLoading(true);
    signInWithGoogle().then((result) => {
      console.log(result.user);
      if (result?.user?.email) {
        toast.success("You are logged in ");
        navigate(from)
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-5 text-center">
          <h1 className="my-2 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to StayVista</p>
        </div>
        <form
          onSubmit={handleSignUp}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-3">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Profile Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
            disabled={loading}
              type="submit"
              className="disabled:cursor-not-allowed cursor-pointer bg-rose-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <ImSpinner3 className="animate-spin mx-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
        disabled={loading}
          onClick={signinWithGoogle}
          className=" disabled:cursor-not-allowed  flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
