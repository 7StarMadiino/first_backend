const db = require('../config/dbConn');



module.exports.findAll = async() => {
    const sql = "SELECT * FROM hall_booking;";
    const [rows] = await db.query(sql);

    return rows.map(row => {
        return {
            ...row,
            is_active: !!row.is_active,
            is_deleted: !!row.is_deleted
        }
    });
};



module.exports.create = async(obj) => {
    const sql = "INSERT INTO hall_booking(id, customer_name, customer_phone, event_date, created_at, amount, paid, is_active, is_deleted) VALUES(NULL, ?,?,?,?,?,?,?,?);";
    const [row] = await db.query(sql, [obj.name, obj.phone, obj.event_date, obj.created_at, obj.amount, obj.paid, obj.status, obj.is_deleted]);
    return row;
};

module.exports.update = async(obj,id) => {
    const sql = "UPDATE hall_booking SET customer_name = ?, customer_phone = ?, event_date = ?, amount = ?, paid = ?, is_active = ? WHERE id = ?";
    const [row] = await db.query(sql, [obj.name, obj.phone, obj.event_date, obj.amount, obj.paid, obj.status, id]);
    return row;
};


module.exports.updateStatusOut = async(id) => {
    const sql = "UPDATE hall_booking SET is_active = !is_active WHERE id = ?";
    const [row] = await db.query(sql, [id]);
    return row;
};