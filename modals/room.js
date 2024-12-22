const db = require('../config/dbConn');

module.exports.findAll = async() => {
    const sql = "SELECT * FROM rooms WHERE is_deleted <> 1;";
    const [rows] = await db.query(sql)

    return rows.map(row => {
        return {
            ...row,
            room_status: !!row.room_status,
            is_deleted: !!row.is_deleted
        }
    });

    // return formattedRows;
};


module.exports.findById = async(id) => {
    const sql = "SELECT * FROM rooms WHERE id = ?;";
    const [record] = await db.query(sql, [id]);

    return record.map(row => {
        return {
            ...row,
            room_status: !!row.room_status,
            is_deleted: !!row.is_deleted
        }
    });
};

module.exports.deleteById = async(id) => {
    const sql = "UPDATE rooms SET is_deleted = true WHERE id = ?";
    const [row] = await db.query(sql, [id])
    return row;
};


module.exports.create = async(obj) => {
    obj.is_deleted = (obj.is_deleted) ? obj.is_deleted : false
    obj.status = (obj.status) ? obj.status : false

    const sql = "INSERT INTO rooms(id, room_name,room_status, is_deleted) VALUES(NULL, ?,?,?);";
    const [row] = await db.query(sql, [obj.name, obj.status, obj.is_deleted]);
    return row
}


module.exports.update = async(obj,id) => {
    const sql = "UPDATE rooms SET room_name = ?, room_status = ?, is_deleted = ? WHERE id = ?"
    const [row] = await db.query(sql, [obj.name, obj.status, obj.is_deleted, id]);
    return row
}

module.exports.updateStatus = async(id) => {
    const sql = "UPDATE rooms SET room_status = false WHERE id = ?"
    const [row] = await db.query(sql, [id]);
    return row
}