-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Mar 2023 pada 02.55
-- Versi server: 10.4.20-MariaDB
-- Versi PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kasir_cafe`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id_detail_transaksi` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `qty` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`id_detail_transaksi`, `id_transaksi`, `id_menu`, `qty`, `createdAt`, `updatedAt`) VALUES
(40, 38, 1, 2, '2023-02-12 07:02:35', '2023-02-12 07:02:35'),
(43, 41, 3, 1, '2023-01-18 03:42:57', '2023-01-18 03:42:57'),
(44, 41, 1, 3, '2023-01-18 03:18:26', '2023-01-18 03:40:33'),
(45, 42, 3, 4, '2023-01-18 03:42:57', '2023-01-18 03:42:57'),
(46, 47, 1, 2, '2023-03-04 09:38:17', '2023-03-04 09:38:17'),
(47, 48, 3, 5, '2023-01-18 03:42:57', '2023-01-18 03:42:57'),
(48, 48, 1, 4, '2023-01-18 03:18:26', '2023-01-18 03:40:33'),
(49, 49, 3, 5, '2023-01-18 03:42:57', '2023-01-18 03:42:57'),
(50, 50, 1, 3, '2023-01-18 03:18:26', '2023-01-18 03:40:33'),
(51, 51, 3, 2, '2023-01-18 03:42:57', '2023-01-18 03:42:57'),
(52, 52, 1, 3, '2023-01-18 03:18:26', '2023-01-18 03:40:33'),
(53, 53, 3, 4, '2023-01-18 03:42:57', '2023-01-18 03:42:57'),
(54, 54, 1, 6, '2023-01-18 03:18:26', '2023-01-18 03:40:33'),
(55, 55, 1, 2, '2023-01-18 03:18:26', '2023-01-18 03:40:33'),
(56, 56, 3, 3, '2023-01-18 03:42:57', '2023-01-18 03:42:57'),
(57, 57, 1, 2, '2023-01-18 03:18:26', '2023-01-18 03:40:33'),
(58, 58, 3, 4, '2023-01-18 03:42:57', '2023-01-18 03:42:57'),
(59, 59, 1, 3, '2023-01-18 03:18:26', '2023-01-18 03:40:33'),
(60, 60, 1, 2, '2023-03-06 08:03:33', '2023-03-06 08:03:33'),
(61, 61, 1, 3, '2023-03-06 08:07:55', '2023-03-06 08:07:55'),
(62, 62, 3, 5, '2023-01-18 03:42:57', '2023-01-18 03:42:57'),
(63, 62, 1, 2, '2023-01-18 03:18:26', '2023-01-18 03:40:33'),
(64, 63, 3, 5, '2023-01-18 03:42:57', '2023-01-18 03:42:57'),
(65, 64, 7, 5, '2023-03-08 09:19:12', '2023-03-08 10:05:40'),
(66, 65, 3, 3, '2023-01-18 03:42:57', '2023-03-08 11:06:42'),
(67, 66, 8, 3, '2023-03-08 10:10:29', '2023-03-08 11:06:26'),
(68, 66, 1, 2, '2023-01-18 03:18:26', '2023-03-08 12:06:12'),
(69, 67, 1, 2, '2023-01-18 03:18:26', '2023-03-08 12:06:12'),
(70, 68, 7, 4, '2023-03-08 09:19:12', '2023-03-08 14:33:39'),
(71, 69, 9, 3, '2023-03-08 11:10:00', '2023-03-08 12:02:05'),
(72, 70, 10, 1, '2023-03-08 13:20:27', '2023-03-08 13:20:27'),
(73, 71, 9, 2, '2023-03-08 11:10:00', '2023-03-08 12:02:05'),
(74, 72, 11, 4, '2023-03-09 06:11:35', '2023-03-16 06:54:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `meja`
--

CREATE TABLE `meja` (
  `id_meja` int(11) NOT NULL,
  `nomor_meja` varchar(255) DEFAULT NULL,
  `status` enum('diisi','kosong') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `meja`
--

INSERT INTO `meja` (`id_meja`, `nomor_meja`, `status`, `createdAt`, `updatedAt`) VALUES
(1, '12A', 'diisi', '2023-01-18 06:48:46', '2023-03-06 09:00:59'),
(3, '24B', 'diisi', '2023-01-18 06:52:09', '2023-03-06 08:20:35'),
(4, '25E', 'diisi', '2023-02-01 02:54:40', '2023-03-08 06:55:49'),
(5, '22Y', 'diisi', '2023-02-01 03:02:57', '2023-03-08 13:24:48'),
(6, '13R', 'diisi', '2023-02-01 03:08:00', '2023-03-16 09:40:13'),
(7, '19D', 'diisi', '2023-02-01 03:25:33', '2023-03-16 09:42:19'),
(8, '25I', 'diisi', '2023-02-01 03:37:51', '2023-03-16 10:02:02'),
(9, '05M', 'diisi', '2023-02-01 03:43:42', '2023-03-16 10:46:02'),
(10, '14J', 'diisi', '2023-02-01 07:22:28', '2023-03-16 10:57:34'),
(11, '18N', 'diisi', '2023-02-01 07:32:52', '2023-03-16 11:01:43'),
(12, '34B', 'diisi', '2023-02-02 03:35:43', '2023-03-16 11:03:32'),
(13, '22C', 'diisi', '2023-02-02 04:15:27', '2023-03-20 01:20:38'),
(14, '27S', 'kosong', '2023-02-02 04:17:04', '2023-03-04 13:31:42'),
(15, '35S', 'kosong', '2023-02-02 06:35:34', '2023-03-04 13:31:51'),
(16, '26L', 'kosong', '2023-03-06 09:08:04', '2023-03-06 09:08:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `nama_menu` varchar(255) DEFAULT NULL,
  `jenis` enum('makanan','minuman') DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `menu`
--

INSERT INTO `menu` (`id_menu`, `nama_menu`, `jenis`, `deskripsi`, `gambar`, `harga`, `createdAt`, `updatedAt`) VALUES
(1, 'Chocolate Cake', 'makanan', 'Kue coklat atau chocolate gâteau adalah kue yang dibumbui dengan cokelat leleh, bubuk kakao, atau keduanya.', 'img-1678277172488.jpeg', 14000, '2023-01-18 03:18:26', '2023-03-08 12:06:12'),
(3, 'Matcha Latte', 'makanan', 'Matcha latte adalah minuman yang terbuat dari campuran bubuk matcha yang dilarutkan dengan susu steam sehingga menghasilkan minuman yang manis dan creamy dengan sedikit rasa pahit dari teh hijau.', 'img-1678273602442.jpg', 12000, '2023-01-18 03:42:57', '2023-03-08 11:06:42'),
(7, 'Fried Fries', 'makanan', 'Kentang goreng adalah hidangan yang dibuat dari potongan-potongan kentang yang digoreng dalam minyak goreng panas. Di dalam menu rumah-rumah makan, kentang goreng yang dipotong panjang-panjang dan digoreng dalam keadaan terendam di dalam minyak goreng panas disebut French fries.', 'img-1678286019955.jpg', 10000, '2023-03-08 09:19:12', '2023-03-08 14:33:39'),
(8, 'Taro Latte', 'minuman', 'Taro Latte merupakan minuman ekstrak buah talas yang dihias susu yang di-froth. Tak hanya aroma yang menggugah selera, rasa yang disajikan oleh Taro Latte pun tak mengecewakan. Rasa manis buah talas berpadu dengan gurih susu segar.', 'img-1678273586142.jpg', 15000, '2023-03-08 10:10:29', '2023-03-08 11:06:26'),
(9, 'Pancake', 'makanan', 'Pancake atau kue dadar adalah kue yang dibuat dari terigu, telur ayam, gula dan susu. Bahan-bahan dicampur dengan air membentuk adonan kental yang digoreng di atas wajan datar yang diolesi sedikit minyak. Setelah matang, panekuk bisa dihidangkan sewaktu masih hangat atau setelah dingin.', 'img-1678276925696.jpg', 18000, '2023-03-08 11:10:00', '2023-03-08 12:02:05'),
(10, 'Caffe Latte', 'minuman', 'Latte atau Caffè latte adalah espresso atau kopi yang dicampur dengan susu dan memiliki lapisan busa yang tipis di bagian atasnya. Perbandingan antara susu dengan kopi pada caffè latte adalah 2:1.', 'img-1678281626993.jpg', 16000, '2023-03-08 13:20:27', '2023-03-08 13:20:27'),
(11, 'Pisang Coklat', 'makanan', 'Pisang cokelat atau kerap disingkat piscok, adalah kudapan manis dari Indonesia yang terbuat dari irisan pisang dengan cokelat cair atau susu kental manis cokelat, yang dibungkus dalam kulit tepung tipis mirip crepe, atau lazim menggunakan kulit lumpia yang kemudian, digoreng dalam rendaman minyak goreng.', 'img-1678948543223.jpg', 13000, '2023-03-09 06:11:35', '2023-03-16 06:54:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230117025608-create-menu.js'),
('20230117025648-create-meja.js'),
('20230117025747-create-user.js'),
('20230117030348-create-transaksi.js'),
('20230117030446-create-detail-transaksi.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `tgl_transaksi` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_user` int(11) NOT NULL,
  `id_meja` int(11) NOT NULL,
  `nama_pelanggan` varchar(255) DEFAULT NULL,
  `kode_invoice` varchar(255) DEFAULT NULL,
  `status` enum('selesai','diambil') DEFAULT NULL,
  `biaya_tambahan` int(11) NOT NULL,
  `diskon` double NOT NULL,
  `pajak` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `dibayar` enum('belum_dibayar','dibayar') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `tgl_transaksi`, `id_user`, `id_meja`, `nama_pelanggan`, `kode_invoice`, `status`, `biaya_tambahan`, `diskon`, `pajak`, `total`, `dibayar`, `createdAt`, `updatedAt`) VALUES
(38, '2023-02-12 00:00:00', 5, 15, 'Luna', '', '', 0, 0, 0, 12000, 'belum_dibayar', '2023-02-12 07:02:34', '2023-02-12 07:02:34'),
(41, '2023-03-04 00:00:00', 5, 5, NULL, '', '', 0, 0, 0, 56700, 'belum_dibayar', '2023-03-04 07:47:14', '2023-03-04 07:47:14'),
(42, '2023-03-05 00:00:00', 5, 3, NULL, '', 'diambil', 0, 0, 0, 50400, 'dibayar', '2023-03-04 07:52:21', '2023-03-05 01:54:20'),
(47, '2023-03-05 00:00:00', 5, 12, 'Joy', 'abc123', 'diambil', 1000, 1000, 2000, 28000, 'dibayar', '2023-03-04 09:38:16', '2023-03-05 01:54:01'),
(48, '2023-03-04 00:00:00', 5, 1, NULL, '', 'selesai', 5800, 5800, 11600, 121800, '', '2023-03-04 12:55:48', '2023-03-04 12:55:48'),
(49, '2023-03-04 00:00:00', 5, 4, NULL, NULL, 'selesai', 3000, 3000, 6000, 63000, '', '2023-03-04 13:13:05', '2023-03-04 13:13:05'),
(50, '2023-03-05 00:00:00', 5, 3, NULL, NULL, 'selesai', 2100, 2100, 4200, 44100, '', '2023-03-05 00:56:09', '2023-03-05 00:56:09'),
(51, '2023-03-05 00:00:00', 5, 4, NULL, NULL, 'selesai', 1200, 1200, 2400, 25200, '', '2023-03-05 01:12:54', '2023-03-05 01:12:54'),
(52, '2023-03-05 00:00:00', 5, 4, NULL, NULL, 'selesai', 2100, 2100, 4200, 44100, '', '2023-03-05 01:26:04', '2023-03-05 01:26:04'),
(53, '2023-03-05 00:00:00', 5, 6, NULL, NULL, 'diambil', 2400, 2400, 4800, 50400, 'dibayar', '2023-03-05 01:44:33', '2023-03-05 01:56:56'),
(54, '2023-03-05 00:00:00', 5, 5, NULL, 'Cafe1677982619520', 'diambil', 4200, 4200, 8400, 88200, 'dibayar', '2023-03-05 02:16:59', '2023-03-05 02:17:24'),
(55, '2023-03-05 00:00:00', 5, 6, NULL, 'Cafe1677986341567', 'selesai', 1400, 1400, 2800, 29400, '', '2023-03-05 03:19:01', '2023-03-05 03:19:01'),
(56, '2023-03-05 00:00:00', 5, 5, NULL, 'Cafe1677987191815', 'selesai', 1800, 1800, 3600, 37800, '', '2023-03-05 03:33:11', '2023-03-05 03:33:11'),
(57, '2023-03-05 00:00:00', 5, 1, 'Gilang', 'Cafe1677989036009', 'selesai', 1400, 1400, 2800, 29400, '', '2023-03-05 04:03:56', '2023-03-05 04:03:56'),
(58, '2023-03-05 00:00:00', 5, 11, 'Thea', 'Cafe1677990783916', 'diambil', 2400, 2400, 4800, 50400, 'dibayar', '2023-03-05 04:33:03', '2023-03-05 04:33:17'),
(59, '2023-03-05 00:00:00', 6, 4, 'Tria', 'Cafe1677993138891', 'diambil', 2100, 2100, 4200, 44100, 'dibayar', '2023-03-05 05:12:18', '2023-03-05 05:12:52'),
(60, '2023-03-06 00:00:00', 6, 1, 'Kaila', 'Cafe1678089812467', 'diambil', 1000, 1000, 2000, 28000, 'belum_dibayar', '2023-03-06 08:03:32', '2023-03-06 08:03:32'),
(61, '2023-03-06 00:00:00', 6, 1, 'Farhan', 'Cafe1678090399340', 'diambil', 1000, 1000, 2000, 48000, 'belum_dibayar', '2023-03-06 08:07:55', '2023-03-06 08:13:19'),
(62, '2023-03-06 00:00:00', 6, 3, 'Vara', 'Cafe1678090858625', 'diambil', 4400, 4400, 8800, 92400, 'dibayar', '2023-03-06 08:20:35', '2023-03-06 08:20:58'),
(63, '2023-03-08 00:00:00', 6, 4, 'Lyta', 'Cafe1678258571638', 'diambil', 3000, 3000, 6000, 63000, 'dibayar', '2023-03-08 06:55:48', '2023-03-08 06:56:11'),
(64, '2023-03-08 00:00:00', 6, 5, 'Dita', 'Cafe1678281901731', 'diambil', 2500, 2500, 5000, 52500, 'dibayar', '2023-03-08 13:24:46', '2023-03-08 13:25:01'),
(65, '2023-03-16 00:00:00', 6, 6, 'Bilqis', 'Cafe1678959629871', 'diambil', 1800, 1800, 3600, 37800, 'dibayar', '2023-03-16 09:40:12', '2023-03-16 09:40:29'),
(66, '2023-03-16 00:00:00', 6, 7, 'Naura', 'Cafe1678959759216', 'diambil', 3650, 3650, 7300, 76650, 'dibayar', '2023-03-16 09:42:19', '2023-03-16 09:42:39'),
(67, '2023-03-16 00:00:00', 6, 8, 'Fariq', 'Cafe1678963596326', 'diambil', 1400, 1400, 2800, 29400, 'dibayar', '2023-03-16 10:02:01', '2023-03-16 10:46:36'),
(68, '2023-03-16 00:00:00', 6, 9, 'Senja', 'Cafe1678964666274', 'diambil', 2000, 2000, 4000, 42000, 'dibayar', '2023-03-16 10:46:02', '2023-03-16 11:04:26'),
(69, '2023-03-16 00:00:00', 6, 10, 'Ratu', 'Cafe1678964675310', 'diambil', 2700, 2700, 5400, 56700, 'dibayar', '2023-03-16 10:57:34', '2023-03-16 11:04:35'),
(70, '2023-03-16 00:00:00', 6, 11, 'Ayunda', 'Cafe1678964682514', 'diambil', 800, 800, 1600, 16800, 'dibayar', '2023-03-16 11:01:43', '2023-03-16 11:04:42'),
(71, '2023-03-20 00:00:00', 6, 12, 'Vina', 'Cafe1679275981773', 'diambil', 1800, 1800, 3600, 37800, 'dibayar', '2023-03-16 11:03:32', '2023-03-20 01:33:01'),
(72, '2023-03-20 00:00:00', 6, 13, 'Geladis', 'Cafe1679275995847', 'diambil', 2600, 2600, 5200, 54600, 'dibayar', '2023-03-20 01:20:38', '2023-03-20 01:33:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama_user` varchar(255) DEFAULT NULL,
  `role` enum('admin','kasir','manajer') DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `nama_user`, `role`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(5, 'Vidi', 'admin', 'admin', '202cb962ac59075b964b07152d234b70', '2023-02-12 06:47:45', '2023-02-12 06:47:45'),
(6, 'Nora', 'kasir', 'kasir', '81dc9bdb52d04dc20036dbd8313ed055', '2023-02-12 07:01:05', '2023-02-12 07:01:05'),
(7, 'Kanaya', 'manajer', 'manajer', '827ccb0eea8a706c4c34a16891f84e7b', '2023-02-12 07:01:24', '2023-02-12 07:01:24');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id_detail_transaksi`),
  ADD KEY `id_transaksi` (`id_transaksi`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indeks untuk tabel `meja`
--
ALTER TABLE `meja`
  ADD PRIMARY KEY (`id_meja`);

--
-- Indeks untuk tabel `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_meja` (`id_meja`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id_detail_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT untuk tabel `meja`
--
ALTER TABLE `meja`
  MODIFY `id_meja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`),
  ADD CONSTRAINT `detail_transaksi_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`);

--
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_meja`) REFERENCES `meja` (`id_meja`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
