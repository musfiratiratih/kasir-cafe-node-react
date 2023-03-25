import React from "react";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import NavbarAdmin from '../Component/NavbarAdmin';
import NavbarKasir from '../Component/NavbarKasir';
import NavbarManajer from '../Component/NavbarManajer';

export default class User extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            user: [],
            //mejas: [],
            id_user: "",
            nama_user: "",
            role: "",
            username: "",
            password: "",
            id_meja: "",
            fillPassword: true,
            isModalOpen: false,
            action: ""

        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            this.state.role = localStorage.getItem("role");
            this.state.token = localStorage.getItem("token");
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            //if (localStorage.getItem("role") === "admin"){
               // this.state.token = localStorage.getItem("token")
            //} else {
                //window.alert("Anda bukan Admin")
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

    getUser = () => {
        let user = (localStorage.getItem("nama_user"))
        let url = "http://localhost:8080/user"
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    user: res.data.user,
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(user)
    }

    //getMeja = () => {
        //let url = "http://localhost:8080/meja"

        //axios.get(url, this.headerConfig())
        
           // .then(res => {
                //this.setState({
                    //mejas: res.data.meja,
                    // custCount: res.data.count
                //})

            //})
            //.catch(err => {
                //console.log(err.message)
            //})
            
    //}

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_user: item.id_user,
            nama_user: item.nama_user,
            role: item.role,
            username: item.username,
            password: item.password,
            //id_meja: item.id_meja,
            action: "update"
        })
    }

    addUser = () => {
        this.setState({
            isModalOpen: true,
            action: "insert",
            id_user: 0,
            nama_user: "",
            role: "",
            username: "",
            password: "",
            //id_meja: "",
            fillPassword: true,
        })
    }

    dropUser = id_user => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = "http://localhost:8080/user/" + id_user
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getUser()
                })
                .catch(error => console.log(error))
        }
    }

    handleSave = e => {
        e.preventDefault()
        let form = {
            id_user: this.state.id_user,
            nama_user: this.state.nama_user,
            role: this.state.role,
            username: this.state.username,
            password: this.state.password,
            //id_meja: this.state.id_meja,
        }

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/user"
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getUser()
                    this.handleClose()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            url = "http://localhost:8080/user/" + this.state.id_user
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getUser()
                    this.handleClose()
                })
                .catch(error => console.log(error))
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempUser = this.state.user
            let result = tempUser.filter(item => {
                return item.nama_user.toLowerCase().includes(keyword) 

            })
            this.setState({user: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getUser()
        //this.getMeja()
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
                        <h2 class="text-center"><b>Data User</b></h2>
	        </div>

            <div class="d-grid gap-2">
            <button className="btn btn-success" onClick={() => this.addUser()}>
                        Add User
                    </button>
                    </div>
                    <hr></hr>

                <br></br>
                    <input type="text" className="form-control my-2" placeholder="Pencarian Berdasarkan Nama User" value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={ev => this.searching(ev)}/>
                    {/* <h3 className="text-bold text-info mt-2">Admin List</h3> */}
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr  align="center">
                                <th>NO</th>
                                <th>Nama User</th>
                                <th>Role</th>
                                <th>Username</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody  align="center">
                            {this.state.user.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.nama_user}</td>
                                        <td>{item.role}</td>
                                        <td>{item.username}</td>
                                        
                                        <td>
                                            {/* button untuk mengedit */}
                                            <button className="btn btn-sm btn-primary m-1"  onClick={() => this.handleEdit(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                            </button>
                                            {/* button untuk menghapus */}
                                            <button className="btn btn-sm btn-danger m-1"  onClick={() => this.dropUser(item.id_user)}>
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
                            <Modal.Title>Form User</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama_user">
                                    <Form.Label className="text-black" >Nama User </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="nama_user" placeholder="Masukkan Nama User" value={this.state.nama_user}
                                        onChange={e => this.setState({ nama_user: e.target.value })} required
                                    />
                                </Form.Group>

                                <Form.Label className="text-black" >Role </Form.Label>
                                <Form.Select id="mySelect" name="role" value={this.state.role} onChange={e => this.setState({ role: e.target.value })} required>
                                    <option className="firstOption" value="" hidden={true}>
                                        Pilih Role
                                    </option>
                                    <option value="admin">Admin</option>
                                    <option value="kasir">Kasir</option>
                                    <option value="manajer">Manajer</option>
                                </Form.Select>

                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label className="text-black">Username</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="username" placeholder="Masukkan  Username" value={this.state.username}
                                        onChange={e => this.setState({ username: e.target.value })} required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label className="text-black">Password</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="password" name="password" placeholder="Masukkan Password" value={this.state.password}
                                            onChange={e => this.setState({ password: e.target.value })} required
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