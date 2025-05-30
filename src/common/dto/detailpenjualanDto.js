class detailpenjualanDto {
  constructor(detail) {
    (this.DetailID = detail.DetailID),
      (this.PenjualanID = detail.PenjualanID),
      (this.ProdukID = detail.ProdukID),
      (this.JumlahProduk = detail.JumlahProduk),
      (this.SubTotal = detail.SubTotal);
  }
}

module.exports = detailpenjualanDto;
