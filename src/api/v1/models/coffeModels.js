import  pool  from "../../../../config/db/connectionDb.js";

//gett
export const getCoffes = async () => {
    const SQLquery = {text: "SELECT * FROM coffe;"}
    const response = await pool.query(SQLquery)
    return response.rows
}

//post
export const creatingCoffee = async ({nombre,tipo}) => {
    const SQLquery = {text: "INSERT INTO coffe (nombre,tipo) VALUES($1,$2) RETURNING*",
                      values:[nombre,tipo]}
    const response = await pool.query(SQLquery)
    return response.rows[0]
}

//put
export const coffeeUpdating = async (id,{nombre,tipo}) => { 
    const SQLquery = {text: "UPDATE coffe SET nombre = $2, tipo = $3 WHERE id = $1 RETURNING*",
                      values:[id,nombre,tipo]}
    const response = await pool.query(SQLquery)
    return response.rows[0]

}

//delete
export const eliminatingCoffee = async (id) => {
    const SQLquery = {text: "DELETE FROM coffe WHERE id = $1",
                      values: [id]}
    const response = await pool.query(SQLquery)
    return response.rowCount;
}


