const firebase = require('firebase');
const Contractor = require('../models/contractorModel');
const firestore = firebase.firestore();

const addContractor = async (req, res) => {
    try {
        const data = req.body;
        await firestore.collection('addContractor').doc().set(data);
        res.status(200).send("record saved ");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getContractors = async (req,res) => {
    try {
    const contractor = await firestore.collection('addContractor');
    
    const data = await contractor.get();
    // console.log(contractor.data)
    const contractorArray = []
    if (data.empty) {
        res.send(404).send('no records');
    } else {
        data.forEach(doc => {
            const contractor = new Contractor (
            
                doc.data().name,
                doc.data().password,
                doc.data().email,
                doc.data().phone,
                doc.data().personal_note,
                doc.data().is_authorised,
                doc.id,
            );
            contractorArray.push(contractor);
        });
        res.send(contractorArray);

    }
    } catch(error) {
        res.status(400).send(error.message)
    }
}

const getContractor = async (req,res) => {
    try {
     const id = req.params.id;
     const contractor = await firestore.collection('addContractor').doc(id);
     const data = await contractor.get();
     if (!data.exists) {
        res.status(404).send('contractor with given id not found');
     } else {
        res.send(data.data());
     }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateContractor = async (req,res) => {
   try {
     const id = req.params.id;
     const data = req.body;
     const contractor = await firestore.collection('addContractor').doc(id);
     await contractor.update(data);
     res.send('updated successsfully');
   } catch(error) {
    res.status(400).send(error.message);
   }
}

module.exports = {
    addContractor,
    getContractors,
    getContractor,
    updateContractor, 
    //deleteProduct
}