var expect = chai.expect;

//Testea la funcion reservar horario
describe('Testeando la funcion reservar horario', function () {
    it('Cuando se reserva un horario se elimina del arreglo', function () {

        var testHorarios = listado.restaurantes[0];
        testHorarios.reservarHorario('13:00');

        expect(testHorarios.horarios[0]).to.equal('15:30');
        expect(testHorarios.horarios[1]).to.equal('18:00');
        expect(testHorarios.horarios.length).to.equal(2);
    })

    it('Cuando un restaurant no posee un horario el arreglo se mantiene igual', function () {
        var testHorarios = listado.restaurantes[1];
        testHorarios.reservarHorario('14:00');

        expect(testHorarios.horarios[0]).to.equal('12:30');
        expect(testHorarios.horarios[1]).to.equal('14:30');
        expect(testHorarios.horarios[2]).to.equal('15:00');
        expect(testHorarios.horarios.length).to.equal(3);
    })

    it('Cuando se intenta reservar un horario pero no se le pasa ningun parametro el arreglo se mantiene igual', function () {
        var testHorarios = listado.restaurantes[2];
        testHorarios.reservarHorario('');

        expect(testHorarios.horarios[0]).to.equal('11:30');
        expect(testHorarios.horarios[1]).to.equal('12:00');
        expect(testHorarios.horarios[2]).to.equal('22:30');
        expect(testHorarios.horarios.length).to.equal(3);
    })
})

//Testea la funcion obtener puntuacion
describe('Testeando la funcion obtener puntuacion', function () {
    it('Dado un restaurant con determinadas calificaciones, la puntuacion se calcula correctamente', function () {
        var testPuntuacion = listado.restaurantes[0];

        expect(testPuntuacion.calificaciones).eql([6, 7, 9, 10, 5]);
        expect(testPuntuacion.calificaciones.length).to.equal(5);
        expect(testPuntuacion.obtenerPuntuacion()).to.equal(7.4);
    })

    it('Dado un restaurant que no tiene calificacion, la puntuacion es igual a 0', function () {
        var testPuntuacion = listado.restaurantes[0];
        for (i = testPuntuacion.calificaciones.length; i > 0; i--) {
            testPuntuacion.calificaciones.pop();
        }

        expect(testPuntuacion.calificaciones).to.eql([]);
        expect(testPuntuacion.obtenerPuntuacion()).to.equal(0);
    })
})

//Testea la funcion calificar
describe('Testeando la funcion calificar', function () {
    it('Verificar que sea un numero', function () {
        var testCalificar = listado.restaurantes[0];
        for (i = testCalificar.calificaciones.length; i > 0; i--)

            expect(testCalificar.calificaciones[i]).to.be.a('number');
    })

    it('Verificar que no se ingrese un numero negativo', function () {
        var testCalificar = listado.restaurantes[0];
        for (i = testCalificar.calificaciones.length; i > 0; i--)

            expect(testCalificar.calificaciones[i]).to.be.above(0);
    })

    it('Verificar que no se ingrese un numero mayor a 10', function () {
        var testCalificar = listado.restaurantes[0];
        for (i = testCalificar.calificaciones.length; i > 0; i--)

            expect(testCalificar.calificaciones[i]).to.be.below(11);
    })
})

//Testea la funcion buscar restaurante
describe('Testeando la funcion buscar restaurante por id', function () {
    it('Verificar que el id de un restaurante corresponda con su nombre', function () {
        var buscarRestaurante = listado.restaurantes[0].id;

        expect(buscarRestaurante).to.equal(1);
    })
})

//Testea la funcion obtener restaurantes
describe('Testeando la funcion obtener restaurantes', function () {
    it('Debe obtener un restaurante segun los filtro recibidos', function () {
       var restauranteFiltrado = listado.obtenerRestaurantes('Hamburguesa', 'París', '12:00');

        expect(restauranteFiltrado[0].nombre).to.eql('Frogburguer');
    })
})

//Testeando la funcionalidad de reserva
describe('Testeando los precios base y final de la funcion reserva', function () {
    it('El restaurante calcula el precio base correctamente', function () {

        expect(ListaDeReservas[0].precioBase()).to.equal(2800);
    })

    it('El restaurante calcula el precio final correctamente', function () {
        
        expect(ListaDeReservas[1].precioFinal()).to.equal(100);
    })
})
