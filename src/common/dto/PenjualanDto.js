class PenjualanDto {
  constructor(penjualan) {
    (this.PenjualanID = penjualan.PenjualanID),
      (this.TanggalPenjualan = penjualan.TanggalPenjualan),
      (this.TotalHarga = penjualan.TotalHarga),
      (this.PelangganID = penjualan.PelangganID);

    if (penjualan.Pelanggan) {
      this.Pelanggan = {
        PelangganID: penjualan.Pelanggan.PelangganID,
        NamaPelanggan: penjualan.Pelanggan.NamaPelanggan,
        Alamat: penjualan.Pelanggan.Alamat,
        NomorTelepon: penjualan.Pelanggan.NomorTelepon,
      };
    }
  }
}

module.exports = PenjualanDto;
