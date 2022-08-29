import { Box } from '@mui/system'
import React, { useState,useEffect } from 'react'
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
import axios from 'axios';



const InFactory = () => {

    const bg = "#74C3AD"

   
    return (
        <Box className="d-flex">
           <SideNav />
            <Box className="p-5 w-100">
                <Paper elevation={4}>
                    <div className='px-3 py-3 pt-4' style={{ color: "#219653", fontSize: 22 }}>Products in Manufacturing</div>
                </Paper>
                <br />
                <br />
                <br />
                <BasicTable />
                <div
                    style={{ position: 'fixed', right: 30, bottom: 30 }}
                >
                    <Fab style={{ background: "#74C3AD" }} aria-label="edit">
                        <img src={Img2} style={{ width: 38 }} />
                    </Fab>
                </div>
            </Box>
        </Box>

    )
}

export default InFactory
function BasicTable() {

    const [productInFactory, setProductInFactory] = useState([]);

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
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {console.log(productInFactory)} */}
                    {productInFactory.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
