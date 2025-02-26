import { DateRange } from "react-date-range";
import { categories } from "../../../components/Categories/CategoriesData";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import UploadImage from "../../../Utils/UploadImage";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
const UpdateRoom = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState();
  const { data: room = {}, refetch } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/room/${id}`);
      return data;
    },
  });
  const [updateRoom, setUpdateRoom] = useState(room);
  console.log(updateRoom);

  const { from, to } = room;
  const [state, setState] = useState([
    {
      startDate: new Date(from),
      endDate: new Date(to),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (from && to) {
      setState([
        {
          startDate: new Date(from),
          endDate: new Date(to),
          key: "selection",
        },
      ]);
    }
  }, [from, to]);
  const handleChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  const { mutateAsync } = useMutation({
    mutationFn: async (updateData) => {
      const result = await axiosSecure.patch(`/rooms/${id}`, updateData);
      return result.data;
    },
    onSuccess: () => {
      toast.success("Room Updated successfully");
      navigate("/dashboard/my-listings");
      setLoading(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });
  const handleUpdateroomDetails = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const title = form.title.value;
    const price = form.price.value;
    const category = form.category.value;
    const bathrooms = form.bathrooms.value;
    const bedrooms = form.bedrooms.value;
    const description = form.description.value;
    const guests = form.total_guest.value;
    const to = state[0].endDate;
    const from = state[0].startDate;
    const imageFile = form.image.files[0];
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    try {
      let image=room?.image
      if (imageFile) {
         image = await UploadImage(imageFile);
      }
     
      // const image = await UploadImage(imageFile);
      const RoomInfo = {
        location,
        title,
        price,
        bedrooms,
        category,
        bathrooms,
        description,
        guests,
        to,
        from,
        host,
        image,
        isBooked: false,
      };
      await mutateAsync(RoomInfo);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleUpdateroomDetails}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="location" className="block text-gray-600">
                Location
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="location"
                id="location"
                defaultValue={room?.location}
                type="text"
                placeholder="Location"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                required
                defaultValue={room?.category}
                className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                name="category"
              >
                {categories?.map((category) => (
                  <option
                    selected={room?.category}
                    value={category.label}
                    key={category.label}
                  >
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="location" className="block text-gray-600">
                Select Availability Range
              </label>
              <DateRange
                rangeColors={["#f5405e"]}
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="title"
                id="title"
                type="text"
                defaultValue={room?.title}
                placeholder="Title"
                required
              />
            </div>

            <div className=" p-4 bg-white w-full  m-auto rounded-lg">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      onChange={handleChange}
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="flex justify-center gap-5 items-center">
                      <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                        Upload Image
                      </div>
                      <div>
                        {preview ? (
                          <img className="w-16 h-1w-16" src={preview} />
                        ) : (
                          <img className="w-16 h-1w-16" src={room?.image} />
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="price"
                  id="price"
                  defaultValue={room?.price}
                  type="number"
                  placeholder="Price"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="guest" className="block text-gray-600">
                  Total guest
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="total_guest"
                  id="guest"
                  defaultValue={room?.guests}
                  type="number"
                  placeholder="Total guest"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="bedrooms" className="block text-gray-600">
                  Bedrooms
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="bedrooms"
                  id="bedrooms"
                  defaultValue={room?.bedrooms}
                  type="number"
                  placeholder="Bedrooms"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="bathrooms" className="block text-gray-600">
                  Bathrooms
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="bathrooms"
                  id="bathrooms"
                  type="number"
                  defaultValue={room?.bathrooms}
                  placeholder="Bathrooms"
                  required
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                defaultValue={room?.description}
                className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 "
                name="description"
              ></textarea>
            </div>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="bg-rose-500 w-full rounded-md py-3 text-white disabled:cursor-not-allowed cursor-pointer mt-5"
        >
          {loading ? (
            <ImSpinner3 className="animate-spin mx-auto" />
          ) : (
            "Update & Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateRoom;
