import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Img1 from "../../assets/bubble.png";
import Paper from "@mui/material/Paper";
import { Checkbox } from "@mui/material";
import SideNav from "../../components/SideNav";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const ContractorProfile = () => {
  const bg = "#74C3AD";
  const [editContractorData, setEditContractorData] = useState([]);
  const [productOpen, setProductOpen] = useState(false);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("contractor"));
   
    if (items) {
      console.log(items);
      setEditContractorData(items);
    }
  }, []);
  console.log(editContractorData);
 
  const [contractorProfile, setContractorProfile] = useState({
    name: editContractorData.name,
    phone: editContractorData.phone,
    email: editContractorData.email,
    extra: editContractorData.extra,
    note: editContractorData.personal_note,
    ischecked: editContractorData.ischecked,
  });

  useEffect(() => {
    setContractorProfile({
      name: editContractorData.name,
      phone: editContractorData.phone,
      email: editContractorData.email,
      extra: editContractorData.extra,
      note: editContractorData.personal_note,
      ischecked: editContractorData.ischecked,
    });
  }, [editContractorData]);

  let name, value;

  const handleContractorProfile = (e) => {
    name = e.target.name;
    value = e.target.value;
    setContractorProfile({ ...contractorProfile, [name]: value });
  };

  const editContractor = () => {
 
    const { name, phone, email, extra, note, ischecked } = contractorProfile;
    axios
      .put(`http://localhost:8080/updateContractor/${editContractorData.id}`, {
        name: name,
        phone: phone,
        email: email,
        extra: extra,
        note: note,
        ischecked: ischecked,
      })
      .then((res) => {
        setProductOpen(true)
      });
      
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
     
      setProductOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [productOpen]);
  return (
    <Box className="d-flex">
      <SideNav />
      <Box className="p-5 w-100">
        <Box className="text-center">
          <div style={{ fontSize: 24, fontWeight: 500 }}>
            Contractor Profile
          </div>
          <br />
          <Box>
            <div>
              {/* {console.log(contractorProfile)} */}
              <input
                className="w-50 global-input-2"
                placeholder="Name"
                // onChange={(e) => {
                //     e.preventDefault();
                //     setName(e.target.value)
                // }}
                name="name"
                value={contractorProfile.name}
                onChange={handleContractorProfile}
              />
            </div>
            <div>
              <input
                className="w-50 global-input-2"
                placeholder="Phone"
                // onChange={(e) => {
                //     e.preventDefault();
                //     setPhone(e.target.value)
                // }}
                name="phone"
                value={contractorProfile.phone}
                onChange={handleContractorProfile}
              />
            </div>
            <div>
              <input
                className="w-50 global-input-2"
                placeholder="Email"
                // onChange={(e) => {
                //     e.preventDefault();
                //     setEmail(e.target.value)
                // }}
                name="email"
                value={contractorProfile.email}
                onChange={handleContractorProfile}
              />
            </div>
            <div>
              <input
                className="w-50 global-input-2"
                placeholder="Extra field"
                // onChange={(e) => {
                //     e.preventDefault();
                //     setExtra(e.target.value)
                // }}
                name="extra"
                value={contractorProfile.extra}
                onChange={handleContractorProfile}
              />
            </div>
            <div>
              <textarea
                className="w-50 global-input-2"
                placeholder="Personal note about contractor"
                rows={5}
                // onChange={(e) => {
                //     e.preventDefault();
                //     setNote(e.target.value)
                // }}
                name="note"
                value={contractorProfile.note}
                onChange={handleContractorProfile}
              />
            </div>
            <div>
              <Checkbox checked={handleContractorProfile} />
              If the contractor can login then tick the box.
            </div>
            <Box>
              <button
                className="btn my-4"
                style={{
                  width: 200,
                  height: 55,
                  color: "#219653",
                  border: `1px solid ${bg}`,
                  fontWeight: 600,
                  fontSize: 21,
                  marginRight: 30,
                }}
                onClick={editContractor}
              >
                Edit
              </button>
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
           
              >
                Save
              </button>
              {productOpen && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="info">Contractor updated!!</Alert>
                    </Stack>
                  )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContractorProfile;
