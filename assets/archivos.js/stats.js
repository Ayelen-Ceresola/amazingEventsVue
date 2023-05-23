
const { createApp } = Vue
const app = createApp({

    data() {
        return {
            arrayEventos: [],
            eventosFiltradosPast: [],
            eventosFiltradosUp: [],
            asistencia: ``,
            asistenciaMenor: ``,
            eventoMayorCapacidad: ``,
            categoriasFiltradas: [],
            segundaTabla: ``,
            terceraTabla:``,


        }


    },

    created() {

        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
            .then(res => res.json())
            .then(data => {

                this.arrayEventos = data.events

                this.eventosFiltradosPast = this.arrayEventos.filter(evento => evento.date < data.currentDate)

                this.eventosFiltradosUp = this.arrayEventos.filter(evento => evento.date > data.currentDate)


                this.asistencia = this.mayorAcistencia(this.eventosFiltradosPast)
                this.asistenciaMenor = this.menorAcistencia(this.eventosFiltradosPast)
                this.eventoMayorCapacidad = this.mayorCapacidad(this.arrayEventos)

                this.categorias = this.arrayEventos.map(item => item.category)
                this.categoriasFiltradas = [...new Set(this.categorias)]

                this.segundaTabla = this.imprimirSegundaTabla(this.eventosFiltradosUp)
                this.terceraTabla= this.imprimirTerceraTabla(this.eventosFiltradosPast)


                console.log(this.segundaTabla)



            })
            .catch(error => console.log(error))

    },

    methods: {

        mayorAcistencia(eventosFiltradosPast) {
            let mayor = 0

            let mayorEvento

            for (let evento of eventosFiltradosPast) {
                let porcentaje = evento.assistance / evento.capacity * 100
                if (porcentaje > mayor) {
                    mayor = porcentaje
                    mayorEvento = evento
                }
            }
            return `${mayorEvento.name} ${mayor.toFixed(2)}%`
        },

        menorAcistencia(eventosFiltradosPast) {
            let menor = 0
            let menorEvento
            for (let evento of eventosFiltradosPast) {
                let porcentaje = evento.assistance / evento.capacity * 100
                if (menor == 0 || porcentaje < menor) {
                    menor = porcentaje
                    menorEvento = evento
                }
            }
            return `${menorEvento.name} ${menor.toFixed(2)}%`
        },

        mayorCapacidad(eventos) {
            let mayor = 0
            let mayorCapacidad
            for (let evento of eventos) {
                let capacidad = evento.capacity
                if (capacidad > mayor) {
                    mayor = capacidad
                    mayorCapacidad = evento
                }
            }
            return `${mayorCapacidad.name} ${mayorCapacidad.capacity.toLocaleString()}`
        },
        imprimirSegundaTabla(eventos) {
            let informacionUp = []

            let categoriasUp = Array.from(new Set(eventos.map(item => item.category)))

            let revenueUp = []
            for (let categoria of categoriasUp) {
                let auxiliar = 0
                for (let evento of eventos) {
                    if (evento.category == categoria) {
                        auxiliar += evento.estimate * evento.price
                    }
                }
                revenueUp.push(auxiliar)
                console.log(revenueUp)
            }

            let asistanceUp = []
            for (let categoria of categoriasUp) {
                let estimado = 0
                let capacidad = 0
                for (let evento of eventos) {
                    if (evento.category == categoria) {
                        estimado += evento.estimate
                        capacidad += evento.capacity

                    }
                }
                asistanceUp.push(estimado * 100 / capacidad)
            }
            informacionUp.push(categoriasUp, revenueUp, asistanceUp)

            let template = ``
            for (let i = 0; i < informacionUp[0].length; i++) {

                template += `
                <tr>
                    <td>${informacionUp[0][i]}</td>
                    <td>${informacionUp[1][i].toLocaleString()}</td>
                    <td>${informacionUp[2][i].toFixed(2)}%</td>
                </tr>`

            }
            return template

        },

        imprimirTerceraTabla(eventos) {
            let informacionPa = []

            let categoriasPa = Array.from(new Set(eventos.map(item => item.category)))

            let revenuePa = []
            for (let categoria of categoriasPa) {
                let auxiliar = 0
                for (let evento of eventos) {
                    if (evento.category == categoria) {
                        auxiliar += evento.assistance * evento.price
                    }
                }
                revenuePa.push(auxiliar)
                console.log(revenuePa)
            }

            let asistancePa = []
            for (let categoria of categoriasPa) {
                let asistencia = 0
                let capacidad = 0
                for (let evento of eventos) {
                    if (evento.category == categoria) {
                        asistencia += evento.assistance
                        capacidad += evento.capacity

                    }
                }
                asistancePa.push(asistencia * 100 / capacidad)
            }
            informacionPa.push(categoriasPa, revenuePa, asistancePa)

            let template = ``
            for (let i = 0; i < informacionPa[0].length; i++) {

                template += `
                <tr>
                    <td>${informacionPa[0][i]}</td>
                    <td>${informacionPa[1][i].toLocaleString()}</td>
                    <td>${informacionPa[2][i].toFixed(2)}%</td>
                </tr>`

            }
            return template

        },
    },


})
app.mount(`#app`)
