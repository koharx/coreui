import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { fetchStockData } from "../api/stockApi";

const StockList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // fetchStockData().then(setStocks).catch(console.error);
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Stock Market Dashboard
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell>Price ($)</TableCell>
            <TableCell>Change (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell>{stock.name}</TableCell>
              <TableCell>{stock.current_price}</TableCell>
              <TableCell
                style={{
                  color:
                    stock.price_change_percentage_24h > 0 ? "green" : "red",
                }}
              >
                {stock.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default StockList;
