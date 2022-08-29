import { Box } from '@mui/system'
import React, { useState } from 'react'
import Img1 from '../../assets/bubble.png'
import Paper from '@mui/material/Paper';
import SideNav from '../../components/SideNav';


const ExportExcel = () => {

    const bg = "#74C3AD"
    const [carpenter, setCarpenter] = useState('');
    const [product, setProduct] = useState('');

    return (
        <Box className="d-flex">
           <SideNav />
            <Box className="p-5 w-100">
                <Paper elevation={4}>
                    <div className='px-3 py-3 pt-4' style={{ color: "#219653", fontSize: 22 }}>
                        Export to excel
                    </div>
                </Paper>
                <br />
                <br />
                <Box className="d-flex justify-content-between align-items-center">
                    <div className="w-50 me-5">
                        <select type={'text'}
                            style={{
                                width: '100%',
                                padding: "14px 0",
                                border: `1px solid ${bg}`,
                                borderRadius: 8
                            }}
                            onChange={(e) => {
                                e.preventDefault();
                                setCarpenter(e.target.value)
                            }}
                        >
                            <option selected>Select product</option>
                            <option>Gulambi</option>
                            <option>Hoot</option>
                            <option>Jute</option>
                        </select>
                    </div>
                    <div className="w-50 " style={{ border: `1px solid ${bg}`, padding: 12, borderRadius: 6, display: 'flex', alignItems: 'center' }}>
                        <div style={{ color: "#219653", borderRight: '1px solid #000', paddingRight: 14, fontSize: 19 }}>
                            Available Qty
                        </div>
                        <div style={{ paddingLeft: 14 }}>
                            <input className="input-cost"
                                placeholder='00.00'
                                style={{ width: 100 }}
                            />
                        </div>

                    </div>
                </Box>
                <br />
                <Box className="d-flex justify-content-between align-items-center">
                    <Box className="w-50 me-5">
                    </Box>
                    <Box className="w-50">
                        <div className='d-flex justify-content-center'>
                            <button className='btn my-4 rounded-pill'
                                style={{
                                    width: 300,
                                    height: 55,
                                    color: "#219653",
                                    border: `1px solid ${bg}`,
                                    fontWeight: 600,
                                    fontSize: 21
                                }}
                            >Submit</button>
                        </div>
                    </Box>
                </Box>
                <br />
                <br />

                <br />
                <br />
            </Box>
        </Box >

    )
}

export default ExportExcel

