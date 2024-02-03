import  pool  from "../../config/db/connectionDb.js";
export const deletingCoffee = async (coffeeId) => {
    const SQLquery = {
      text: "DELETE FROM coffe WHERE id = $1",
      values: [coffeeId],
    };
    
    await pool.query(SQLquery);
  };