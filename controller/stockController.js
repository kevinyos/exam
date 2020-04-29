const db = require('../database');

module.exports = {
    getStock : (req,res) => {
        let sql = `select i.product_id, p.nama, s.branch_name, i.inventory
        from inventory i
        join product p on p.product_id = i.product_id
        join store s on s.store_id = s.store_id;`;
        db.query(sql, (err,results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results)
        })
    },
    addStock : (req,res) => {
        let { stock } = req.body;
        let { id } = req.params;

        let sql = `insert into inventory (inventory) values ('${stock}', ${id})`;
        db.query(sql, (err, insert) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(201).send({
                status : 'created',
                message : 'Data Created!' 
            })
        })
    },
    editStock : (req,res) => {
        let { edit } = req.body;
        let { id } = req.params;

        let sql = `update inventory set inventory = '${edit}' where id = ${id}`;
        db.query(sql, (err, update) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(201).send({
                status : 'edited',
                message : 'Data Edited!' 
            })
        })
    },
    deleteStock : (req,res) => {
        let { id } = req.params;

        let sql = `delete from  inventory where id = ${id}`;
        db.query(sql, (err, del) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(201).send({
                status : 'deleted',
                message : 'Data Deleted!' 
            })
        })
    }
}