const db = require('../database');

module.exports = {
    filterNama : (req,res) => {
        let { nama } = req.params;
        let sql = `select i.product_id, p.nama, s.branch_name, i.inventory
        from inventory i
        join product p on p.product_id = i.product_id
        join store s on s.store_id = s.store_id
        where p.nama=${nama};`;
        db.query(sql, (err,results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results)
        })
    },
    filterBranch : (req,res) => {
        let sql = `select i.product_id, p.nama, s.branch_name, i.inventory
        from inventory i
        join product p on p.product_id = i.product_id
        join store s on s.store_id = s.store_id
        where s.branch_name=${req.params};`;
        db.query(sql, (err,results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results)
        })
    },
    filterStock : (req,res) => {
        let sql = `select i.product_id, p.nama, s.branch_name, i.inventory
        from inventory i
        join product p on p.product_id = i.product_id
        join store s on s.store_id = s.store_id
        where i.inventory=${req.params};`;
        db.query(sql, (err,results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results)
        })
    }
}