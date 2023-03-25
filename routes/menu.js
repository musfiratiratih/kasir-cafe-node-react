//import express
const express = require("express")
const app = express()
app.use(express.json())

// import md5
const md5 = require("md5")

//import multer
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//import model
const models = require("../models/index")
const menu = models.menu
const detail_transaksi = models.detail_transaksi

//config storage image
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"./gambar/")
    },
    filename: (req,file,cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

app.get("/", (req, res) =>{
    menu.findAll()
        .then(result => {
            res.json({
                menu: result,
                count: result.length,
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })  
})

app.get("/search/favorite", async (req, res) => {
    try {
        const result = await detail_transaksi.findAll({
            attributes: [
                'id_menu',
                [models.sequelize.fn('sum', models.sequelize.col('qty')), 'total_penjualan']
            ],
            include: [{
                model: menu,
                as: 'menu',
                // where: {jenis: 'Makanan'}
                attributes: ['nama_menu']
            }],
            group: ['id_menu'],
            order: [
                [models.sequelize.fn('sum', models.sequelize.col('qty')), 'DESC']
            ],
            limit: 7,
        });
        res.status(200).json({ menu: result });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/search/less", async (req, res) => {
    try {
        const result = await detail_transaksi.findAll({
            attributes: [
                'id_menu',
                [models.sequelize.fn('sum', models.sequelize.col('qty')), 'total_penjualan']
            ],
            include: [{
                model: menu,
                as: 'menu',
                // where: {jenis: 'Makanan'}
                attributes: ['nama_menu']
            }],
            group: ['id_menu'],
            order: [
                [models.sequelize.fn('sum', models.sequelize.col('qty')) ]
            ],
            limit: 7,
        });
        res.status(200).json({ menu: result });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/:id_menu", (req, res) =>{
    menu.findOne({ where: {id_menu: req.params.id_menu}})
    .then(result => {
        res.json({
            menu: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", upload.single("gambar"), (req, res) =>{
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            nama_menu: req.body.nama_menu,
            jenis: req.body.jenis,
            deskripsi: req.body.deskripsi,
            gambar: req.file.filename,
            harga: req.body.harga
        }
        menu.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    }
})

app.put("/:id", upload.single("gambar"), (req, res) =>{
    let param = { id_menu: req.params.id}
    let data = {
        nama_menu: req.body.nama_menu,
        jenis: req.body.jenis,
        deskripsi: req.body.deskripsi,
        //gambar: req.file.filename,
        harga: req.body.harga
    }
    if (req.file) {
        // get data by id
        const row = menu.findOne({where: param})
        .then(result => {
            let oldFileName = result.gambar
           
            // delete old file
            let dir = path.join(__dirname,"../gambar/",oldFileName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error => {
            console.log(error.message);
        })

        // set new filename
        data.gambar = req.file.filename
    }

    //if(req.body.password){
        //data.password = md5(req.body.password)
    //}

    menu.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id", async (req, res) =>{
    try {
        let param = { id_menu: req.params.id}
        let result = await menu.findOne({where: param})
        let oldFileName = result.gambar
           
        // delete old file
        let dir = path.join(__dirname,"../gambar/",oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        menu.destroy({where: param})
        .then(result => {
           
            res.json({
                message: "data has been deleted",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = app