import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MenuItem = ({ text, to, icon: Icon }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
          isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 font-medium">{text}</span>
    </NavLink>
  );
};
MenuItem.propTypes = {
  text: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.elementType,
};

export default MenuItem;
