var Reserva = function (
  horario,
  cantidadDePersonas,
  precioPorPersona,
  codigoDeDescuento
) {
  this.horario = horario;
  this.cantidadDePersonas = cantidadDePersonas;
  this.precioPorPersona = precioPorPersona;
  this.codigoDeDescuento = codigoDeDescuento;
};

Reserva.prototype.precioBase = function () {
  return this.cantidadDePersonas * this.precioPorPersona;
};

Reserva.prototype.precioFinal = function () {
  var precioBase = this.precioBase();
  var adicionales = this.adicionales(precioBase);
  var descuentos = this.descuentos(precioBase);
  return precioBase + adicionales - descuentos;
};

Reserva.prototype.adicionales = function (calculoBase) {
  return (
    this.adicionalFinDeSemana(calculoBase) +
    this.adicionalHorarioDelDia(calculoBase)
  );
};

Reserva.prototype.adicionalFinDeSemana = function (base) {
  var diaDeSemana = this.horario.getUTCDate();

  if (diaDeSemana === 0 || diaDeSemana === 5 || diaDeSemana === 6) {
    return (base * 10) / 100;
  }
  return 0;
};

Reserva.prototype.adicionalHorarioDelDia = function (base) {
  var minutos = this.horario.getHours() * 60 + this.horario.getMinutes();

  if (
    (minutos >= 780 && minutos < 840) ||
    (minutos >= 1200 && minutos < 1260)
  ) {
    return (base * 5) / 100;
  }
  return 0;
};

Reserva.prototype.descuentos = function (calculoBase) {
  return (
    this.descuentosPorGrupo(calculoBase) + this.descuentosPorCodigo(calculoBase)
  );
};

Reserva.prototype.descuentosPorGrupo = function (base) {
  var descuentoGrupal = 0;

  if (this.cantidadDePersonas >= 4 && this.cantidadDePersonas < 6) {
    descuentoGrupal = 5;
  } else if (this.cantidadDePersonas >= 6 && this.cantidadDePersonas < 8) {
    descuentoGrupal = 10;
  } else if (this.cantidadDePersonas >= 8) {
    descuentoGrupal = 15;
  }
  return (base * descuentoGrupal) / 100;
};

Reserva.prototype.descuentosPorCodigo = function (base) {
  var descuento = 0;

  if (this.codigoDeDescuento === "DES15") {
    descuento = (base * 15) / 100;
  } else if (this.codigoDeDescuento === "DES200") {
    descuento = 200;
  } else if (this.codigoDeDescuento === "DES1") {
    descuento = this.precioPorPersona;
  }
  return descuento;
};

var ListaDeReservas = [
  new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1"),
  new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200"),
];
