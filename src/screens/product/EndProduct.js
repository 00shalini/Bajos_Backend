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
import { Fab, getAccordionDetailsUtilityClass } from "@mui/material";
import Img2 from "../../assets/left-arrow.png";
import SideNav from "../../components/SideNav";
import axios from "axios";

const EndProduct = () => {
  const bg = "#74C3AD";
  const [contractor, setContractor] = useState([]);
  const [product, setProduct] = useState([]);
  const [contractorIdData, setContractorIdData] = useState([]);
  const [productIdData, setProductIdData] = useState([]);
  const [getAddToManufacturing, setGetAddToManufacturing] = useState([]);
  const expectedProductNum = 100;

  const [rawMaterial, setRawMaterial] = useState([]);
  const [endProduct, setEndProduct] = useState({
    expected_product: "",
    expected_raw_material: "",
    giving_date: "",
    recieved_product_date: "",
  });

  const [recievedProduct, setRecievedProduct] = useState({});
  const [recievedRaw, setRecievedRaw] = useState({});
  const [productNumId, setNumId] = useState("");
  const [Num, setNum] = useState({
    recieved_product: "",
    recieved_raw: "",
    raw_id:""
  });

  const handleRecievedProduct = (e, id) => {
    value = e.target.value;
    // console.log(productIdData.rm)
setNumId(id)
   // console.log(recievedProduct)

    setRecievedProduct({ recieved_product: value });
  };

  const handleRecievedRaw = (e, id) => {
    value = e.target.value;
   // console.log(recievedRaw)
    setRecievedRaw({ recieved_raw: value });
  };
  var rem;
  useEffect(() => {
    getProducts();
    getContractorData();
    getAddToManu();
    getRawMaterial();
  }, []);

  let name, value;
  const handleEndProduct = (e) => {
    name = e.target.name;
    value = e.target.value;
   // console.log(endProduct);
    setEndProduct({ ...endProduct, [name]: value });
  };

  
//   for ( var i =0; i< productIdData.rm.length; i++){
//       console.log(productIdData.rm[i])
//   }
  getAddToManufacturing.map((item) => {
   
    rem = Number(item.qty_in_meter) - Number(productIdData.qty);
    localStorage.setItem("rem",rem)
  });

  const handleEndProductData = () => {
    const {
      expected_product,
      expected_raw_material,
      giving_date,
      recieved_product_date,
    } = endProduct;

    let newDate = new Date();
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let d = newDate.getDate();
    let todayDate = d + "." + month + "." + year;
    if (month <= 12 || month >= 1) {
      var recieveddate = month + 1;
      var newdate = d+ "." +recieveddate + "." +year
    }
    endProduct.giving_date = todayDate;
    endProduct.recieved_product_date = newdate;
    endProduct.expected_product = expectedProductNum;
    endProduct.expected_raw_material = rem;
//console.log(endProduct)
     for ( var i = 0; i <productIdData?.rm?.length ; i++){
        // console.log(productIdData.rm[i])
     }
    axios
      .post("http://localhost:8080/addEndProduct", {
        expected_product: endProduct.expected_product,
        expected_raw_material: endProduct.expected_raw_material,
        giving_date: endProduct.giving_date,
        recieved_product_date: endProduct.recieved_product_date,
        raw_id:productNumId
      })
      .then((res) => {
        // console.log(res.data);
      });

    Num.recieved_product = recievedProduct.recieved_product;
    Num.recieved_raw = recievedRaw.recieved_raw;
   // console.log(productIdData)
    axios
      .post("http://localhost:8080/addExpectedProduct", {
        recieved_product: Num.recieved_product,
        recieved_raw: Num.recieved_raw,
        raw_id:productNumId
      })
      .then((res) => {
       // console.log(res.data);
      });
  };
  const getProducts = () => {
    axios.get("http://localhost:8080/products").then((res) => {
      setProduct(res.data);
    });
  };

  const getContractorData = () => {
    axios.get("http://localhost:8080/contractors").then((res) => {
      setContractor(res.data);
    });
  };

  const handleContractorId = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const con_id = el.getAttribute("id");
    axios.get(`http://localhost:8080/contractor/${con_id}`).then((res) => {
      setContractorIdData(res.data);
      // console.log(res.data);
    });
  };

  const handleProductId = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const pro_id = el.getAttribute("id");
    axios.get(`http://localhost:8080/product/${pro_id}`).then((res) => {
      setProductIdData(res.data);
     // console.log(res.data);
    });
    // console.log(productIdData.rm)

  };

  const getAddToManu = () => {
    axios.get("http://localhost:8080/productToManufacture").then((res) => {
      setGetAddToManufacturing(res.data);
     // console.log(res.data);
    });
  };

  const getRawMaterial = () => {
    axios.get("http://localhost:8080/rawMaterial").then((res) => {
      setRawMaterial(res.data);
    });
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
            End product recived
          </div>
        </Paper>
        <br />
        <br />
        {/* {console.log(contractor, product)} */}
        <select
          type={"text"}
          style={{ width: "100%" }}
          className="global-input-2"
          placeholder="Used Qty in Meter"
          onChange={handleContractorId}
        >
          <option selected>Select Contractor from list</option>
          {contractor.map((item) => {
            return <option id={item.id}>{item.name}</option>;
          })}
        </select>
        <select
          type={"text"}
          style={{ width: "100%" }}
          className="global-input-2"
          placeholder="Used Qty in Meter"
          onChange={handleProductId}
        >
          <option selected>Select Product from list</option>

          {product.map((item) => {
            return <option id={item.id}>{item.name}</option>;
          })}
        </select>
        <br />
        <br />
        <TableContainer component={Paper}>
          {/* {console.log(contractorIdData, productIdData)} */}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr</TableCell>
                <TableCell align="right">Expected Products</TableCell>
                <TableCell align="right">
                  Expected Remaining Raw Materials
                </TableCell>
                <TableCell align="center">Enter Recieved Product</TableCell>
                <TableCell align="center">Enter Raw Material</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {console.log(productIdData.rm)} */}
              {productIdData?.rm?.map((row, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{expectedProductNum}</TableCell>
                  <TableCell align="center">{rem}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <input
                      type={"number"}
                      style={{ maxWidth: 300, minWidth: 300, maxHeight: 50 }}
                      className="global-input-2"
                      name="recieved_product"
                      onChange={(e) => handleRecievedProduct(e, row.id)}
                      value={recievedProduct[row.id]}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    {console.log(row.id)}
                    <input
                      type={"number"}
                      style={{ maxWidth: 300, minWidth: 300, maxHeight: 50 }}
                      className="global-input-2"
                      name="recieved_raw"
                      onChange={(e) => handleRecievedRaw(e, row.id)}
                      value={recievedRaw[row.id]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        <br />
        <br />
        <Box className="d-flex justify-content-between align-items-center">
          <div></div>
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
              onClick={handleEndProductData}
            >
              Submit
            </button>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default EndProduct;
