import { Box } from "@mui/system";
import React, { useState, useEffect} from "react";
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
import {Button} from '@mui/material';
import { useNavigate } from "react-router-dom";

const ContractorList = () => {
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
            Contractors list
          </div>
        </Paper>
        <br />
        <br />
        <br />
        <BasicTable />
        <div style={{ position: "fixed", right: 30, bottom: 30 }}>
          <Fab style={{ background: "#74C3AD" }} aria-label="edit">
            <img src={Img2} style={{ width: 38 }} />
          </Fab>
        </div>
      </Box>
    </Box>
  );
};

export default ContractorList;

function BasicTable() {

 

    const [contractors, setContractors] = useState([]);
   

    const navigate = useNavigate();
    useEffect(() => {
      getContractorData();
    }, []);
  
    const getContractorData = () => {
      axios.get("http://localhost:8080/contractors").then((res) => {
        setContractors(res.data);
      });
    };
    
    const handleContractorEdit = (id) => {
      //  console.log(id)
       for ( var i = 0 ; i< contractors.length ; i++){
        if (id === contractors[i].id){
         // console.log(contractors[i])
         const data = JSON.stringify(contractors[i]);
         localStorage.setItem("contractor", data);
         navigate('/contractor/profile');
        }
       }
       
       //const Id = JSON.stringify(id)
      
     // localStorage.setItem("id",Id);
      
      //  axios.get(`http://localhost:8080/contractor/${id}`).then((res) => {
      //    console.log(res.data)
        
      //  })
      
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(contractors)} */}
          {contractors.map((row,index) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               {index+1}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right"><Button onClick={() => handleContractorEdit(row.id)}>Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
