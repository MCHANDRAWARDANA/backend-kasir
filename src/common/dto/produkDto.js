// dto/produk.dto.js

class ProdukDto {
  constructor(produk) {
    this.ProdukID = produk.ProdukID;
    this.NamaProduk = produk.NamaProduk;
    this.Harga = parseFloat(produk.Harga);
    this.HargaModal = produk.HargaModal ? parseFloat(produk.HargaModal) : 0;
    this.Diskon = produk.Diskon ? parseFloat(produk.Diskon) : 0;
    this.Stok = produk.Stok;
    this.Foto = produk.Foto;
    this.kategoriID = produk.kategoriID;

    // hargaAkhir sudah didefinisikan sebagai virtual field pada model
    this.hargaAkhir = parseFloat(produk.hargaAkhir);

    // Menghitung keuntungan: harga akhir setelah diskon dikurangi harga modal
    this.Keuntungan = this.hargaAkhir - this.HargaModal;
  }
}

module.exports = ProdukDto;