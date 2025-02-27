import { Helmet } from "react-helmet-async";
import EmptyState from "../../../components/Shared/EmptyState";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const {
    data: bookeds,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-listing", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/manage-booking/${user?.email}`);
      return data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!bookeds?.length) {
    return (
      <EmptyState
        address={"/"}
        label={"Go Home"}
        message={"You have no booking available"}
      />
    );
  }

  const handleMyBooking = async (id, roomId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel the booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.post(`/manage/my-bookings/${id}`, {
          roomId,
        });
        if (
          data?.deleteBooking?.deletedCount > 0 &&
          data?.updateRoomAvailable?.modifiedCount > 0
        ) {
          refetch();
          toast.success("Your booking cencel successfully");
        }
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Manage Bookings</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
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
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Guest Info
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      From
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      To
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
                  {/* Table row data */}
                  {bookeds?.map((data, idx) => (
                    <tr key={data._id || idx}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="block relative">
                              <img
                                alt="profile"
                                src={data?.image}
                                className="mx-auto object-cover rounded h-10 w-15 "
                              />
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {data?.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="block relative">
                              <img
                                alt="profile"
                                src={data?.guest?.customerImage}
                                className="mx-auto object-cover rounded h-10 w-15 "
                              />
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {data?.guest?.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          ${data?.price}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {format(new Date(data?.from), "P")}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {format(new Date(data?.to), "P")}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() =>
                            handleMyBooking(data?._id, data.roomId)
                          }
                          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Cancel</span>
                        </button>
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

export default ManageBookings;
