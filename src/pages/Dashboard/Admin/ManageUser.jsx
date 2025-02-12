import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return Array.isArray(data) ? data : [];
    },
  });
  // const users = [];
  // console.log(ajaira);

  // const [newRole, setNewRole] = useState("guest");
  // const [userInfo, setUserInfo] = useState();

  // const { mutateAsync } = useMutation({
  //   mutationKey: [newRole, userInfo?.email],
  //   mutationFn: async (role) => {
  //     const { data } = await axiosSecure.patch(
  //       `/users/update-role/${userInfo?.email}`,
  //       role
  //     );
  //     return data;
  //   },
  //   onSuccess: () => {
  //     refetch();
  //     toast.success("User role updated successfully");
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });
  const handleUserRole = async (e) => {
    e.preventDefault();
    // await mutateAsync({newRole});
    // document.getElementById("my_modal_1").close();
  };
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <Helmet>
          <title>Manage Users</title>
        </Helmet>
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user?._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user?.email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap capitalize">
                          {user?.role}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {user?.status ? (
                          <p
                            className={`${
                              user?.status === "verified"
                                ? "text-green-500 capitalize "
                                : "text-yellow-500 capitalize"
                            } whitespace-no-wrap`}
                          >
                            {user?.status}
                          </p>
                        ) : (
                          <p className="text-red-500 whitespace-no-wrap">
                            Unavailable
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200  text-sm">
                        <button
                          disabled={user?.role === "admin"}
                          className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full 
                            ${
                              user?.role === "admin"
                                ? "bg-red-500 text-white opacity-50 cursor-not-allowed"
                                : "bg-green-200 text-green-900"
                            }`}
                          onClick={() => {
                            // setUserInfo(user);
                            document.getElementById("my_modal_1").showModal();
                          }}
                        >
                          Update Role
                        </button>
                        <dialog id="my_modal_1" className="modal">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              Select user role
                            </h3>
                            <form onSubmit={handleUserRole}>
                              <label className="form-control w-full ">
                                <div className="label">
                                  <span className="label-text"> Role*</span>
                                </div>
                                <select
                                  // value={newRole}
                                  // onChange={(e) => setNewRole(e.target.value)}
                                  className="select select-ghost w-full "
                                >
                                  <option value={"guest"}>Guest</option>
                                  {/* <option value={"guest"}>Guest</option> */}
                                  <option value={"host"}>Host</option>
                                  <option value={"admin"}>Admin</option>
                                </select>
                              </label>
                              <div className="flex justify-center mt-5">
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUser;
