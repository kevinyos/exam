const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')
const mysql = require('mysql');
const util = require('util');
const port = 2000;

app.use(bodyParser());
app.use(cors());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'Kevin',
    password : 'safron55',
    database : 'clothes',
    port : 3306
});

const dba = util.promisify(db.query).bind(db);

app.get('/', (req,res) => {
    res.status(200).send(`<h1>Welcome</h1>`)
})

app.get('/list', async (req,res) => {
    let sql = `select i.product_id, p.nama, s.branch_name, i.inventory, p.harga, p.imagePath
    from inventory i
    join product p on p.product_id = i.product_id
    join store s on s.store_id = s.store_id;`;
    try{
        let response = await dba(sql);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message)
    }
});

app.post('/add_product', async (req,res) => {
    
    try{
        const path = '/images';
        const upload = uploader (path, 'TDO').fields([{ name : 'image' }])
        upload(req,res, (err) => {
            const { image } = req.files;
            const { product } = req.body;
            console.log(image)
            const imagePath = image ? `${path}/${image[0].filename}` : null
            let sql = `insert into product (nama,harga,imagePath) values('${product}', ${imagePath})`;
            db.query(sql, (err,results) => {
                if(err){
                    fs.unlinkSync(`../public${imagePath}`)
                    res.status(500).send(err.message)
                }
                res.status(201).send({
                    status : 'created',
                    message : 'Data Created!' 
                })
            })
        })
    }catch(err){
        res.status(500).send(err.message)
    }
});
//             await dba(sql, req.body);
//         let get = `select * from product`;
//         let response = await dba(get);
//         res.status(200).send(response);
//     }catch(err){
//         res.status(500).send(err.message);
//     };
        
// });

app.patch('/edit/:id', async (req,res) => {
    let sql = `update product set ? where id = ${req.params.id}`;
    try{
        await dba(sql, req.body);
        let get = `select * from product`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});

app.delete('/delete/:id', async (req,res) => {
    let sql = `delete from product where id = ${req.params.id}`;
    try{
        await dba(sql, req.body);
        let get = `select * from product`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});

// store

app.get('/get-store', async (req,res) => {
    let sql = `select * from store`;
    try{
        let response = await dba(sql);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message)
    }
});

app.post('/add-stock', async (req,res) => {
    let sql = `insert into store set ?`;
    try{
        await dba(sql, req.body);
        let get = `select * from store`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});

app.patch('/edit-stock/:id', async (req,res) => {
    let sql = `update store set ? where id = ${req.params.id}`;
    try{
        await dba(sql, req.body);
        let get = `select * from store`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});

app.delete('/delete-stock/:id', async (req,res) => {
    let sql = `delete from store where id = ${req.params.id}`;
    try{
        await dba(sql, req.body);
        let get = `select * from store`;
        let response = await dba(get);
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    };
});

//3

app.get('/stock/getstock/', (req,res) => {
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
})

app.post('/stock/editstock/:id', (req,res) => {
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
})

app.delete('/stock/deletestock/:id', (req,res) => {
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
})

app.post('/stock/addstock/', (req,res)=>{
    let sql = `insert into inventory (inventory) values ('${req.params}')`;
    db.query(sql, (err, insert) => {
        if(err){
            res.status(500).send(err.message)
        }
        res.status(201).send({
            status : 'created',
            message : 'Data Created!' 
        })
    })
})


app.listen(port, () => console.log(`API ACTIVE AT PORT ${port}`));