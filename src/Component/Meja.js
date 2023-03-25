import React from "react";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import NavbarAdmin from '../Component/NavbarAdmin';
import NavbarKasir from '../Component/NavbarKasir';
import NavbarManajer from '../Component/NavbarManajer';


export default class Meja extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            meja: [],
            id_meja: "",
            nomor_meja: "",
            status: "",
            isModalOpen: false,
            action: ""

        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            this.state.role = localStorage.getItem('role')
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            //if (localStorage.getItem("role") === "admin"){
                //this.state.token = localStorage.getItem("token")
            //} else {
               // window.alert("Anda bukan Admin")
                //window.location = "/"
            //}
            
        } else {
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getMeja = () => {
        let meja = (localStorage.getItem("nomor_meja"))
        let url = "http://localhost:8080/meja"
        axios.get(url)
            .then(res => {
                this.setState({
                    meja: res.data.meja,
                })
            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(meja)
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_meja: item.id_meja,
            nomor_meja: item.nomor_meja,
            status: item.status,
            action: "update"
        })
    }

    addMeja = () => {
        this.setState({
            isModalOpen: true,
            id_meja: "",
            nomor_meja: "",
            status: "",
            action: "insert"
        });
    }

    dropMenu = id_meja => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = "http://localhost:8080/meja/" + id_meja
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMeja()
                })
                .catch(error => console.log(error))
        }
    }

    handleSave = e => {
        e.preventDefault()
        let form = {
            id_meja: this.state.id_meja,
            nomor_meja: this.state.nomor_meja,
            status: this.state.status,
        }

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/meja"
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMeja()
                    this.handleClose()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            url = "http://localhost:8080/meja/" + this.state.id_meja
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMeja()
                    this.handleClose()
                })
                .catch(error => console.log(error))
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempMeja = this.state.meja
            let result = tempMeja.filter(item => {
                return item.nomor_meja.toLowerCase().includes(keyword) ||
                item.status.toLowerCase().includes(keyword)

            })
            this.setState({meja: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
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
                {/* <div className="back"> */}
                <div className="container">
                <div class="card mt-3">
            <div class="card-header bg-white">
            <div className='alert bg-warning text-white mb-4'>
                        <h2 class="text-center"><b>Data Meja</b></h2>
	        </div>
            
            <div class="d-grid gap-2">
            <button className="btn btn-success" onClick={() => this.addMeja()}>
                        Add Meja
                    </button>
                    </div>
                    <hr></hr>

                <br></br>
                    <input type="text" className="form-control my-2" placeholder="Pencarian Berdasarkan Nomor Meja" value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={ev => this.searching(ev)}/>
                    {/* <h3 className="text-bold text-info mt-2">Admin List</h3> */}
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr  align="center">
                                <th>NO</th>
                                <th>Nomor Meja</th>
                                <th>Status Meja</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody  align="center">
                            {this.state.meja.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.nomor_meja}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            {/* button untuk mengedit */}
                                            <button className="btn btn-sm btn-primary m-1"  onClick={() => this.handleEdit(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                            </button>
                                            {/* button untuk menghapus */}
                                            <button className="btn btn-sm btn-danger m-1"  onClick={() => this.dropMenu(item.id_meja)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    

                    {/* modal admin  */}
                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Meja</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="nomor_meja">
                                    <Form.Label className="text-black" >Nomor Meja</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="nomor_meja" placeholder="Masukkan Nomor Meja" value={this.state.nomor_meja}
                                        onChange={e => this.setState({ nomor_meja: e.target.value })} required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="status">
                                    <Form.Label className="text-black">Status Meja</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="status" placeholder="Masukkan Status Menu" value={this.state.status}
                                        onChange={e => this.setState({ status: e.target.value })} required
                                    />
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
        )
    }
}