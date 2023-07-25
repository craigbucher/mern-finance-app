import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

// just using hard-coded data for this example:
const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

// *** SEE 'Row1.tsx' FOR FORMATTING/SYNTAX EXPLANATIONS ***

const Row2 = () => {
  const { palette } = useTheme();	// import MUI color theme
  const pieColors = [palette.primary[800], palette.primary[300]];
  // RTK query will cache api responses, so can be used across multiple components without calling api multiple times
  const { data: operationalData } = useGetKpisQuery();	// data from api, rename to 'operationalData'
  const { data: productData } = useGetProductsQuery();	// data from api, rename to 'productData'

	// useMemo will only recompute the memoized value when one of the dependencies has changed
  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&		// ensure 'data' exists
			// map through monthlyData:
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),	// first three letters
            "Operational Expenses": operationalExpenses,	// in quotes, because has spaces
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);	// compute only when 'operationalData' changes

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  return (
    <>
			{/* GRID AREA D */}
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
				{/* SimpleLineChart */}
				{/* https://recharts.org/en-US/examples/SimpleLineChart */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

			{/* GRID AREA E */}
      <DashboardBox gridArea="e">
        <BoxHeader title="Campaigns and Targets" sideText="+4%" />
				{/* FlexBetween = align center, equal space between items: */}
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
					{/* PieChartWithPaddingAngle */}
					{/* https://recharts.org/en-US/examples/PieChartWithPaddingAngle */}
          <PieChart
            width={110}		// small-ish
            height={100}
            margin={{			// customize margin settings:
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"			// remove pie border
              data={pieData}		// defined, above
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />	// 'pieColors' defined above
              ))}
            </Pie>
          </PieChart>
					{/* Text in middle of DashboardBox */}
					{/* flexBasis="40%" = 40% of parent width */}
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
					{/* Text at right of DashboardBox */}
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

			{/* GRID AREA F */}
      <DashboardBox gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
        {/* SimpleScatterChart */}
				{/* https://recharts.org/en-US/examples/SimpleScatterChart */}
				<ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{		// modify defaults:
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"	// data being used
              name="price"		// name on chart
              axisLine={false}	// no axis lines inside chart
              tickLine={false}	// no tick lines on axis line
              style={{ fontSize: "10px" }}	// smaller
              tickFormatter={(v) => `$${v}`}	// add '$' to values on axis line (since is a price)
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
						{/* ZAxis = how large the dots will be */}
						{/* In this case, restricting to one size = 20 */}
            <ZAxis type="number" range={[20]} />
						{/* <Tooltip> = hover over data point */}
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}		// defined above
              fill={palette.tertiary[500]}	// color of the dots
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;