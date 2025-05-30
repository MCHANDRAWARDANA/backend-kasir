class registrasiDto {
  constructor(registrasi) {
    (this.RegistrasiID = registrasi.RegistrasiID),
      (this.UserName = registrasi.UserName),
      (this.Email = registrasi.Email),
      (this.Password = registrasi.Password);
    this.Role = registrasi.Role;
    this.AccessToken = registrasi.AccessToken;
  }
}

module.exports = registrasiDto;
