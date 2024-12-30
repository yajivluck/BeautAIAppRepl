import { View } from "react-native";
import { CartesianChart, Line } from "victory-native";

const SalesAnalytics = () => {
  return (
    <View style={{ height: 300 }}>
      <CartesianChart
        data={DATA} // 👈 specify your data
        xKey="day" // 👈 specify data key for x-axis
        yKeys={["lowTmp", "highTmp"]} // 👈 specify data keys used for y-axis
        xAxis={{
          labelColor: "red", // change x-axis label color
          lineColor: "green", // change x-axis line color
          lineWidth: 2, // set x-axis line width
        }}
      >
        {/* 👇 render function exposes various data, such as points. */}
        {({ points }) => (
          // 👇 and we'll use the Line component to render a line path.
          <Line points={points.highTmp} color="red" strokeWidth={3} />
        )}
      </CartesianChart>
    </View>
  );
};

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 * Math.random(),
  highTmp: 40 + 30 * Math.random(),
}));

export default SalesAnalytics;
