import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Img1 from "../../assets/bubble.png";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Fab } from "@mui/material";
import Img2 from "../../assets/left-arrow.png";
import SideNav from "../../components/SideNav";
import axios from "axios";
import {Button} from "@mui/material";

const ManageList = () => {
  const bg = "#74C3AD";

  return (
    <Box className="d-flex">
      <SideNav />
      <Box className="p-5 w-100">
        <Paper elevation={4}>
          <div
            className="px-3 py-3 pt-4"
            style={{ color: "#219653", fontSize: 22 }}
          >
            Detailed Page with products list
          </div>
          <TableData />
        </Paper>
        <div style={{ position: "fixed", right: 30, bottom: 30 }}>
          <Fab style={{ background: "#74C3AD" }} aria-label="edit">
            <img src={Img2} style={{ width: 38 }} />
          </Fab>
        </div>
      </Box>
    </Box>
  );
};

export default ManageList;



function TableData() {


  const columns = [
    { id: "sr", label: "Sr", minWidth: 70 },
    { id: "sku", label: "Sku", minWidth: 100 },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "raw_material",
      label: "Raw Material",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
      render: () => (<>{ProToManufacture?.map((item) => item.price_per_meter)}</>),
    },
    {
      id: "qty",
      label: "Qty In Mtr.",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
      render: () => (<>{ProToManufacture?.map((item) => item.qty_in_meter)}</>),
    },
    {
      id: "qty",
      label: "Available Qty",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
      render: () => (<>{ProToManufacture?.map((item) => item.qty_in_meter)}</>),
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
      render: (id) => <Button  onClick={() => handleProductDelete(id)} key={detailProduct.id}>Delete</Button>,
    },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [detailProduct, setDetailProduct] = useState([]);
  const [ProToManufacture, setProToManufacture] = useState([]);
  const [product, setProduct] = useState([]);
  const getProToManufacture = () => {
    axios.get("http://localhost:8080/productToManufacture").then((res) => {
      setProToManufacture(res.data);
    });
  };
  useEffect(() => {
    getDetailProducts();
    getProToManufacture();
  }, []);


  const handleProductDelete = (id) => {
    detailProduct.forEach((item) => {
      if (item.id === id) {
        // console.log(item.id, id);
        axios.delete(`http://localhost:8080/product/${id}`).then((res) => {
          window.location.reload(true);
        });
      }
      show_item_after_delete();
    });
  };
  const show_item_after_delete = () => {
    setTimeout(() => {
      axios.get(`http://localhost:8080/products`).then((res) => {
        setDetailProduct(res.data);
      });
    }, 500);
  };
  const getDetailProducts = () => {
    axios.get("http://localhost:8080/products").then((res) => {
      setDetailProduct(res.data);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }} elevation={0}>
      <TableContainer sx={{ maxHeight: window.innerHeight - 230 }}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {detailProduct
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.render && column.render()}
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={detailProduct.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
