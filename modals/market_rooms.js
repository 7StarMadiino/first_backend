const db = require('../config/dbConn');

module.exports.findAllMarketRooms = async() => {
    const sql = "SELECT * FROM market_rooms";
    const [record] = await db.query(sql)

    return record.map(row => {
        return {
            ...row,
            room_status: !!row.room_status,
            is_deleted: !!row.is_deleted
        }
    });
};


module.exports.findById = async(id) => {
    const sql = "SELECT * FROM market_rooms WHERE id = ?;";
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
    const sql = "UPDATE market_rooms SET is_deleted = true WHERE id = ?";
    const [row] = await db.query(sql, [id])
    return row;
};


module.exports.create = async(obj) => {

    if( obj.is_deleted ){
        obj.is_deleted = obj.is_deleted
    }else{
        obj.is_deleted = false
    }

    if( obj.status ){
        obj.status = obj.status
    }else{
        obj.status = false
    }
    const sql = "INSERT INTO market_rooms(id, room_name,room_status, is_deleted) VALUES(NULL, ?,?,?);";
    const [row] = await db.query(sql, [obj.name, obj.status, obj.is_deleted]);
    return row
};


module.exports.update = async(obj,id) => {
    const sql = "UPDATE market_rooms SET room_name = ?, room_status = ?, is_deleted = ? WHERE id = ?"
    const [row] = await db.query(sql, [obj.name, obj.status, obj.is_deleted, id]);
    return row
};

module.exports.updateStatus = async(id) => {
    const sql = "UPDATE market_rooms SET room_status = !room_status WHERE id = ?"
    const [row] = await db.query(sql, [id]);
    return row
};