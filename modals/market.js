const db = require('../config/dbConn');

module.exports.findAllMarket = async() => {
    const sql = "SELECT * FROM view_market;";
    const [rows] = await db.query(sql);

    return rows.map(row => {
        return {
            ...row,
            is_active: !!row.is_active,
            is_deleted: !!row.is_deleted
        }
    });
};


module.exports.findMarketById = async (id) => {
    const sql = "SELECT * FROM market_info WHERE id = ?;";
    const [record] = await db.query(sql, [id]);

    return record.map(row => {
        return {
            ...row,
            is_active: !!row.is_active,
            is_deleted: !!row.is_deleted
        }
    });
};

module.exports.create = async(obj) => {

    if( obj.status ){
        obj.status = obj.status
    }else{
        obj.status = true
    }

    if( obj.is_deleted ){
        obj.is_deleted = obj.is_deleted
    }else{
        obj.is_deleted = false
    }

    const sql = "INSERT INTO market_info(id, customer_id, room_id, business_type, date_in, date_out, is_active, is_deleted) VALUES(NULL, ?,?,?,?,?, ?,?);";
    const [row] = await db.query(sql, [obj.customer_id, obj.room_id, obj.business_type, obj.date_in, obj.date_out, obj.status, obj.is_deleted]);
    return row;
};


module.exports.updateStatusOut = async(date_out, id) => {

    const sql = "UPDATE market_info SET date_out = ?, is_active = !is_active WHERE id = ?";
    const [rows] = await db.query(sql, [date_out, id]);

    return rows;
}