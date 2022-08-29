import { Box } from '@mui/system'
import React, { useState } from 'react'
import Img1 from '../assets/bubble.png'
import { Fab } from '@mui/material';
import Img2 from '../assets/left-arrow.png'
import ProductIcon from '../assets/icons/ProductIcon'
import LogoutIcon from '../assets/icons/LogoutIcon'
import EndProductIcon from '../assets/icons/EndProductIcon'
import ContractorIcon from '../assets/icons/ContractorIcon'
import InProcessIcon from '../assets/icons/InProcessIcon';
import Detail from '../assets/detail.png'
import Note from '../assets/note.png'
import Chart from '../assets/chart.png'
import File from '../assets/file.png'
import Add from '../assets/add.png'
import Pressure from '../assets/pressure.png'
import box from '../assets/box.png'
import Report from '../assets/report.png'
import Trash from '../assets/Trash.png'
import { useNavigate } from 'react-router-dom'

const SideNav = () => {

    const navigate = useNavigate();

    const handleLogout =() => {
        localStorage.clear();
        navigate('/login')
    }

    const bg = "#74C3AD"

    return (
        <Box style={{ marginRight: 330 }}>
            <Box style={{ background: bg, width: 330, height: '100vh', position: 'fixed', left: 0, top: 0 }}>
                <Box className="logo-text">
                    BAJO'S
                </Box>
                <br />
                <br />
                <br />
                <br />
                <div className='ps-3 py-3' style={{ zIndex: 100 }}>
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <ProductIcon />
                                        </div>
                                        Manage Products
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div className='ms-5'
                                        onClick={() => navigate('/manage')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex align-items-center fs-6 mb-3'>
                                            <img src={Note} alt="" className='me-2' />
                                            Manage Products
                                        </div>
                                    </div>
                                    <div className='ms-5'
                                        onClick={() => navigate('/manage/list')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex align-items-center fs-6 mb-3'>
                                            <img src={Note} alt="" className='me-2' />
                                            Detail Product List
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <ContractorIcon />
                                        </div>
                                        Contractors
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div className='ms-5'
                                        onClick={() => navigate('/contractor/add')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex align-items-center fs-6 mb-3'>
                                            <img src={Add} alt="" className='me-2' />
                                            Add new Contractor
                                        </div>
                                    </div>
                                    <div className='ms-5'
                                        onClick={() => navigate('/contractor/List')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex align-items-center fs-6 mb-3'>
                                            <img src={Note} alt="" className='me-2' />
                                            Detail View
                                        </div>
                                    </div>
                                    <div className='ms-5'
                                        onClick={() => navigate('/contractor/profile')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex align-items-center fs-6 mb-3'>
                                            <img src={File} alt="" className='me-2' />
                                            Contractor Profile
                                        </div>
                                    </div>
                                    <div className='ms-5'
                                        onClick={() => navigate('/contractor/efficiency')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex align-items-center fs-6 mb-3'>
                                            <img src={Chart} alt="" className='me-2' />
                                            Contractor Efficiency
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <InProcessIcon />
                                        </div>
                                        In-Process
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div className='ms-5'
                                        onClick={() => navigate('/product/add')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex align-items-center fs-6 mb-3'>
                                            <img src={Add} alt="" className='me-2' />
                                            Add products to manufacturing
                                        </div>
                                    </div>
                                    <div className='ms-5'
                                        onClick={() => navigate('/product/list')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex align-items-center fs-6 mb-3'>
                                            <img src={Pressure} alt="" className='me-2' />
                                            Product in manufacturing
                                        </div>
                                    </div>
                                    <div className='ms-5'
                                        onClick={() => navigate('/product/end')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex align-items-center fs-6 mb-3'>
                                            <img src={box} alt="" className='me-2' />
                                            End product received
                                        </div>
                                    </div>
                                    <div className='ms-5'
                                        onClick={() => navigate('/product/report')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex align-items-center fs-6 mb-3'>
                                            <img src={Report} alt="" className='me-2' />
                                            Final report of all time with filters
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingFour">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <EndProductIcon />
                                        </div>
                                        Manage End Products
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div className='ms-5'
                                        onClick={() => navigate('/product/unavailable')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex align-items-center fs-6 mb-3'>
                                            <img src={Trash} alt="" className='me-2' />
                                            Remove unavailable products
                                        </div>
                                    </div>
                                    <div className='ms-5'
                                        onClick={() => navigate('/product/export')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex align-items-center fs-6 mb-3'>
                                            <img src={Note} alt="" className='me-2' />
                                            Export to excel
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Box>
                            <h2  >
                                <button class="btn border-none ms-2" type="button">
                                    <div className="d-flex align-items-center" onClick={handleLogout}>
                                        <div className="me-3">
                                            <LogoutIcon />
                                        </div>
                                        Log Out
                                    </div>
                                </button>
                            </h2>
                        </Box>
                    </div>
                </div>
                <div style={{ position: 'absolute', bottom: -50, left: -100 }}>
                    <img src={Img1} alt='' />
                </div>
            </Box>
        </Box>
    )
}

export default SideNav