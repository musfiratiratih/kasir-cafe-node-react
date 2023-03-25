import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import ChooseMenuList from "../Pages/ChooseMenuList";
import NavbarAdmin from '../Component/NavbarAdmin';
import NavbarKasir from '../Component/NavbarKasir';
import NavbarManajer from '../Component/NavbarManajer';

export default class Menu extends React.Component {
    constructor() {
        super()
        this.state = {
            menu: [],
            meja: [],
            id_menu: "",
            nama_menu: "",
            jenis: "",
            deskripsi: "",
            gambar:"",
            harga: 0,
            isModalOpen: false,
            action: ""
        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            this.state.role = localStorage.getItem('role')
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            // if (localStorage.getItem("role") === "admin"){
            //     this.state.token = localStorage.getItem("token")
            // } else {
            //     window.alert("Anda bukan Admin")
            //     window.location = "/"
            // }
            
        } else {
            window.location = "/login"
        }

    }

    setUser = () => {
        // cek eksistensi dari session storage
        if(localStorage.getItem("user") === null){
            // kondisi jika session storage "user" belum dibuat
            let prompt = window.prompt("Masukkan Nama Anda","")
            if(prompt === null || prompt === ""){
                // jika user tidak mengisikan namanya
                this.setUser()
            }else{
                // jika user telah mengisikan namanya
 
                // simpan nama user ke session storage
                localStorage.setItem("user", prompt)
 
                // simpan nama user ke state.user
                this.setState({user: prompt})
            }
        }else{
            // kondisi saat session storage "user" telah dibuat
 
            // akses nilai dari session storage "user"
            let nama_user = localStorage.getItem("user")
            this.setState({user: nama_user})
        }
    }

    componentDidMount(){
        this.setUser()
}

addToCart = (selectedItem) => {
    // membuat sebuah variabel untuk menampung cart sementara
    let tempCart = [];
    // cek eksistensi dari data cart pada localStorage
    if (localStorage.getItem("cart") !== null) {
      tempCart = JSON.parse(localStorage.getItem("cart"));
      // JSON.parse() digunakan untuk mengonversi dari string -> array object
    }
    // cek data yang dipilih user ke keranjang belanja
    let existItem = tempCart.find(
      (item) => item.id_menu === selectedItem.id_menu
    );
    if (existItem) {
      // jika item yang dipilih ada pada keranjang belanja
      window.alert(`Anda telah memilih ${selectedItem.nama_menu}`);
    } else {
      // user diminta memasukkan jumlah item yang dibeli
      let promptJumlah = window.prompt(
        `Masukkan jumlah ${selectedItem.nama_menu} yang beli`,
        ""
      );
      if (promptJumlah !== null && promptJumlah !== "") {
        // jika user memasukkan jumlah item yg dibeli
        // menambahkan properti "jumlahBeli" pada item yang dipilih
        selectedItem.qty = promptJumlah;
        // masukkan item yg dipilih ke dalam cart
        tempCart.push(selectedItem);
        // simpan array tempCart ke localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart));
      }
    }
  };

    headerConfig = () => {
        let header = {
            headers: {Authorization : `Bearer ${this.state.token}`}
        }
        return header
    }

    handleChange = (e) => {
        this.setState({
            [e.target.nama_menu]: e.target.value
        });
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getMenu = () => {
        let menu = (localStorage.getItem("nama_menu"))
        let url = "http://localhost:8080/menu"
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    menu: res.data.menu,
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(menu)
    }

    getMeja = () => {
        let url = "http://localhost:8080/meja"

        axios.get(url, this.headerConfig())
        
            .then(res => {
                this.setState({
                    meja: res.data.meja,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
            
    }

    addMenu = () => {
        this.setState({
            isModalOpen: true,
            id_menu: "",
            id_meja:"",
            nama_menu: "",
            jenis: "",
            deskripsi: "",
            gambar: "",
            harga: 0,
            action: "insert"
        });
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_menu: item.id_menu,
            id_meja: item.id_meja,
            nama_menu: item.nama_menu,
            jenis: item.jenis,
            deskripsi: item.deskripsi,
            gambar: item.gambar,
            harga: item.harga,
            action: "update"
        })
        
    }

    handleSave = (e) => {
        e.preventDefault()
        let form =  {
            id_menu: this.state.id_menu,
            id_meja: this.state.id_meja,
            nama_menu: this.state.nama_menu,
            jenis: this.state.jenis,
            deskripsi: this.state.deskripsi,
            gambar: this.state.gambar,
            harga: this.state.harga
            }
       
        let url = "http://localhost:8080/menu"
        if (this.state.action === "insert"){
            axios.post(url, form)
            .then(res => {
                window.alert(res.data.message)
                this.getMenu()
                this.handleClose()
            })
            .catch(error => console.log(error))

            }else if (this.state.action === "update") {
            url = "http://localhost:8080/menu/" + this.state.id_menu
            axios.put(url, form)
            .then(res => {
                window.alert(res.data.message)
                this.getMenu()
                this.handleClose()
            })
            .catch(error => console.log(error))
        }
    }

    handleDel = (id_menu) => {
        let url = "http://localhost:8080/paket/" + id_menu
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getMenu()
                    // this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempMenu = this.state.menu
            let result = tempMenu.filter(item => {
                return item.nama_menu.toLowerCase().includes(keyword) ||
                item.jenis.toLowerCase().includes(keyword) 

            })
            this.setState({menu: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getMenu()
        this.getMeja()
    }

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
        <div class="card mt-3">
            <div class="card-header bg-white">
            <div className='alert bg-warning text-white mb-4'>
                        <h2 class="text-center"><b>Data Choose Menu</b></h2>
	        </div>

            

            <input type="text" className="form-control my-2" placeholder="Pencarian"
                            value={this.state.keyword}
                            onChange={ev => this.setState({keyword: ev.target.value})}
                            onKeyUp={ev => this.searching(ev)}
                            /> 

                <div className="container">
                    <div className="row">
                        {this.state.menu.map((item, index) => {
                            return (
                                <ChooseMenuList key={index}
                                    
                                nama_menu={item.nama_menu}
                                id_meja={item.id_meja}
                                jenis={item.jenis}
                                deskripsi={item.deskripsi}
                                gambar={"http://localhost:8080/gambar/" + item.gambar}
                                harga={item.harga}
                                onEdit={() => this.handleEdit(item)}
                                onDel={() => this.handleDel(item.id_menu)}
                                onCart={ () => this.addToCart(item)}

                                />
                            )
                        })}
                    </div>
                    
                    <Modal  show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Menu</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>

                            <Form.Group className="mb-3" controlId="id_meja">
                                    <Form.Label className="text-black">Meja</Form.Label>
                                    <Form.Select id="mySelect" value={this.state.id_meja} onChange={(ev) => this.setState({ id_meja: ev.target.value })} required>
                                    <option className="opsitransacd ksi" value="" readOnly={true} hidden={true}>
                                        Pilih Meja
                                    </option>
                                    {this.state.meja.map((meja) => (
                                        <option value={meja.id_meja}>{meja.nomor_meja}</option>
                                    ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama_menu">
                                    <Form.Label className="text-black" >Nama Menu</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="nama_menu" placeholder="Masukkan Nama Menu" value={this.state.nama_menu} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group  className="mb-3">
                                <Form.Label className="text-black" >Jenis Menu</Form.Label>
                                <Form.Select id="mySelect"name="jenis" value={this.state.jenis} onChange={this.handleChange} required>
                                    <option className="firstOption" value="" hidden={true}>
                                        Pilih Jenis Menu
                                    </option>
                                    <option value="kiloan">Makanan</option>
                                    <option value="selimut">Minuman</option>
                                </Form.Select>
                                </Form.Group>
                                
                                
                                {/* <Form.Group className="mb-3" controlId="jenis">
                                    <Form.Label className="text-black">Jenis</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="jenis" placeholder="Masukkan Jenis" value={this.state.jenis} onChange={this.handleChange} />
                                </Form.Group> */}
                                
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="deskripsi">
                                    <Form.Label className="text-black" >Deskripsi Menu</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="deskripsi" placeholder="Masukkan Deskripsi Menu" value={this.state.deskripsi} onChange={this.handleChange} />
                                </Form.Group>
                                
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="gambar">
                                    <Form.Label className="text-black" >Gambar Menu</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="image" name="gambar" placeholder="Masukkan Gambar Menu" value={this.state.gambar} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="harga">
                                    <Form.Label className="text-black">Harga Menu</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="harga" placeholder="Masukkan Harga Menu" value={this.state.harga} onChange={this.handleChange} />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" onClick={this.handleClose}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div>
                </div>
                </div>
                </div>
                </div>
        )
    }

}