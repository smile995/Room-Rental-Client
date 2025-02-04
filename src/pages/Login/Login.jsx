import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { ImSpinner3 } from "react-icons/im";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const { signIn, loading, setLoading, signInWithGoogle, resetPassword } =
    useAuth();
  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    try{
      signIn(email, password)
      .then((res) => {
        if (res?.user?.email) {
          toast.success("Login successfull");
          form.reset();
          navigate(from);
        }
      })
      .catch(error=>{
        setLoading(false)
        toast.error(error.message)
      })
    }catch(error){
      setLoading(false)
      toast.error(error.message)
    }
  };
  const signinWithGoogle = () => {
    setLoading(true);
    signInWithGoogle().then((result) => {
      console.log(result.user);
      if (result?.user?.email) {
        toast.success("You are logged in ");
        navigate(from);
      }
    });
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    resetPassword(email).then(() => {
      toast.success("Check your email")
      document.getElementById("my_modal_1").close();
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
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
                autoComplete="current-password"
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
              className="bg-rose-500 w-full rounded-md py-3 text-white disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <ImSpinner3 className="animate-spin mx-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button
            className="text-xs hover:underline hover:text-rose-500 text-gray-400"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Forgot password?
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Password Reset Form (Checked your Email)
              </h3>
              <form onSubmit={handlePasswordReset}>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Email*</span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@gmail.com"
                    className="input input-bordered w-full "
                  />
                </label>
                <div className="flex justify-center mt-5">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          disabled={loading}
          onClick={signinWithGoogle}
          className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/signup"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
