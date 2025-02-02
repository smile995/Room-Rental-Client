/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import queryString from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";
const CategoryBox = ({ label, icon: Icon }) => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const category = params.get("category");
  const handleSetQuery = () => {
    let query = { category: label };
    const URL = queryString.stringifyUrl({
      url: "/",
      query: query,
    });
    navigate(URL);
  };
  return (
    <div
      onClick={handleSetQuery}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer ${category===label && 'border-b-neutral-800'}`}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
};

export default CategoryBox;
