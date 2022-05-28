import Layout from "../../components/Layout";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import rowsJson from "../../lib/data_sorted.json";
export async function getServerSideProps(context: any) {
  return {
    props: { artist: "at" },
  };
}
const TablePage = ({ table }: { table: any }) => {
  const rows = rowsJson.map((row: any) => {
    return { ...row, id: Math.random() };
  });
  const columns: GridColDef[] = [
    { field: "models", headerName: "Model" },
    { field: "av_fleet_age", headerName: "Fleet" },
    { field: "operatorName", headerName: "Operator" },
    { field: "countryName", headerName: "countryName" },
  ];
  return (
    <Layout>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </Layout>
  );
};
export default TablePage;
