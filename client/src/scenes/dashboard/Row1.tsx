import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
} from "recharts";

const Row1 = () => {
  const { palette } = useTheme(); // import MUI color theme
  const { data } = useGetKpisQuery(); // data from api

  // just return revenue
  // mostly the same as 'revenueProfit'
  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]);

  // useMemo will only recompute the memoized value when one of the dependencies has changed
  const revenueExpenses = useMemo(() => {
    return (
      data &&   // ensure 'data' exists
      // map through monthlyData:
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),  // first three letters
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]); // compute only when 'data' changes

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),  // restirct to 2 decimal places; only difference from 'revenueExpenses', above
        };
      })
    );
  }, [data]);

  return (
    <>
      {/* GRID AREA A */}
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        {/* 'SimpleAreaChart' */}
        {/* https://recharts.org/en-US/examples/SimpleAreaChart */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}  // defined above
            margin={{   // adjustments to default settings:
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              {/* Define gradient: */}
              {/* x1 = x start, x2 = x stop (no gradient in this case) */}
              {/* y1 = y start, y2 = y stop */}
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop   // start/bottom opacity:
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop   // end/top opacity:
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            {/* Comment out (or remove) to remove background grid: */}
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="name"
              tickLine={false}  // no tick lines on axis
              style={{ fontSize: "10px" }}  // use smaller font
            />
            <YAxis
              tickLine={false}  // no tick lines on axis
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]}  // limit to values between 8000 and 23000 (eliminate unused space between 0 and 8000)
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}  // add dot to indicate data point
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)" // <linearGradient> defined above
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"  // <linearGradient> defined above
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* GRID AREA B */}
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit and Revenue"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        {/* BiaxialLineChart */}
        {/* https://recharts.org/en-US/examples/BiaxialLineChart */}
        {/* *** Much of this formatting copied from above *** */}
        {/* change <Area> to <Line> */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            {/* 'vertical={false}' = only horizontal lines */}
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            {/* left side Y axis */}
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            {/* right side Y axis */}
            <YAxis
              yAxisId="right"
              orientation="right" // align to right side of chart (default = left)
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            {/* Legend at bottom of chart */}
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* GRID AREA C */}
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        {/* 'SimpleBarChart' */}
        {/* https://recharts.org/en-US/examples/SimpleBarChart */}
        {/* Very similar to AreaChart at top */}
        {/* change <Area> to <Bar> */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{   // changes to defaults
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            {/* 'colorRevenue' = gradient defined above */}
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;