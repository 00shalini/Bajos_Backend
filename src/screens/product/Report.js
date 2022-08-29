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

const Report = () => {
  const bg = "#74C3AD";

  const [product, setProduct] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [endProduct, setEndProduct] = useState([]);
  const [expectedProduct, setExpectedProduct] = useState([]);
  const [contractorIdData, setContractorIdData] = useState([]);
  const [productIdData, setProductIdData] = useState({});
  const [productToManufacturing, setProductToManufacturing] = useState([]);
  const [productToManufacture, setProductToManufacture] = useState([]);
  const [getRaw, setGetRaw] = useState([]);
  const [storeRaw, setStoreRaw] = useState([]);
  var rem;

  const getProductToManufacturing = () => {
    axios.get("http://localhost:8080/productToManufacturing").then((res) => {
      setProductToManufacturing(res.data);
    });
  };
  const getProductToManufacture = () => {
    axios.get("http://localhost:8080/productToManufacture").then((res) => {
      setProductToManufacture(res.data);
    });
  };
  const getContractorData = () => {
    axios.get("http://localhost:8080/contractors").then((res) => {
      setContractors(res.data);
    });
  };

  useEffect(() => {
    getProducts();
    getContractorData();
    
  }, []);

  const handleContractorId = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const con_id = el.getAttribute("id");
    axios.get(`http://localhost:8080/contractor/${con_id}`).then((res) => {
      setContractorIdData(res.data);
      //  console.log(res.data);
    });
  };

  const handleProductId = async (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const pro_id = el.getAttribute("id");
    const res = await axios.get(`http://localhost:8080/product/${pro_id}`);
    setProductIdData(res.data);
    //setTimeout(getRawArray(), 5000)
    getRawArray(res.data);
    // console.log(productIdData.rm)

    getProductToManufacturing();
    getExpectedProducts();
    getEndProducts();
    getProductToManufacture();
  };

  const getEndProducts = () => {
    axios.get("http://localhost:8080/endProducts").then((res) => {
      setEndProduct(res.data);
    });
  };

  const getProducts = () => {
    axios.get("http://localhost:8080/products").then((res) => {
      setProduct(res.data);
    });
  };

  const getExpectedProducts = () => {
    axios.get("http://localhost:8080/expectedProduct").then((res) => {
      setExpectedProduct(res.data);
    });
  };

  const getRawArray = (product) => {
    product.rm?.map((item) =>{
        axios.get(`http://localhost:8080/rawMaterial/${item}`).then((res) => {
            setStoreRaw(res.data)
        })
    })

    // productToManufacture.map((item) => {
   
    //     rem = Number(item.qty_in_meter) - Number(productIdData.qty);
    //   });

  };
  // console.log(getRaw)
  return (
    <Box className="d-flex">
      <SideNav />
      <Box className="p-5 w-100">
        <Paper elevation={4}>
          <div
            className="px-3 py-3 pt-4"
            style={{ color: "#219653", fontSize: 22 }}
          >
            Final Report of all time, with filters like month, contractor,
            product
          </div>
        </Paper>
        <br />
        <br />
        <select
          type={"text"}
          style={{ width: "100%" }}
          className="global-input-2"
          placeholder="Used Qty in Meter"
          onChange={handleContractorId}
        >
          <option selected>Select Contractor from list</option>
          {contractors?.map((item) => {
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
          {product?.map((item) => {
            return <option id={item.id}>{item.name}</option>;
          })}
        </select>
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr</TableCell>
                <TableCell align="right">Contractor Name</TableCell>
                <TableCell align="right">Date Of Product Given</TableCell>
                <TableCell align="right">Date of Product Recieving</TableCell>
                <TableCell align="right">Product Name</TableCell>
                <TableCell align="right">Expected ProDuct Qty.</TableCell>
                <TableCell align="right">Recieved Product</TableCell>
                <TableCell align="right">
                  Expected remaining Raw Material
                </TableCell>
                <TableCell align="right">Recieved Raw Material</TableCell>
                <TableCell align="right">Cost Per Pcs.</TableCell>
                <TableCell align="right">List of Raw Material given</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(getRaw)}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {1}
                </TableCell>
                {/* {console.log(productIdData)} */}
                <TableCell align="right">{contractorIdData.name}</TableCell>
                <TableCell align="right">
                  {endProduct[0]?.giving_date}
                </TableCell>
                <TableCell align="right">
                  {endProduct[0]?.recieved_product_date}
                </TableCell>
                <TableCell align="right">{productIdData.name}</TableCell>
                <TableCell align="right">
                  {endProduct[0]?.expected_product}
                </TableCell>
                <TableCell align="right">
                  {expectedProduct[0]?.recieved_product}
                </TableCell>
                {endProduct && storeRaw &&
                <TableCell align="right">
                  
                  {`${endProduct[0]?.expected_raw_material} mtr. ${storeRaw?.name}`}
                </TableCell>
}
                <TableCell align="right">
                  {endProduct[0]?.expected_raw_material}
                </TableCell>
                <TableCell align="right">
                  {productToManufacturing[0]?.labour_cost_per_pcs}
                </TableCell>

                {/* {productIdData?.rm?.map((item) => {
            axios.get(`http://localhost:8080/rawMaterial/${item}`).then((res) => {
                setGetRaw(res.data)
            })
           })} */}
           {productToManufacture && storeRaw &&

                <TableCell align="right">{`${productToManufacture[0]?.qty_in_meter} mtr. ${storeRaw?.name}`}</TableCell>
              }
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
      </Box>
    </Box>
  );
};

export default Report;
