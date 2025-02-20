import PropTypes from "prop-types";
import Button from "../Shared/Button/Button";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { differenceInDays } from "date-fns";
import BookingModal from "./BookingModal";

const RoomReservation = ({ room,refetch }) => {
  const { from, to } = room || {};
  const startDate = new Date(from);
  const endDate = new Date(to);
  const daysBetween = differenceInDays(endDate, startDate);

  const totalPrice = daysBetween * parseInt(room?.price);

  const [isOpen, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
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
  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {room?.price}</div>
        <div className="font-light text-neutral-600">/night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <DateRange
          rangeColors={["#f5405e"]}
          showDateDisplay={false}
          editableDateInputs={true}
          onChange={() =>
            setState([
              {
                startDate: new Date(from),
                endDate: new Date(to),
                key: "selection",
              },
            ])
          }
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
      <hr />
      <div className="p-4">

        
        <Button disabled={room?.isBooked} onClick={() => setOpen(true)} label={"Reserve"} />
      </div>
      <BookingModal
      refetch={refetch}
        isOpen={isOpen}
        closeModal={closeModal}
        bookingInfo={{ ...room, price: totalPrice }}
      />
      <hr />
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
};

RoomReservation.propTypes = {
  room: PropTypes.object,
  refetch:PropTypes.func
};

export default RoomReservation;
