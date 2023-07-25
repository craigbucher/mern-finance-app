import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { palette } = useTheme(); // import MUI color theme
  const pieColors = [palette.primary[800], palette.primary[500]]; // colors for pie chart below

  const { data: kpiData } = useGetKpisQuery();  // data from api, rename to 'kpiData'
  const { data: productData } = useGetProductsQuery();  // data from api, rename to 'productData'
  const { data: transactionData } = useGetTransactionsQuery();  // data from api, rename to 'transactionData'

   // useMemo will only recompute the memoized value when one of the dependencies has changed
  const pieChartData = useMemo(() => {
    if (kpiData) {  // if 'kpiData' exists
      const totalExpenses = kpiData[0].totalExpenses;
      // map through expensesByCategory:
      return Object.entries(kpiData[0].expensesByCategory).map(   // Object.entries = both key and value
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,                   // = category value
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,   // = pie total
            },
          ];
        }
      );
    }
  }, [kpiData]);  // only (re)calculate when 'kpiData' changes

  // columns in DataGrid
  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,  // take 1 fraction of width
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,  // take 0.5 fraction of width
      // 'GridCellParams' = data type provided by MUI
      renderCell: (params: GridCellParams) => `$${params.value}`, // add '$' to displayed value (since is currency)
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`, // add '$' to displayed value (since is currency)
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,  // take 1 fraction of width
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67, // take 2/3 fraction of width
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35, // take 1/3 fraction of width
      renderCell: (params: GridCellParams) => `$${params.value}`, // add '$' to displayed value (since is currency)
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
      // params.value = array of strings
        (params.value as Array<string>).length, // 'Count' = length of 'productIds' array
    },
  ];

  return (
    <>
      {/* GRID AREA G */}
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        {/* Place <DataGrid> within <Box> component; can then */}
        {/* style DataGrid from Box (DataGrid can't style itself) */}
        <Box
          mt="0.5rem"   // replace defaults
          p="0 0.5rem"
          height="75%"
          sx={{
            // Can use 'Elements' in dev tools to find class names for
            // DataGrid components and then modify them
            // '&' = target class in child component (i.e., DataGrid)
            "& .MuiDataGrid-root": {    // affect entire DataGrid 
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {    // darken cell borders
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {   // darken column header line
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": { // remove column separators
              visibility: "hidden",
            },
          }}
        >
          {/* DataGrid = MUI's table component */}
          <DataGrid
            columnHeaderHeight={25} // taller than default
            rowHeight={35}          // smaller than default
            hideFooter={true}
            rows={productData || []}  // data, itself or empty array if doesn't exist (so doesn't error out)
            columns={productColumns}  // column IDs, defined above
          />
        </Box>
      </DashboardBox>

      {/* GRID AREA H */}
      {/* pretty much cut and pasted from above */}
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`} // calculate items in 'transactionData' array
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"  // slightly larger than above
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          {/* DataGrid = MUI's table component */}
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}  // defined above
          />
        </Box>
      </DashboardBox>

      {/* GRID AREA I */}
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {/* create pie chart for each object in 'pieChartData (defined above) */}
          {pieChartData?.map((data, i) => (
            // each chart in it's own <Box>
            // React requires each list item to have unique key:
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {/* assign different color to each entry */}
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />  // pieColors defined above
                  ))}
                </Pie>
              </PieChart>
              {/* Display category name below chart: */}
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      {/* GRID AREA J */}
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        {/* Simulated 'progress' bar: */}
        <Box    // left side
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box    // right side
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%" // = 40% of parent element (= progress)
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed. In volutpat nullam at est id cum pulvinar nunc.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;