import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Meja from './Meja';
import ChooseMeja from './ChooseMeja';
//import Outlet from './Outlet';
import Menu from './Menu';
import ChooseMenu from './ChooseMenu';
import Transaksi from './Transaksi';
import TransaksiManajer from './TransaksiManajer';
import Cart from '../Pages/Cart';
import User from './User';
import Detail from './Detail';
import Cetak from './Cetak';

const Utama = () => (
    <Routes>
        <Route exact path = "/" element = {<Home/>} />
        <Route path = "/Login" element = {<Login/>} />
        <Route path = "/Meja" element = {<Meja/>} />
        <Route path = "/ChooseMeja" element = {<ChooseMeja/>} />
        <Route path = "/Menu" element = {<Menu/>} />
        <Route path = "/ChooseMenu" element = {<ChooseMenu/>} />
        <Route path = "/Transaksi" element = {<Transaksi/>} />
        <Route path = "/TransaksiManajer" element = {<TransaksiManajer/>} />
        <Route path = "/Cart" element = {<Cart/>} />
        <Route path = "/User" element = {<User/>} />
        <Route path = "/Detail" element = {<Detail/>} />
        <Route path = "/Cetak" element = {<Cetak/>} />
    </Routes>
)

export default Utama;