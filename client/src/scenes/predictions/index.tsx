import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";

const Predictions = () => {
  const { palette } = useTheme();	// import MUI color theme
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();	// get api data, rename to 'kpiData'

	// useMemo will only recompute the memoized value when one of the dependencies has changed
  const formattedData = useMemo(() => {
    if (!kpiData) return [];	// if kpiData doesn't exitst, return empty array to avoid errors
    const monthData = kpiData[0].monthlyData;	// convenience variable

		// <DataPoint> = regressio type
    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];	// regression library requires data in this format
      }
    );
    const regressionLine = regression.linear(formatted);	// run linear regression on 'formatted' data

    return monthData.map(({ month, revenue }, i: number) => {
      return {
				// create lines:
        name: month,
        "Actual Revenue": revenue,
				// 'regressionLine' defined above
        "Regression Line": regressionLine.points[i][1],	// '[i][1]' = current month/second value = revenue
        "Predicted Revenue": regressionLine.predict(i + 12)[1],	// 'i + 12' = 12 months ahead
      };
    });
  }, [kpiData]);	// (re)calculate value only when kpiData changes

  return (
		// overall container = <DashboardBox>
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">
            charted revenue and predicted revenue based on a simple linear
            regression model
          </Typography>
        </Box>
        <Button
					// change boolean state of 'isPredictions'
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",	// rgba(0,0,0,.4) = black, 40% transparency
          }}
        >
          Show Predicted Revenue for Next Year
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
				{/* 'SimpleLineChart' */}
        {/* https://recharts.org/en-US/examples/SimpleLineChart */}
				<LineChart
          data={formattedData}
          margin={{		// change defaults:
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
					{/* strokeDasharray = formatting of line strokes */}
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis 
						dataKey="name" 
						tickLine={false} // no ticks on axis line
						style={{ fontSize: "10px" }}>
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}	// label axis between these values (prevents lots of unused space since no values < 12000)
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `$${v}`}	// add '$' to value (since is currency)
          >
            <Label
              value="Revenue in USD"
              angle={-90}	// orient vertically (with base of letters toward chart)
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
					{/* <Tooltip> = info displayed on hover */}
          <Tooltip />
          <Legend verticalAlign="top" />
					{/* configure lines: */}
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"	// *not* using theme
            dot={false}
          />
          {isPredictions && (	// if 'isPredictions' is true:
            <Line
              strokeDasharray="5 5"	// use dashed line
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;