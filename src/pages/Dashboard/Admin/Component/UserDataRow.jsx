import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useState } from "react";
import { axiosSecure } from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const UserDataRow = ({ user = {}, refetch }) => {
  const [newRole, setNewRole] = useState("guest");
console.log(user.email);

  const { mutateAsync } = useMutation({
    mutationKey: [newRole, user?.email],
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(
        `/users/update-role/${user?.email}`,
        role
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("User role updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleUserRole = async (e,user) => {
    e.preventDefault();
    console.log(newRole);
    console.log(user.email);
    
    // const updatedRole=await mutateAsync(newRole );
    // console.log(updatedRole);
    
    document.getElementById("my_modal_1").close();
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user?.status ? (
          <p
            className={`${
              user.status === "verified" ? "text-green-500" : "text-yellow-500"
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          disabled={user?.role === "admin"}
          className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full 
                       ${
                         user?.role === "admin"
                           ? "bg-red-500 text-white opacity-50 cursor-not-allowed"
                           : "bg-green-200 text-green-900"
                       }`}
          onClick={() => {
            document.getElementById("my_modal_1").showModal();
          }}
        >
          Update Role
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Select user role</h3>
            <form onSubmit={()=>handleUserRole(user)}>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text"> Role*</span>
                </div>
                <select
                  defaultValue={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="select select-ghost w-full "
                >
                  <option value={"guest"}>Guest</option>
                  {/* <option value={"guest"}>Guest</option> */}
                  <option value={"host"}>Host</option>
                  <option value={"admin"}>Admin</option>
                </select>
              </label>
              <div className="flex justify-center mt-5">
                <button type="submit" className="btn btn-success">
                  UPdate Role
                </button>
              </div>
            </form>
          </div>
        </dialog>
        {/* Update User Modal */}
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
