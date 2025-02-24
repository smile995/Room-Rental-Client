import { Chart } from "react-google-charts";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import PropTypes from "prop-types";
const options = {
  title: "Sales Over Time",
  curveType: "function",
  legend: { position: "bottom" },
  series: [{ color: "#F43F5E" }],
};
const SalesLineChart = ({ data, isLoading }) => {
  if (isLoading || data?.length<2) {
    return <LoadingSpinner />;
  } 
  if (data?.length > 1) {
    return (
      <Chart chartType="LineChart" width="100%" data={data} options={options} />
    );
  } 
  else {
    return (
      <>
        <p className="text-center mt-5 text-2xl font-semibold">No data available for this section</p>
        <LoadingSpinner />
      </>
    );
  }
};
SalesLineChart.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};
export default SalesLineChart;
