import { getCoffes, creatingCoffee, coffeeUpdating, eliminatingCoffee } from "../models/coffeModels.js";
import { findError, handleDeleteResponse } from "../utils/utils.js";

//get
export const getAllCoffes = async (req,res) =>{
    try {
        const coffe = await getCoffes()
        res.status(200).json({coffe: coffe})
    } catch (error) {
        console.log(error);
        const foundError = findError(error.code)
        return res.status(foundError[0].status).json({error: foundError[0].message})
    }
}

//post
export const createCoffe = async (req,res) => {
    try {
        const {coffe} = req.body
        const coffee_created = await creatingCoffee(coffe)
        res.status(201).json({coffee_created: coffee_created})
    } catch (error) {
        console.log(error);
        const foundError = findError(error.code)
        return res.status(foundError[0].status).json({error: foundError[0].message})
    }
}

//put
export const updateCoffe = async (req,res) => {
    try {
        const {id} = req.params
        const {coffe} = req.body
        const coffe_updated = await coffeeUpdating(id,coffe)
        if (!coffe_updated) {
            return res.status(400).json({ error: "Coffe not found" });
          }
        res.status(200).json({coffe_updated: coffe_updated})
    } catch (error) {
        console.log(error);
        const foundError = findError(error.code)
        return res.status(foundError[0].status).json({error: foundError[0].message})
    }
}

//delete
export const removeCoffe = async (req,res) => {
    try {
        const {id} = req.params
        const coffee_removed = await eliminatingCoffee(id)
        const response = handleDeleteResponse(coffee_removed);
         return res.status(response.status).json({ message: response.message });
    } catch (error) {
        console.log(error);
        const foundError = findError(error.code)
        return res.status(foundError[0].status).json({error: foundError[0].message})
    }
}