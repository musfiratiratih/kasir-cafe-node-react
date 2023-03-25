import React from "react";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

export default class ChooseMenuList extends React.Component{
    render(){
        return (
        <div className="col-lg-6 col-sm-12 p-2" >
            <div className="card">
                <div className="card-body row" >
                <div className="col-6">
                        <img src={this.props.gambar} className="gambar" height="150" width="200"/>
                    </div>
                    {/* menampilkan deskripsi */}
                    <div className="col-6">
                        <h5 className="text-dark"><strong>
                            { this.props.nama_menu } </strong>
                        </h5>
                        <h6 className="text-dark">
                            Jenis     : { this.props.jenis}
                        </h6>
                        <h6 className="text-dark">
                            Harga    : { this.props.harga}
                        </h6>
                        
                        {/* button untuk menambah ke keranjang belanja */}
                        <button className="btn btn-sm btn-success m-1"
                            onClick={this.props.onCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                                
                            </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}