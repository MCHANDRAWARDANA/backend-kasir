class pelangganDto {
  constructor(pelanggan) {
    (this.PelangganID = pelanggan.PelangganID),
      (this.UserName = pelanggan.UserName),
      (this.Email = pelanggan.Email),
      (this.Password = pelanggan.Password);
      (this.Role = pelanggan.Role)
  }
}

module.exports = pelangganDto;
