//import express
const express = require("express")
const app = express()
app.use(express.json())
const {Op} = require("sequelize")

//import model
const models = require("../models/index")
const transaksi = models.transaksi
const detail_transaksi = models.detail_transaksi
const user = models.user
const meja = models.meja
const menu = models.menu

//Endpoint untuk menampilkan semua data transaksi
app.get("/", async (req, res) =>{
    let result = await transaksi.findAll({
        order: [
            ["id_transaksi", "DESC"],
            ["tgl_transaksi", "DESC"],
          ],
        include: [
            "user","meja",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["menu"]
            }
        ]
    })
    res.json({
        transaksi: result,
        count : result.length
    })
})

//endpoint untuk menampilkan data transaksi berdasarkan id
app.get("/byTransaksi/:id_transaksi", async (req, res) =>{
    let param = { id_transaksi: req.params.id_transaksi}
    let result = await transaksi.findOne({
        where: param,
        include: [
            "user","meja",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["menu"]
            }
        ]
    })
    res.json(result)
})

//endpoint untuk menampilkan data transaksi berdasarkan id user
app.get("/byUser/:id_user", async (req, res) =>{
    let param = { id_user: req.params.id_user}
    let result = await transaksi.findAll({
        where: param,
        order: [
            ["id_transaksi", "DESC"],
            ["tgl_transaksi", "DESC"],
          ],
        include: [
            "user","meja",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["menu"]
            }
        ]
    })
    res.json(result)
})


//endpoint untuk menambahkan data transaksi baru
app.post("/", async (req, res) =>{
    let current = new Date().toISOString().split('T')[0]
    let code = 'CVR${Math.random}'
    let now = new Date()
    let tgl = Date.now()
    let invoices = "Cafe"
    now.setDate(now.getDate() + 3)
    let data = {
        id_user: req.body.id_user,
        tgl_transaksi: current,
        //id_meja: req.body.id_meja,
        nama_pelanggan: req.body.nama_pelanggan,
        kode_invoice: invoices + tgl,
        status: req.body.status,
        biaya_tambahan: req.body.biaya_tambahan,
        diskon: req.body.diskon,
        pajak: req.body.pajak,
        total: req.body.total,
        dibayar: req.body.dibayar,
    }
    const query_meja = {
        id_meja : req.body.id_meja
    }
    const resultMeja = await meja.findOne({where: query_meja})

    if(resultMeja.status==="diisi"){
        return res.json({message: "Meja tidak tersedia"})
    } else {
        data.id_meja = query_meja.id_meja
    }
    transaksi.create(data)
    .then(result => {
        let lastID = result.id_transaksi
        console.log(lastID);
        detail = req.body.detail_transaksi
        detail.forEach(element => {
            element.id_transaksi = lastID;
            /* element.subtotal = element.harga * element.qty; */
            
        });
        meja.findOne({where: query_meja})
            .then(result=>{
                let query={
                    status: "diisi"
                }
                let param={
                    id_meja:result.id_meja
                }
                meja.update(query,{where: param})
            })
            .catch(error=>{
                res.json({
                    message: error.message
                });
            });
        console.log(detail);
        detail_transaksi.bulkCreate(detail)
        .then(result => {
            res.json({
                message: "Data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        console.log(error.message);
    })
})

app.post('/tanggal', (req,res) => {
    let tgl_transaksi_awal = req.body.tgl_transaksi_awal
    let tgl_transaksi_akhir = req.body.tgl_transaksi_akhir
    transaksi.findAll({
        where: {
            tgl_transaksi: {
                [Op.between] : [tgl_transaksi_awal,tgl_transaksi_akhir]
            }
        },
        order: [
            ["tgl_transaksi", "DESC"]
        ],
        include: [
            "user","meja",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["menu"]
            }
        ]
    })
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// endpoint update data transaksi
app.put("/:id", async (req, res) => {
  let param = {
    id_transaksi: req.params.id
  }
  let current = new Date().toISOString().split("T")[0];
  let code = 'CVR${Math.random}'
  let now = new Date()
  let tgl = Date.now()
  let invoices = "Cafe"
  now.setDate(now.getDate() + 3)
  let data = {
    tgl_transaksi: current,
    id_user:  req.body.id_user,
    id_meja: req.body.id_meja,
    nama_pelanggan: req.body.nama_pelanggan,
    kode_invoice: invoices + tgl,
    status:  req.body.status,
    biaya_tambahan: req.body.biaya_tambahan,
    diskon: req.body.diskon,
    pajak: req.body.pajak,
    total:  req.body.total,
    dibayar: req.body.dibayar
  };
  if (data.dibayar === "dibayar") {
    data.tgl_bayar = current
  }
  transaksi
    .update(data, { where: param })
    .then(async (result) => {
      res.json({
        message: "Berhasil update"
      })
    })
    .catch((error) => {
      return res.json({
        message: error.message,
      });
    });
});


// endpoint untuk menghapus data transaksi
app.delete("/:id_transaksi", async (req, res) =>{
    let param = { id_transaksi: req.params.id_transaksi}
    try {
        await detail_transaksi.destroy({where: param})
        await transaksi.destroy({where: param})
        res.json({
            message : "data has been deleted"
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
})

module.exports = app