import React from 'react'
import axios from 'axios'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
            // logged: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        let url = "http://localhost:8080/user/auth"
        axios.post(url, data)
        .then(res => {
            if (res.data.logged) {
                let id_user = res.data.data.id_user
                let nama_user = res.data.data.nama_user
                let role = res.data.data.role
                let user = res.data.data
                let token = res.data.token
                //let id_meja = res.data.data.id_meja
                localStorage.setItem("id_user", id_user)
                localStorage.setItem("nama_user", nama_user)
                localStorage.setItem("role", role)
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                //localStorage.setItem("nomor_meja", id_meja)
                window.location = '/'
            }
            else {
                window.alert(res.data.message)
            }
        })
    }

    render() {
        return (
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white">
                                <div className="card-body p-5 text-center">
                                    <div className="md-5 mb-0 mt-md-2 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your username and password!</p>
                                        <form onSubmit={(e) => this.handleLogin(e)}>
                                        <div className="form-outline form-white mb-3">
                                            <label className="form-label" for="typeEmailX">Username</label>
                                            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} id="typeEmailX" className="form-control form-control-lg" required />
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" for="typePasswordX">Password</label>
                                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} id="typePasswordX" className="form-control form-control-lg" required />
                                        </div>

                                        <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                        </form>   

                                    </div>
                                    <div>
                                        <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}