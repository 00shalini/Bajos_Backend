import { Box } from "@mui/system";
import React, { useState,useEffect } from "react";
import Img1 from "../../assets/bubble.png";
import Paper from "@mui/material/Paper";
import { Checkbox } from "@mui/material";
import SideNav from "../../components/SideNav";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Contractor = () => {
  const bg = "#74C3AD";

  const [contractorData, setContractorData] = useState({
    name: "",
    phone: "",
    email: "",
    extra: "",
    personal_note: "",
    is_authorised: "",
  });
  const [rawOpen, setRawOpen] = useState(false);
  let name, value, checked;

  const handleContractor = (e) => {
    name = e.target.name;
    value = e.target.value;
    checked = e.target.checked;
    if (e.target.name == "is_authorised") {
      setContractorData({ ...contractorData, [name]: checked });
    } else {
      setContractorData({ ...contractorData, [name]: value });
    }
  };

  const postContractor = () => {
    const { name, phone, email, extra, personal_note, is_authorised } = contractorData;
    axios
      .post("http://localhost:8080/addContractor", {
        name: name,
        phone: phone,
        email: email,
        extra: extra,
        personal_note: personal_note,
        is_authorised: is_authorised,
      })
      .then((res) => {
        setRawOpen(true)
      });
  };
  useEffect(() => {
    const timeId = setTimeout(() => {
    
      setRawOpen(false)

    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  }, [rawOpen]);
  return (
    <Box className="d-flex">
      <SideNav />
      <Box className="p-5 w-100">
        <Box className="text-center">
          <div style={{ fontSize: 24, fontWeight: 500 }}>
            Add New Contractor
          </div>
          <br />
          <Box>
            <div>
              <input
                className="w-50 global-input-2"
                placeholder="Name"
                name="name"
                value={contractorData.name}
                onChange={handleContractor}
              />
            </div>
            <div>
              <input
                className="w-50 global-input-2"
                placeholder="Phone"
                name="phone"
                value={contractorData.phone}
                onChange={handleContractor}
              />
            </div>
            <div>
              <input
                className="w-50 global-input-2"
                placeholder="Email"
                name="email"
                value={contractorData.email}
                onChange={handleContractor}
              />
            </div>
            <div>
              <input
                className="w-50 global-input-2"
                placeholder="Extra field"
                name="extra"
                value={contractorData.extra}
                onChange={handleContractor}
              />
            </div>
            <div>
              <textarea
                className="w-50 global-input-2"
                placeholder="Personal note about contractor"
                rows={5}
                name="personal_note"
                value={contractorData.personal_note}
                onChange={handleContractor}
              />
            </div>
            <div>
              <Checkbox name="is_authorised" onChange={handleContractor} />
              If the contractor can login then tick the box
            </div>
            <Box>
              {contractorData.email &&
              contractorData.phone &&
              contractorData.extra &&
              contractorData.name &&
              contractorData.personal_note ? (
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
                  onClick={postContractor}
                >
                  Save
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
                  Save
                </button>
              )}
                   {rawOpen &&
                   <Stack sx={{ width: '20%', marginTop:"-50px" }} spacing={2}>
     
        <Alert severity="info">Contractor added!!</Alert>
       
      </Stack>
      }
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contractor;
