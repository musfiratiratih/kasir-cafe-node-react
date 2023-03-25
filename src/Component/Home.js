import React from "react";
import axios from "axios";
import NavbarAdmin from "../Component/NavbarAdmin";
import NavbarKasir from "../Component/NavbarKasir";
import NavbarManajer from "../Component/NavbarManajer";
import { Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar } from "recharts";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      userName: "",
      userCount: 0,
      menuCount: 0,
      mejaCount: 0,
      tranCount: 0,
      menu_favorite: [],
            nama_menu_favorite: [],
            qty_favorite: [],
            menu_less: [],
            nama_menu_less: [],
            qty_less: [],
    };
    // cek di local storage apakah ada token (sudah login)
    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token");
      this.state.role = localStorage.getItem("role");
    }
    // jika belum login
    else {
      window.location = "/Login";
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  getMenuFavorite = () => {
    let url = "http://localhost:8080/menu/search/favorite"

    axios.get(url, this.headerConfig())
        .then(res => {
            const menu_favorite = res.data.menu;
            const nama_menu_favorite = menu_favorite.map((item) => ({ name: item.menu.nama_menu }));
            const qty_favorite = menu_favorite.map((item) => ({ Penjualan: item.total_penjualan }));

            this.setState({
                menu_favorite,
                nama_menu_favorite,
                qty_favorite
            })
        })
        .catch(err => {
            console.log(err.message)
        })
}

getMenuLess = () => {
    let url = "http://localhost:8080/menu/search/less"

    axios.get(url, this.headerConfig())
        .then(res => {
            const menu_less = res.data.menu;
            const nama_menu_less = menu_less.map((item) => ({ name: item.menu.nama_menu }));
            const qty_less = menu_less.map((item) => ({ Penjualan: item.total_penjualan }));

            this.setState({
                menu_less,
                nama_menu_less,
                qty_less
            })
        })
        .catch(err => {
            console.log(err.message)
        })
}

  // mendapatkan nama user
  getUser = () => {
    let user = localStorage.getItem("nama_user");
    let url = "http://localhost:8080/user";

    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          userName: user,
          userCount: res.data.count,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // mendapatkan nama member
  //getMember = () => {
  //let url = "http://localhost:8080/member"

  //axios.get(url)
  //.then(res => {
  //this.setState({
  //memberCount: res.data.count
  //})
  //})
  //.catch(err => {
  //console.log(err.message)
  //})
  //}

  // mendapatkan nama menu
  getMenu = () => {
    let url = "http://localhost:8080/menu";

    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          menuCount: res.data.count,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // mendapatkan nomor meja
  getMeja = () => {
    let url = "http://localhost:8080/meja";

    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          mejaCount: res.data.count,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // mendapatkan nama transaksi
  getTran = () => {
    let url = "http://localhost:8080/transaksi";

    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          tranCount: res.data.count,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  componentDidMount = () => {
    this.getUser();
    this.getMenu();
    this.getMeja();
    this.getTran();
    this.getMenuFavorite();
    this.getMenuLess();
  };

  render() {
    const data_favorite = [...this.state.nama_menu_favorite].map((item, index) => ({ ...item, ...this.state.qty_favorite[index] }));
    const data_less = [...this.state.nama_menu_less].map((item, index) => ({ ...item, ...this.state.qty_less[index] }));
    return (
      <div>
        {this.state.role === "admin" && <NavbarAdmin />}
        {this.state.role === "kasir" && <NavbarKasir />}
        {this.state.role === "manajer" && <NavbarManajer />}
        <div className="container">
          {/* <div className='mb-4 mt-4'>
                        <h6>Dashboard Admin</h6>
                    </div> */}
          <div className="alert bg-dark text-white text-center mb-4">
            <h1 className="text-bold">
              <i>
                HELLO! WELCOME BACK USER {this.state.userName.toUpperCase()}
              </i>
            </h1>
          </div>
          <hr />
          {/* <div className="d-flex justify-content-around p-1">
                        <div className="card col-6 bg-success m-1">
                            <div className="card-body row">
                                <div className="col-9 p-4">
                                    <h2 className="text-light">Total Member</h2>
                                    <h2 className="text-white"><i>{this.state.memberCount}</i></h2>
                                </div>
                            </div>
                        </div> */}
          <div className="d-flex justify-content-around p-1">
            <div className="card col-6 bg-success m-1">
              <div className="card-body row">
                <div className="col-9 p-4">
                  <h2 className="text-light">Total User</h2>
                  <h2 className="text-white">
                    <i>{this.state.userCount}</i>
                  </h2>
                </div>
              </div>
            </div>
            <div className="card col-6 bg-info m-1">
              <div className="card-body row">
                <div className="col-9 p-4">
                  <h2 className="text-light">Total Menu</h2>
                  <h2 className="text-white">
                    <i>{this.state.menuCount}</i>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around p-1">
            <div className="card col-6 bg-warning m-1">
              <div className="card-body row">
                <div className="col-9 p-4">
                  <h2 className="text-light">Total Meja</h2>
                  <h2 className="text-white">
                    <i>{this.state.mejaCount}</i>
                  </h2>
                </div>
              </div>
            </div>
            <div className="card col-6 bg-danger m-1">
              <div className="col-9 p-4">
                <h2 className="text-light">Total Transaksi</h2>
                <h2 className="text-white">
                  <i>{this.state.tranCount}</i>
                </h2>
              </div>
            </div>
          </div>
        </div>
        {this.state.role === "manajer" ? (
                                <div>
                                    <div className="card justify-content-center align-items-center text-center">
                                        <h3 className="mt-4 mb-3">Favorite Menu Statistic</h3>
                                        <div className="mx-5 mt-4 mb-5">
                                            <BarChart
                                                width={800}
                                                height={300}
                                                data={data_favorite}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                                barSize={25}
                                            >
                                                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Bar dataKey="Penjualan" fill="#8884d8" background={{ fill: '#eee' }} />
                                            </BarChart>
                                        </div>
                                    </div>
                                    <div className="card justify-content-center align-items-center text-center mt-3">
                                        <h3 className="mt-4 mb-3">Least Menu Statistic</h3>
                                        <div className="mx-5 mt-4 mb-5">
                                            <BarChart
                                                width={800}
                                                height={300}
                                                data={data_less}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                                barSize={25}
                                            >
                                                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Bar dataKey="Penjualan" fill="#8884d8" background={{ fill: '#eee' }} />
                                            </BarChart>
                                        </div>
                                    </div>

                                    {/* <div className="card">
                                        <h3 className="mt-4 mb-3 text-center">Statistik Penjualan Menu</h3>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center text-center mx-5 mt-4 mb-5">
                                            <BarChart
                                                width={500}
                                                height={300}
                                                data={data_favorite}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                                barSize={20}
                                            >
                                                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
                                            </BarChart>

                                            <PieChart width={300} height={300}>
                                                <Pie
                                                    dataKey="value"
                                                    isAnimationActive={false}
                                                    data={data_favorite}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    label
                                                />
                                                <Tooltip />
                                            </PieChart>
                                        </div>
                                    </div>
                                    <div className="card mt-3">
                                        <h3 className="mt-4 mb-3 text-center">Statistik Penjualan Menu</h3>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center text-center mx-5 mt-4 mb-5">
                                            <BarChart
                                                width={500}
                                                height={300}
                                                data={data_least}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                                barSize={20}
                                            >
                                                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
                                            </BarChart>

                                            <PieChart width={300} height={300}>
                                                <Pie
                                                    dataKey="value"
                                                    isAnimationActive={false}
                                                    data={data_least}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    label
                                                />
                                                <Tooltip />
                                            </PieChart>
                                        </div>
                                    </div> */}
                                </div>
                            ) : (
                                <div></div>
                            )}
      </div>
    );
  }
}
