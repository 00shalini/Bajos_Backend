import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import Img2 from "../../assets/left-arrow.png";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import SideNav from "../../components/SideNav";
import { Line,Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart, registerables } from "chart.js";

const ContractorEfficiency = () => {
  const bg = "#74C3AD";
  Chart.register(...registerables);
  const [contractors, setContractors] = useState([]);
  const [expectedProduct, setExpectedProduct] = useState([]);
  const productRatio = [];
  const cname = [];
  const per = [0, 25, 50, 75, 100];

  const labels = contractors?.map((item) => item.name);
  const dataval = productRatio?.map((item) => item.ratio);
  const chartData = {
    Labels: labels,
    datasets: [
      {
        data: dataval,
      },
    ],
  };
  useEffect(() => {
    getContractorData();
    getExpectedProducts();
  }, []);

  const getContractorData = () => {
    axios.get("http://localhost:8080/contractors").then((res) => {
      setContractors(res.data);
    });
  };

  const getExpectedProducts = () => {
    axios.get("http://localhost:8080/expectedProduct").then((res) => {
      setExpectedProduct(res.data);
    });
  };
  //console.log(expectedProduct)
  for (var i = 0; i < expectedProduct.length; i++) {
    var ratio = (Number(expectedProduct[i].recieved_product) / 100) * 100;
    productRatio.push(ratio);
  }

  for (var i = 0; i < contractors.length; i++) {
    cname.push(contractors[i].name);
  }

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
              Contractor Efficiency
            </div>
          </Paper>
          <br />
          <br />
          <br />

          <div style={{ position: "fixed", right: 30, bottom: 30 }}>
            <Fab style={{ background: "#74C3AD" }} aria-label="edit">
              <img src={Img2} style={{ width: 38 }} />
            </Fab>
          </div>
        </Box>
      </Box>
      <div style={{ marginLeft: "430px", marginTop: "30px", maxWidth:"800px",minHeight:"400px" }}>
        {/* {console.log(productRatio)} */}
        <Line
          data={{
            labels: cname,
            datasets: [
              {
                label: "percentage of work done",
                data: productRatio,
                backgroundColor:"rgb(33, 150, 83)",
                width:"20px",
                borderColor:"#74C3AD"
              },
            ],
          }}
          options={{ maintainAspectRatio: false }}
        
        />
      </div>
    </>
  );
};

export default ContractorEfficiency;
