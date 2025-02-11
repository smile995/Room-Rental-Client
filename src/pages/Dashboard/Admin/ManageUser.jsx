import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const ManageUser = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });
  const handleUserRole = (curentUser) => {
    console.log(curentUser);
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
                              user.status === "verified"
                                ? "text-green-500 capitalize "
                                : "text-yellow-500 capitalize"
                            } whitespace-no-wrap`}
                          >
                            {user.status}
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
                          onClick={() => handleUserRole(user)}
                          className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full 
                                  ${
                                    user?.role === "admin"
                                      ? "bg-red-500 text-white opacity-50 cursor-not-allowed"
                                      : "bg-green-200 text-green-900"
                                  }`}
                        >
                          Update Role
                        </button>

                        {/* Update User Modal */}
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
