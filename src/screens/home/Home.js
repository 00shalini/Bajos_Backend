import { Box } from '@mui/system'
import React, { useState ,useEffect} from 'react'
import Img1 from '../../assets/bubble.png'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Fab } from '@mui/material';
import Img2 from '../../assets/left-arrow.png'
import SideNav from '../../components/SideNav';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Line,Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";


const Home = () => {

    const bg = "#74C3AD"
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
  const getExpectedProducts = () => {
    axios.get("http://localhost:8080/expectedProduct").then((res) => {
      setExpectedProduct(res.data);
    });
  };
  
    const getContractorData = () => {
      axios.get("http://localhost:8080/contractors").then((res) => {
        setContractors(res.data);
      });
    };

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
                    <Box>
                        <div className='text-center' style={{ fontSize: 36, color: "#045538" }}>Welcome to BAJO’S</div>
                        <br />
                        <div className='text-center' style={{ fontSize: 20, color: "#8E8E8E" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris morbi<br /> dictum aliquam vel tristique non purus. Magna eu ultricies turpis sit<br />  imperdiet. Enim ultrices in at risus, dictum sagittis mauris est.
                        </div>
                    </Box>
                    <br />
                    <Box className="p-5 w-100">
                        <Paper elevation={4}>
                            <div className='px-3 py-3 pt-4' style={{ color: "#219653", fontSize: 22 }}>Products in Manufacturing</div>
                        </Paper>
                        <br />
                        <br />
                        <br />
                        <BasicTable />
                    </Box>
                    <Box className="p-5 w-100">
                        <Paper elevation={4}>
                            <div className='px-3 py-3 pt-4' style={{ color: "#219653", fontSize: 22 }}>Contractor's Efficiency</div>
                        </Paper>
                        <div style={{ marginLeft: "30px", marginTop: "30px", maxWidth:"800px",minHeight:"400px" }}>
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
                    </Box>
                </Box>
            </Box>
        </>
    )
}


export default Home


function BasicTable() {
    const [productInFactory, setProductInFactory] = useState([]);

    let newDate = new Date();
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let d = newDate.getDate();
    let todayDate = d + "." + month + "." + year;
    useEffect(() => {
      getProductInManufacturing();
    }, []);
    const getProductInManufacturing = () => {
      axios.get("http://localhost:8080/productToManufacturing").then((res) => {
        // console.log(res.data)
        setProductInFactory(res.data);
      });
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Sr</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Contractor Name</TableCell>
                        <TableCell align="right">Product Given</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {console.log(productInFactory)} */}
                    {productInFactory.map((row,index) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="right">{todayDate}</TableCell>
                            <TableCell align="right">{row.contractor}</TableCell>
                            <TableCell align="right">{row.product}</TableCell>
                           
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
