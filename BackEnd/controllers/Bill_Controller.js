import { Bill } from "../models/Bill.js";

const billController = {
    getAllBills : async (req, res) => {
        try{
            const bills = await Bill.findAll();
            if(!bills || bills.length === 0){
                return res.status(404).json({ error: "No bills found" });
            }
            res.status(200).json(bills);
        } catch(error) {
            res.status(500).json({ error: "Failed to fetch bills" });
        }
    },
    getBillById : async (req, res) => {
        try{
            const billId = req.params.id;
            const bill = await Bill.findByPk(billId);
            if(!bill){
                return res.status(404).json({ error: "Bill not found" });
            }
            res.status(200).json(bill);
        } catch(error) {
            res.status(500).json({ error: "Failed to fetch bill" });
        }
    },
    createBill : async (req, res) => {
        try{
            const billData = req.body;
            const newBill = await Bill.create(billData);
            res.status(201).json(newBill);
        } catch(error) {
            res.status(500).json({ error: "Failed to create bill" });
        }
    },
    updateBill : async (req, res) => {
        try{
            const billId = req.params.id;
            const updatedData = req.body;
            const bill = await Bill.findByPk(billId);
            if(!bill){
                return res.status(404).json({ error: "Bill not found" });
            }
            await bill.update(updatedData);
            res.status(200).json(updatedData);
        } catch(error) {
            res.status(500).json({ error: "Failed to update bill" });
        }
    },
    deleteBill : async (req, res) => {
        try{
            const billId = req.params.id;
            const bill = await Bill.findByPk(billId);
            if(!bill){
                return res.status(404).json({ error: "Bill not found" });
            }
            await bill.destroy();
            res.status(200).json({ message: `Bill with ID: ${billId} deleted successfully` });
        } catch(error) {
            res.status(500).json({ error: "Failed to delete bill" });
        }

    },
};

module.exports = billController;