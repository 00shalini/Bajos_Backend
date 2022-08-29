import { Box } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
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
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AddProduct = () => {
  const bg = "#74C3AD";
  const [contractor, setContractor] = useState("");
  const [product, setProduct] = useState("");
  const [productIdData, setProductIdData] = useState({});
  const [storeRaw, setStoreRaw] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [products, setProducts] = useState([]);
  const [addProductToManufacturing, setAddProductToManufacturing] = useState({
    contractor: "",
    product: "",
    labour_cost_per_pcs: "",
    cur_date: "",
  });
  const [productOpen, setProductOpen] = useState(false);

  const [rawMaterial, setRawMaterial] = useState([]);
  const [productNumId, setNumId] = useState("");
  const [Num, setNum] = useState({
    qty_in_meter: "",
    price_per_meter: "",
    raw_id: "",
  });
  const [qtyInMeter, setQtyInMeter] = useState({});
  const [pricePerMeter, setPricePerMeter] = useState({});

  useEffect(() => {
    getProducts();
    getContractorData();
  }, []);

  const getProducts = () => {
    axios.get("http://localhost:8080/products").then((res) => {
      setProducts(res.data);
    });
  };

  const handleProductId = async (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const pro_id = el.getAttribute("id");
    console.log(pro_id);
    const res = await axios.get(`http://localhost:8080/product/${pro_id}`);
    console.log(res.data);
    setProductIdData(res.data);
    //setTimeout(getRawArray(), 5000)
    getRawArray(res.data);
    // console.log(productIdData.rm)
  };

  const getRawArray = async (product) => {
    const storeRaw = [];

    for (let i = 0; i < product?.rm?.length; i++) {
      const res = await axios.get(`http://localhost:8080/rawMaterial/${product?.rm[i]}`);
      storeRaw.push(res.data);
    }

    setStoreRaw(storeRaw);
  };
  const getContractorData = () => {
    axios.get("http://localhost:8080/contractors").then((res) => {
      setContractors(res.data);
    });
  };

  let name, value;
  const handleAddProductToManufacturing = (e) => {
    name = e.target.name;
    value = e.target.value;
    let newDate = new Date();
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let d = newDate.getDate();
    let todayDate = d + "." + month + "." + year;

    addProductToManufacturing.cur_date = todayDate;
    setAddProductToManufacturing({
      ...addProductToManufacturing,
      [name]: value,
    });

    if (name == "product") {
      getRawMaterial();
    }

    // console.log(addProductToManufacturing);
  };

  const handleAddToManufacture = (productNumId) => {
    const { contractor, product, labour_cost_per_pcs, cur_date } =
      addProductToManufacturing;
    axios
      .post("http://localhost:8080/addProductToManufacturing", {
        contractor: contractor,
        product: product,
        labour_cost_per_pcs: labour_cost_per_pcs,
        cur_date: cur_date,
      })
      .then((res) => {
        // console.log(res.data);
      });
    Num.qty_in_meter = qtyInMeter.qty_in_meter;
    Num.price_per_meter = pricePerMeter.price_per_meter;
    console.log(productNumId);

    axios
      .post(`http://localhost:8080/addProductToManufacture`, {
        qty_in_meter: Num.qty_in_meter,
        price_per_meter: Num.price_per_meter,
        raw_id: productNumId,
      })
      .then((res) => {
        setProductOpen(true)
      });
  };

  const getRawMaterial = () => {
    axios.get("http://localhost:8080/rawMaterial").then((res) => {
      setRawMaterial(res.data);
    });
  };

  const handleQuantitiyInMetere = (e, id) => {
    value = e.target.value;
    // console.log(id)
    setNumId(id);
    setQtyInMeter({ qty_in_meter: value });
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
     
      setProductOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [productOpen]);
  const handlePricePerMeter = (e, id) => {
    value = e.target.value;
    //console.log(id)
    setPricePerMeter({ price_per_meter: value });
  };

  return (
    <Box className="d-flex">
      <SideNav />
      <Box className="p-5 w-100">
        <Paper elevation={4}>
          <div
            className="px-3 py-3 pt-4"
            style={{ color: "#219653", fontSize: 22 }}
          >
            Add Product to Manufacturing
          </div>
        </Paper>
        <br />
        <br />
        <select
          type={"text"}
          style={{ width: "100%" }}
          className="global-input-2"
          name="contractor"
          onChange={handleAddProductToManufacturing}
          value={addProductToManufacturing.name}
        >
          <option selected>Select Contractor from list</option>
          {contractors.map((item) => {
            return <option>{item.name}</option>;
          })}
        </select>
        <select
          type={"text"}
          style={{ width: "100%" }}
          className="global-input-2"
          name="product"
          onChange={handleProductId}
        >
          <option selected>Select Product from list</option>
          {products?.map((item) => {
            return <option id={item.id}>{item.name}</option>;
          })}
        </select>
        <br />
        <br />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rmku</TableCell>
                <TableCell align="center">Raw Material Name</TableCell>
                <TableCell align="center">Qty. in meters</TableCell>
                <TableCell align="center">Price per meter</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                storeRaw?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.rmku}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">
                      {" "}
                      <input
                        type={"number"}
                        style={{ maxWidth: 300, minWidth: 300, maxHeight: 50 }}
                        className="global-input-2"
                        name="qty_in_meter"
                        onChange={(e) => handleQuantitiyInMetere(e, row.id)}
                        value={setQtyInMeter[row.id]}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <input
                        type={"number"}
                        style={{ maxWidth: 300, minWidth: 300, maxHeight: 50 }}
                        className="global-input-2"
                        name="price_per_pcs"
                        onChange={(e) => handlePricePerMeter(e, row.id)}
                        value={setPricePerMeter[row.id]}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        <Box className="d-flex justify-content-between align-items-center">
          <div
            style={{
              border: `1px solid ${bg}`,
              padding: 12,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#219653",
                borderRight: "1px solid #000",
                paddingRight: 14,
                fontSize: 19,
              }}
            >
              Labour Cost per pcs
            </div>
            <div style={{ paddingLeft: 14 }}>
              <input
                type={"number"}
                className="input-cost"
                placeholder="00.00"
                style={{ width: 100 }}
                name="labour_cost_per_pcs"
                onChange={handleAddProductToManufacturing}
                value={addProductToManufacturing.name}
              />
            </div>
            <div style={{ color: "#219653", paddingRight: 14, fontSize: 19 }}>
              INR
            </div>
          </div>
          <div>
            <button
              className="btn my-4"
              style={{
                width: 300,
                height: 55,
                color: "#219653",
                border: `1px solid ${bg}`,
                fontWeight: 600,
                fontSize: 21,
              }}
              onClick={handleAddToManufacture}
            >
              Submit for production
            </button>
          </div>
          {productOpen && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="info">Contractor updated!!</Alert>
                    </Stack>
                  )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddProduct;
