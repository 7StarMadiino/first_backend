const db = require('../config/dbConn');

module.exports.findAllBooking = async() => {
    const sql = "SELECT * FROM view_booking;";
    const [rows] = await db.query(sql);

    return rows.map(row => {
        return {
            ...row,
            booking_status: !!row.booking_status,
            is_deleted: !!row.is_deleted
        }
    });
};

module.exports.findBookingById = async(id) => {
    const sql = "SELECT * FROM view_booking WHERE id = ?;";
    const [rows] = await db.query(sql, [id]);

    return rows.map(row => {
        return {
            ...row,
            booking_status: !!row.booking_status,
            is_deleted: !!row.is_deleted
        }
    });
};


module.exports.findAll = async() => {
    const sql = "SELECT * FROM customers WHERE is_deleted <> 1;";
    const [rows] = await db.query(sql);
    return rows.map(row => {
        return {
            ...row,
            is_deleted: !!row.is_deleted
        }
    });
};

module.exports.findById = async(id) => {
    const sql = "SELECT * FROM customers WHERE id = ?;";
    const [record] = await db.query(sql, [id]);
    return record.map(row => {
        return {
            ...row,
            is_deleted: !!row.is_deleted
        }
    });
    return row;
};


module.exports.deleteById = async(id) => {
    const sql = "UPDATE customers SET is_deleted = true WHERE id = ?";
    const [row] = await db.query(sql, [id])
    return row;
};

module.exports.create = async(obj) => {
    const sql = "INSERT INTO customers(id, customer_name, customer_phone, customer_email, image, is_deleted) VALUES(NULL, ?,?,?,?,?);";
    const [row] = await db.query(sql, [obj.name, obj.phone, obj.email, obj.image, obj.is_deleted]);
    return row;
};

module.exports.update = async(obj,id) => {
    const sql = "UPDATE customers SET customer_name = ?, customer_phone = ?, customer_email = ?, image = ? WHERE id = ?";
    const [row] = await db.query(sql, [obj.name, obj.phone, obj.email, obj.image, id]);
    return row;
};


module.exports.makeBooking = async(obj) => {
    const sql = "INSERT INTO booking(id, customer_id, room_id, booking_date, time_in, time_out, booking_status, is_deleted) VALUES(NULL, ?,?,?,?,?, ?,?);";
    const [row] = await db.query(sql, [obj.customer_id, obj.room_id, obj.booking_date, obj.time_in, obj.time_out, obj.status, obj.is_deleted]);
    return row;
};

module.exports.updateBooking = async (obj,id) => {
    const sql = "UPDATE booking SET customer_id = ?, room_id = ?, booking_date = ?, time_in = ?, time_out =? , booking_status = ? WHERE id = ?";
    const [row] = await db.query(sql, [obj.customer_id, obj.room_id, obj.booking_date, obj.time_in, obj.time_out, obj.status, id]);
    return row;
}

module.exports.updateBookingStatus = async(id) => {
    const sql = "UPDATE booking SET booking_status = !booking_status WHERE id = ?"
    const [row] = await db.query(sql, [id]);
    return row;
}