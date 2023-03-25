import React from 'react'
// import Header from '../component/Header';
// import HeaderKasir from '../component/HeaderKasir';
// import HeaderOwner from '../component/HeaderOwner';
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap";

export default class Detail extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            transaksi: [],
            meja: [],
            menu: [],
            user: [],
            selectTransaction: [],
            isModalOpen: false,
            id_transaksi: "",
            id_user: "",
            nama_user: "",
            kode_invoice: "",
            id_meja: "",
            nomor_meja: "",
            id_menu: "",
            nama_menu: "",
            dibayar: "",
            status: "",
            nama_pelanggan: "",
            tgl_transaksi: "",
            detail_transaksi: [],
            time: "",
            total: 0,
        }
        if (localStorage.getItem("token")) {
            //pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
            this.state.id_user = localStorage.getItem("id_user");
            this.state.nama_pelanggan = localStorage.getItem("nama_pelanggan");
            this.state.id_meja = localStorage.getItem("meja");
            this.state.id_menu = localStorage.getItem("menu");
            this.state.role = localStorage.getItem("role")
        } else {
            window.location = "/login"
        }

        //get id dari
        this.state.id_transaksi = localStorage.getItem("id_transaksi")
        console.log(this.state.id_transaksi)
    }

    details = (item) => {
        let date = new Date(item.waktu)
        let tm = `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
        this.setState({
            selectTransaction: item.detail_transaksi,
            isModalOpen: true,
            id_transaksi: item.id_transaksi,
            kode_invoice: item.kode_invoice,
            nama_pelanggan: item.nama_pelanggan,
            id_meja: item.meja.id_meja,
            nomor_meja_meja: item.meja.nomor_meja,
            id_menu: item.menu.id_menu,
            nama_menu: item.menu.nama_menu,
            time: tm,
        })
    }

    convertTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    handleEdit = (item) =>{
        this.setState({
            id_transaksi: item.id_transaksi,
            dibayar: item.dibayar,
            status: item.status,
            kode_invoice: item.kode_invoice,
            nama_user: item.user.nama_user,
            nama_pelanggan: item.nama_pelanggan,
            tgl_transaksi: item.tgl_transaksi,
            action: "update",
            detail_transaksi: item.detail_transaksi,
            total: item.total,
            isModalOpen: true,
        })
    }


    handleSave = (e) => {
        e.preventDefault()
        let bayar = ""
        if(this.state.status === "diambil"){
            bayar = "dibayar"
        }else{
            bayar = "belum_bayar"
        }
        let form = {
          id_transaksi: this.state.id_transaksi,
          nama_pelanggan: this.state.nama_pelanggan,
          status: this.state.status,
          dibayar: bayar

        }
        let url = ""
        if (this.state.action === "insert") {
          url = "http://localhost:8080/transaksi/" + this.state.id_transaksi
          axios.post(url, form)
            .then(res => {
              this.getTransaction()
              this.handleClose()
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          url = "http://localhost:8080/transaksi/" + this.state.id_transaksi
          axios.put(url, form)
            .then(res => {
              this.getTransaction()
              this.handleClose()
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    

    getTransaction = () => {
        let url = "http://localhost:8080/transaksi/byTransaksi/" + this.state.id_transaksi

        axios.get(url, this.headerConfig())
        
            .then(res => {
                this.setState({
                    transaksi: res.data,
                    meja: res.data.meja,
                    menu: res.data.menu,
                    user : res.data.user,
                    detail_transaksi: res.data.detail_transaksi
                    // custCount: res.data.count
                })
                console.log(this.state.meja)
                // console.log(this.state.detail_transaksi)

            })
            .catch(err => {
                console.log(err.message)
            })
            
    }

    dropTran = id_transaksi => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = "http://localhost:8080/transaksi/" + id_transaksi
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getTransaction()
                })
                .catch(error => console.log(error))
        }
    }

    
    convertTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    detail = () => {
        localStorage.setItem("id_transaksi", this.state.id_transaksi)
        // window.open("/cetak", "_blank")
        window.location = "/Cetak"
    }
    
    
    componentDidMount() {
        this.getTransaction()
    }

    render() {
        return (
            <div>
                {/* {this.state.role == "admin" &&
                            <Header/>
                        }
                {this.state.role == "kasir" &&
                            <HeaderKasir />
                        }
                {this.state.role == "owner" &&
                            <HeaderOwner />
                        } */}
                <div className="row">      
          <div className="col-16 card shadow p-4 rounded-3 border-0">
          <h3 className="col">Laporan Transaksi</h3>{" "}
          <br></br>
            <table class="table table-bordered">
              <thead>
                  <tr>
                      <td>Id transaksi</td>
                      <td> {this.state.transaksi.id_transaksi} </td>
                  </tr>
                  <tr>
                      <td>Invoice Code</td>
                      <td>{this.state.transaksi.kode_invoice}</td>
                  </tr>
                  <tr>
                      <td>Customer Name</td>
                      <td>{this.state.transaksi.nama_pelanggan}</td>
                  </tr>
                  <tr>
                      <td>User Name</td>
                      <td>{this.state.user.nama_user}</td>
                  </tr>
                  <tr>
                      <td>Table Number</td>
                      <td>{this.state.meja.nomor_meja}</td>
                  </tr>
                  <tr>
                      <td>Transaction Date</td>
                      <td>{this.state.transaksi.tgl_transaksi}</td>
                  </tr>
                  <tr>
                      <td>Additional Cost</td>
                      <td>{this.state.transaksi.biaya_tambahan}</td>
                  </tr>
                  <tr>
                      <td>Discount</td>
                      <td>{this.state.transaksi.diskon}</td>
                  </tr>
                  <tr>
                      <td>Tax</td>
                      <td>{this.state.transaksi.pajak}</td>
                  </tr>
                  <tr>
                      <td>Payment Status</td>
                      <td>{this.state.transaksi.status}</td>
                  </tr>
                  <tr>
                      <td>Status Order</td>
                      <td>{this.state.transaksi.dibayar}</td>
                  </tr>
                  <tr>
                      <td>Total</td>
                      <td>{this.state.transaksi.total}</td>
                  </tr>
              </thead>
            </table>
          </div>
            <br></br>
            <div className="card col-12 mt-2">
                <div className="card-header bg-primary text-white">
                    <h4>Detail Transaksi</h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Menu</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.detail_transaksi.map( (item, index) => (
                            <tr key={index}>
                                <td>{item.menu.nama_menu}</td>
                                <td>Rp {item.menu.harga}</td>
                                <td>{item.qty}</td>
                                <td className="text-right">
                                Rp { item.menu.harga * item.qty }
                                </td>
                            </tr>
                            ) ) }
                            <tr>
                                <td colSpan="3">Total</td>
                                <td className="text-right">Rp {this.state.transaksi.total}</td> 
                            </tr>
                        </tbody>
                        <br></br>
                        <button className="btn btn-sm btn-success m-1" href="/Cetak"   onClick={() => this.detail()}>
                            Cetak Transaksi
                        </button>       
                    </table>
                </div>
            </div>                        
                
        </div>
    </div>  
        )
    }
}