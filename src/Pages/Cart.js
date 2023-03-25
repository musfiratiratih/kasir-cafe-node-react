import React, { Component } from "react";
import axios from "axios";
import NavbarAdmin from '../Component/NavbarAdmin';
import NavbarKasir from '../Component/NavbarKasir';
import NavbarManajer from '../Component/NavbarManajer';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
        token: "",
        menuName: "",
        cart: [], // untuk menyimpan list cart
        total: 0, // untuk menyimpan data total belanja
        id_menu: "",
        id_user: "",
        id_meja: "",
        nama_pelanggan: "",
        }
        if(localStorage.getItem("token")){
        this.state.token = localStorage.getItem("token")
        this.state.id_menu = localStorage.getItem("menu")
        this.state.id_meja = localStorage.getItem("id_meja")
        this.state.id_user = localStorage.getItem("id_user")
        this.state.nama_pelanggan = localStorage.getItem("nama_pelanggan")
        this.state.role = localStorage.getItem('role')
        }else{
        window.location = "/login"
        }
  }

  headerConfig = () => {
    let header = {
        headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header
}

initCart = () => {
    // memanggil data cart pada localStorage
    let tempCart = []
    if(localStorage.getItem("cart") !== null){
        tempCart = JSON.parse(localStorage.getItem("cart"))
    }
    if(localStorage.getItem("nama_menu") !== null){
        this.setState({
        menuName: localStorage.getItem("nama_menu")
        })
    }
    // kalkulasi total harga
    let totalHarga = 0;
    tempCart.map(item => {
        totalHarga += (item.harga * item.qty)
    })
    // memasukkan data cart, user, dan total harga pada state
    this.setState({
        cart: tempCart,
        total: totalHarga
    })
}

  componentDidMount() {
    this.initCart();
  }
  
editItem = selectedItem => {
    let tempCart = []
    if (localStorage.getItem("cart") !== null) {
        tempCart = JSON.parse(localStorage.getItem("cart"))
    }

    let index = tempCart.findIndex(it => it.id_menu === selectedItem.id_menu)
    let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.nama_menu} yang ingin dibeli`, selectedItem.qty)
    tempCart[index].qty = promptJumlah

    // update localStorage
    localStorage.setItem("cart", JSON.stringify(tempCart))

    // refresh cart
    this.initCart()
}

dropItem = selectedItem => {
    if (window.confirm(`Apakah anda yakin menghapus ${selectedItem.nama_menu} dari cart?`)) {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let index = tempCart.findIndex(it => it.id_menu === selectedItem.id_menu)
        tempCart.splice(index, 1)

        // update localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart))

        // refresh cart
        this.initCart()
    }
}

checkOut = () => {
  let tempCart = [];
  if (localStorage.getItem("cart") !== null) {
    tempCart = JSON.parse(localStorage.getItem("cart"));
  }
  let data = {
    // customer_id: this.state.customerID,
    // detail_transaksi: tempCart

    // id_outlet: this.state.id_outlet,
    id_menu: localStorage.getItem("menu"),
    id_meja: this.state.id_meja,
    nama_pelanggan: this.state.nama_pelanggan,
    biaya_tambahan:
      this.state.total * (10 / 100) - this.state.total * (5 / 100),
    diskon: this.state.total * (5 / 100),
    pajak: this.state.total * (10 / 100),
    status: "selesai",
    dibayar: "belum_dibayar",
    id_user: this.state.id_user,
    detail_transaksi: tempCart,
    total:
      this.state.total +
      this.state.total * (10 / 100) -
      this.state.total * (5 / 100),
  };
  let url = "http://localhost:8080/transaksi";
  axios
    .post(url, data, this.headerConfig())
    .then((res) => {
      console.log(res.data)
      // clear cart
      window.alert(res.data.message);
      localStorage.removeItem("cart");
      window.location = "/transaksi";
    })
    .catch((error) => {
      if (error.res) {
        if (error.res.status) {
          window.alert(error.res.data.message);
          this.props.history.push("/login");
        }
      } else {
        console.log(error);
      }
    });
};

  render() {
    return (
      <div>
        {this.state.role == "admin" &&
                            <NavbarAdmin />
                        }
                {this.state.role == "kasir" &&
                            <NavbarKasir />
                        }
                {this.state.role == "manajer" &&
                    <NavbarManajer />
                }
        <div className="container">
          <div className="card col-12 mt-5">
            <div className="card-header bg-info text-white">
              <h5>Data Keranjang Wikusama Cafe</h5>
            </div>
            <div className="card-body">
                        <h5 className="text-primary">
                        Menu: { this.state.menuName }
                        </h5>
              <table className="table table-bordered">
                <thead align="center">
                  <tr>
                    <th>Nama Menu</th>
                    <th>Jenis</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody align="center">
                  {this.state.cart.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nama_menu}</td>
                      <td>{item.jenis}</td>
                      <td>Rp {item.harga}</td>
                      <td>{item.qty}</td>
                      <td>Rp {item.harga * item.qty}</td>
                      <td>
                          {/* button untuk mengedit */}
                        <button className="btn btn-sm btn-primary m-1" onClick={() => this.editItem(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                        {/* button untuk menghapus */}
                        <button className="btn btn-sm btn-danger m-1" onClick={() => this.dropItem(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                        
                         {/* <button
                className="btn btn-sm btn-success m-1"
                onClick={this.props.onCart}
              >Choose</button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h5 className="text-danger">Total Harga: Rp{this.state.total}</h5>
            </div>
          </div>
          <br></br>
          <button
            className="btn btn-dark"
            onClick={() => this.checkOut()}
            disabled={this.state.cart.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}


  

export default Cart;