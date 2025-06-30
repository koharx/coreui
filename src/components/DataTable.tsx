import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Column {
  label: string;
  field: string;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, any>[];
  pagination?: React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({ columns, rows, pagination }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.field}>{col.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((col) => (
              <TableCell key={col.field}>{row[col.field]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    {pagination}
  </TableContainer>
);

export default DataTable;
