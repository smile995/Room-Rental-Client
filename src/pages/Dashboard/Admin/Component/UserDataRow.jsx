import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useState } from "react";
import { axiosSecure } from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import UpdateUserModal from "./UpdateUserModal";

const UserDataRow = ({ user = {}, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const { mutateAsync } = useMutation({
    mutationKey: ["role",user?.email],
    mutationFn: async (currentUser) => {
      const { data } = await axiosSecure.patch(
        `/users/update-role/${user?.email}`,
        currentUser,
        
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("User role updated successfully");
      setIsOpen(false)
    },
    onError: (error) => {
      toast.error(error.message);
      setIsOpen(false)
    },
  });
  const modalHandler = async (selected) => {
    const user={
      role:selected,
    }
    await mutateAsync(user)
    
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
          onClick={() => setIsOpen(true)}
          disabled={user.role==="admin"}
          className="relative cursor-pointer disabled:cursor-not-allowed inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal
          user={user}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
        />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
