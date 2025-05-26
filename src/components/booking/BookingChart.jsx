import React, { PureComponent } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#FF69B4", "#FF1493", "#DB7093", "#000000", "#C71585"];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontWeight="bold">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Price ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class BookingChart extends PureComponent {
  state = {
    data: [],
    activeIndex: 0,
    loading: true,
  };

  componentDidMount() {
    this.fetchBookingData();
  }

  fetchBookingData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/my-booking", {
        withCredentials: true,
      });
      // Map backend data into {name, value} format
      const chartData = res.data.map((booking) => ({
        name: booking.carModel,
        value: Number(booking.dailyRentalPrice),
      }));
      this.setState({ data: chartData, loading: false });
    } catch (error) {
      console.error("Error fetching booking data:", error);
      this.setState({ loading: false });
    }
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { data, activeIndex, loading } = this.state;

    if (loading) {
      return (
        <p style={{ color: "#FF69B4", textAlign: "center", marginTop: 20 }}>
          Loading chart data...
        </p>
      );
    }

    if (data.length === 0) {
      return (
        <p style={{ color: "#FF69B4", textAlign: "center", marginTop: 20 }}>
          No booking data available
        </p>
      );
    }

    return (
      <div
        style={{
          width: "100%",
          height: 400,
          backgroundColor: "#000000",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h2
          style={{
            color: "#FF69B4",
            textAlign: "center",
            marginBottom: 20,
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Daily Rental Price Distribution
        </h2>

        <ResponsiveContainer>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#FF69B4"
              dataKey="value"
              onMouseEnter={this.onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                borderRadius: 8,
                color: "#fff",
              }}
            />
            <Legend
              wrapperStyle={{ color: "#FF69B4", fontWeight: "bold" }}
              verticalAlign="bottom"
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
