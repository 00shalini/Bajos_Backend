const firebase = require('firebase');
const EndProduct = require('../models/endProductModel');
const firestore = firebase.firestore();

const addEndProduct = async (req, res) => {
    try {
        const data = req.body;
        await firestore.collection('addEndProduct').doc().set(data);
        res.status(200).send("record saved ");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEndProducts = async (req,res) => {
    try {
    const endp = await firestore.collection('addEndProduct');
    
    const data = await endp.get();
    // console.log(endp.data)
    const endPArray = []
    if (data.empty) {
        res.send(404).send('no records');
    } else {
        data.forEach(doc => {
            const endp = new EndProduct (
            
                doc.data().expected_product,
                doc.data().expected_raw_material,
                doc.data().giving_date,
                doc.data().recieved_product_date,
                doc.data().raw_id
            );
            endPArray.push(endp);
        });
        res.send(endPArray);

    }
    } catch(error) {
        res.status(400).send(error.message)
    }
}

// const getContractor = async (req,res) => {
//     try {
//      const id = req.params.id;
//      const contractor = await firestore.collection('addContractor').doc(id);
//      const data = await contractor.get();
//      if (!data.exists) {
//         res.status(404).send('contractor with given id not found');
//      } else {
//         res.send(data.data());
//      }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const updateContractor = async (req,res) => {
//    try {
//      const id = req.params.id;
//      const data = req.body;
//      const contractor = await firestore.collection('addContractor').doc(id);
//      await contractor.update(data);
//      res.send('updated successsfully');
//    } catch(error) {
//     res.status(400).send(error.message);
//    }
// }

module.exports = {
    addEndProduct,
    getEndProducts,
   
}