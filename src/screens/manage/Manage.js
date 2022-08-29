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
import SideNav from "../../components/SideNav";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Manage = () => {
  const bg = "#74C3AD";

  const [rawMaterialData, setRawMaterialData] = useState({
    name: "",
    sr: "",
    rmku: "",
    messure_unit: "",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    sr: "",
    sku: "",
    category: "",
    // raw: [
    //   {
    //     rm: "",
    //     qty: "",
    //   },
    // ],
    rm:"",
    qty:""
  });

  const [rawMaterial, setRawMaterial] = useState([]);
  const [rawOpen, setRawOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  useEffect(() => {
    getRawMaterial();
  }, []);
  const getRawMaterial = () => {
    axios.get("http://localhost:8080/rawMaterial").then((res) => {
      setRawMaterial(res.data);
    });
  };
  const [increementSr, setIncreementSr] = useState(rawMaterial.length);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // const [rawMat, setRawMat] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(personName, value);
    setPersonName([...value]);
  };
  let name, value;

  const handleRawMaterial = (e) => {
    name = e.target.name;
    value = e.target.value;
    setRawMaterialData({ ...rawMaterialData, [name]: value });
  };

  const handleNewProduct = (e) => {
    name = e.target.name;
    value = e.target.value;
    newProduct.rm = personName;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const postRawMaterial = () => {
    const { name, sr, rmku, messure_unit } = rawMaterialData;
    axios
      .post("http://localhost:8080/addRawMaterial", {
        name: name,
        sr: rawMaterial.length + 1,
        rmku: rmku,
        messure_unit: messure_unit,
      })
      .then((res) => {
        setRawOpen(true);
        window.location.reload(true);
      });
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setRawOpen(false);
      setProductOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [rawOpen, productOpen]);

  const [addDiv, setAddDiv] = useState([]);
  const [rawMaterialInput, setRawMaterialInput] = useState([]);
  const [rawQuantity, setRawQuantity] = useState([]);

 
  console.log(rawMaterialInput);
  const postNewProduct = () => {
    const { name, sr, sku, category, rm ,qty } = newProduct;
    axios
      .post("http://localhost:8080/addNewProduct", {
        name: name,
        sr: newProduct.length + 1,
        sku: sku,
        category: category,
        rm: rm,
        qty:qty
      })
      .then((res) => {
        setProductOpen(true);
        window.location.reload(true);
      });
  };

  useEffect(() => {
    if (rawMaterial.length > 0 && addDiv.length === 0) {
      setAddDiv(
        addDiv.concat(
          <Input
            setRawMateriaInput={setRawMaterialInput}
            rawMaterialInput={rawMaterialInput}
            rawQuantity={rawQuantity}
            setRawQuantity={setRawQuantity}
            rawMaterial={rawMaterial}
            key={addDiv.length}
          />
        )
      );
    }
  }, [rawMaterial]);

  const handleAddDiv = () => {
    setAddDiv(
      addDiv.concat(
        <Input
          setRawMateriaInput={setRawMaterialInput}
          rawMaterialInput={rawMaterialInput}
          rawQuantity={rawQuantity}
          setRawQuantity={setRawQuantity}
          rawMaterial={rawMaterial}
          key={addDiv.length}
        />
      )
    );
  };
  const Input = ({ key }) => {
    return (
      <Box className="d-flex justify-content-between">
        <select
          type={"text"}
          style={{ maxwidth: 400, minWidth: 400 }}
          className="global-input-2"
          name="rm"
          onChange={(e) => {
            const _data = [...rawMaterialInput];
            _data[key] = e.target.value;
            setRawMaterialInput(_data);
          }}
          value={rawMaterialInput[key]}
        >
          <option selected>Select Raw Material</option>
          {console.log(rawMaterial)}
          {rawMaterial?.map((r) => {
            return <option>{r.name}</option>;
          })}
        </select>

        <input
          type={"number"}
          style={{ maxWidth: 300, minWidth: 300 }}
          className="global-input-2"
          placeholder="Used Qty in Meter"
          name="qty"
          onChange={(e) => {
            const _data = [...rawQuantity];
            _data[key] = e.target.value;
            setRawQuantity(_data);
          }}
          value={rawQuantity[key]}
        />
      </Box>
    );
  };

  return (
    <>
      <Box className="d-flex">
        <SideNav />
        <Box className="p-5 w-100">
          <Paper elevation={4}>
            <div
              className="px-3 py-3 pt-4"
              style={{ color: "#219653", fontSize: 22 }}
            >
              All Products
            </div>
            <TableData />
          </Paper>
          <br />
          <Paper elevation={4}>
            <div
              className="px-3 py-3 pt-4"
              style={{ color: "#219653", fontSize: 22 }}
            >
              Manage Raw Materials
            </div>
            <TableDataProduct />
          </Paper>
          <br />
          <br />
          <Box style={{ padding: "0 10%" }}>
            <Box className="text-center">
              <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 15 }}>
                Add new Raw Material
              </div>
              <Box>
                <input
                  type={"text"}
                  style={{ width: "100%" }}
                  className="global-input-2"
                  placeholder="Name"
                  name="name"
                  onChange={handleRawMaterial}
                  value={rawMaterialData.name}
                />
              </Box>
              <Box className="d-flex justify-content-between">
                <input
                  disabled
                  type={"number"}
                  style={{ maxWidth: 180, color: "lightgray" }}
                  className="global-input-2"
                  placeholder="Sr"
                  name="sr"
                  onChange={handleRawMaterial}
                  value={rawMaterialData.sr}
                />
                <input
                  type={"text"}
                  style={{ maxWidth: 228 }}
                  className="global-input-2"
                  placeholder="Rmku"
                  name="rmku"
                  onChange={handleRawMaterial}
                  value={rawMaterialData.rmku}
                />
                <select
                  type={"text"}
                  style={{ maxwidth: 400, minWidth: 400 }}
                  className="global-input-2"
                  name="messure_unit"
                  onChange={handleRawMaterial}
                  value={rawMaterialData.messure_unit}
                >
                  <option selected>Select Messure Unit</option>
                  <option>Meter</option>
                  <option>Centi meter</option>
                </select>
              </Box>

              <Box>
                {rawMaterialData.name &&
                rawMaterialData.rmku &&
                rawMaterialData.messure_unit ? (
                  <button
                    className="btn my-4"
                    style={{
                      width: 200,
                      height: 55,
                      color: "#fff",
                      background: bg,
                      border: `1px solid ${bg}`,
                      fontWeight: 600,
                      fontSize: 21,
                    }}
                    onClick={postRawMaterial}
                  >
                    Add
                  </button>
                ) : (
                  <button
                    className="btn my-4"
                    disabled
                    style={{
                      width: 200,
                      height: 55,
                      color: "#219653",
                      border: `1px solid ${bg}`,
                      fontWeight: 600,
                      fontSize: 21,
                    }}
                  >
                    Add
                  </button>
                )}
                {/* {console.log(rawOpen,"raw")} */}
                {rawOpen && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="info">Raw Material added!!</Alert>
                  </Stack>
                )}
              </Box>
            </Box>
            <br />
            <br />
            <Box className="text-center">
              <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 20 }}>
                Add new Products
              </div>
              <Box>
                <input
                  type={"text"}
                  style={{ width: "100%" }}
                  className="global-input-2"
                  placeholder="Name"
                  name="name"
                  onChange={handleNewProduct}
                  value={newProduct.name}
                />
              </Box>
              <Box className="d-flex justify-content-between">
                <input
                  disabled
                  type={"number"}
                  style={{ maxWidth: 220, minWidth: 220 }}
                  className="global-input-2"
                  placeholder="Sr"
                  name="sr"
                  onChange={handleNewProduct}
                  value={newProduct.sr}
                />
                <input
                  type={"text"}
                  style={{ maxWidth: 228, minWidth: 228 }}
                  className="global-input-2"
                  placeholder="Sku"
                  name="sku"
                  onChange={handleNewProduct}
                  value={newProduct.sku}
                />
                <select
                  type={"text"}
                  style={{ maxwidth: 400, minWidth: 400 }}
                  className="global-input-2"
                  name="category"
                  onChange={handleNewProduct}
                  value={newProduct.category}
                >
                  <option selected>Select Category</option>
                  <option>Bedsheet</option>
                  <option>Cushion</option>
                  <option>Cushion Cover</option>
                </select>
              </Box>

              {/* {addDiv} */}
              <Box className="d-flex justify-content-between">
                <FormControl
                  sx={{
                    m: 1.5,
                    width: 400,
                    height: 50,
                    border: "1px solid #045538",
                    borderRadius: 3,
                    paddingBottom: 7,
                  }}
                >
                  <InputLabel
                    id="demo-multiple-checkbox-label"
                    sx={{
                      color: "black",
                      fontSize: 24,
                      paddingTop: -2,
                      "& .css-1lupbjb-MuiFormLabel-root-MuiInputLabel-root": {
                        transition: "none",
                        fontFamily: "Poppins, sans-serif",
                      },
                    }}
                  >
                    Select Raw Material
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    // multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Select Raw Material" />}
                    renderValue={(selected) => selected}
                    MenuProps={MenuProps}
                    name="rm"
                  >
                    {rawMaterial?.map((raw) => (
                      <MenuItem key={raw.name} value={raw.id}>
                        <Checkbox checked={personName.indexOf(raw.id) > -1} />
                        <ListItemText primary={raw.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <input
                  type={"number"}
                  style={{ maxWidth: 300, minWidth: 300 }}
                  className="global-input-2"
                  placeholder="Used Qty in Meter"
                  name="qty"
                  onChange={handleNewProduct}
                  value={newProduct.qty}
                />
              </Box>

              <Box>
                <button
                  className="btn my-4"
                  style={{
                    width: 50,
                    height: 55,
                    color: "#fff",
                    background: bg,
                    border: `1px solid ${bg}`,
                    fontWeight: 600,
                    fontSize: 21,
                  }}
                  onClick={handleAddDiv}
                >
                  +
                </button>
              </Box>
              <Box>
                <Box>
                  {/* {console.log(newProduct)} */}
                  {newProduct.raw &&
                  newProduct.sku &&
                  newProduct.name &&
                  newProduct.category ? (
                    <button
                      className="btn my-4"
                      style={{
                        width: 200,
                        height: 55,
                        color: "#fff",
                        background: bg,
                        border: `1px solid ${bg}`,
                        fontWeight: 600,
                        fontSize: 21,
                      }}
                      onClick={postNewProduct}
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      className="btn my-4"
                      disabled
                      style={{
                        width: 200,
                        height: 55,
                        color: "#219653",
                        border: `1px solid ${bg}`,
                        fontWeight: 600,
                        fontSize: 21,
                      }}
                    >
                      Add
                    </button>
                  )}
                  {/* {console.log(productOpen)} */}
                  {productOpen && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="info">Product added!!</Alert>
                    </Stack>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Manage;

function TableData() {
  const columns = [
    { id: "sr", label: "Sr", minWidth: 170 },
    { id: "rmku", label: "Rmku", minWidth: 100 },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "messure_unit",
      label: "Messure Unit",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
      render: (id) => (
        <Button onClick={() => handleRawProductDelete(id)} key={rawMaterial.id}>
          {/* {console.log(rawMaterial)} */}
          Delete
        </Button>
      ),
    },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rawMaterial, setRawMaterial] = useState([]);

  useEffect(() => {
    getRawMaterial();
  }, []);
  const getRawMaterial = () => {
    axios.get("http://localhost:8080/rawMaterial").then((res) => {
      setRawMaterial(res.data);
    });
  };

  const show_item_after_delete = () => {
    setTimeout(() => {
      axios.get(`http://localhost:8080/rawMaterial`).then((res) => {
        setRawMaterial(res.data);
      });
    }, 500);
  };

  const handleRawProductDelete = (id) => {
    rawMaterial.forEach((item) => {
      if (item.id === id) {
        axios.delete(`http://localhost:8080/rawMaterial/${id}`).then((res) => {
          // console.log('deleted')
          window.location.reload(true);
        });
      }
      show_item_after_delete();
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
      <TableContainer sx={{ maxHeight: 440 }}>
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
            {rawMaterial
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.render && column.render(row.id)}
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
        count={rawMaterial.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

function TableDataProduct() {
  const Productcolumns = [
    { id: "sr", label: "Sr", minWidth: 170 },
    { id: "sku", label: "Sku", minWidth: 100 },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "cost",
      label: "Cost",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
      render: () => (
        <>{ProToManufacture?.map((item) => item.price_per_meter)}</>
      ),
    },
    {
      id: "qty",
      label: "Ava Qty",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
      render: () => <>{ProToManufacture?.map((item) => item.qty_in_meter)}</>,
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
      render: (id) => (
        <Button onClick={() => handleProductDelete(id)} key={product.id}>
          {/* {console.log(product)} */}
          Delete
        </Button>
      ),
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [product, setProduct] = useState([]);
  const [ProToManufacture, setProToManufacture] = useState([]);

  const getProToManufacture = () => {
    axios.get("http://localhost:8080/productToManufacture").then((res) => {
      setProToManufacture(res.data);
    });
  };
  useEffect(() => {
    getProducts();
    getProToManufacture();
  }, []);

  const getProducts = () => {
    axios.get("http://localhost:8080/products").then((res) => {
      setProduct(res.data);
    });
  };

  const show_item_after_delete = () => {
    setTimeout(() => {
      axios.get(`http://localhost:8080/products`).then((res) => {
        setProduct(res.data);
      });
    }, 500);
  };

  const handleProductDelete = (id) => {
    product.forEach((item) => {
      if (item.id === id) {
        // console.log(item.id, id);
        axios.delete(`http://localhost:8080/product/${id}`).then((res) => {
          window.location.reload(true);
        });
      }
      show_item_after_delete();
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
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {Productcolumns.map((column) => (
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
            {/* {console.log(product)} */}
            {product
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {Productcolumns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {/* {console.log(row)} */}
                          {column.render && column.render(row.id)}
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
        count={product.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
