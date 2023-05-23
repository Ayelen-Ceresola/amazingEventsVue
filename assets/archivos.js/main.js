

const {createApp} = Vue
const app = createApp( {

    data(){
        return {
            arrayEventos: [],
            inputSearch:``,
            arrayCategory:[],
            chequeados:[],
            eventosFiltrados:[],


        }


    },

    created(){
        
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
        .then(res => res.json())
        .then(data =>{
            this.arrayEventos = data.events
            console.log (this.arrayEventos)

            const category = this.arrayEventos.map (box => box.category)
            let setInfo = Array.from(new Set (category))
            this.arrayCategory= setInfo
            


        })
        .catch(error =>console.log(error))


    },

    methods:{

    },

    computed:{

            filtro (){
                this.eventosFiltrados= this.arrayEventos.filter(item =>item.name.toLowerCase().includes(this.inputSearch.toLowerCase())
                && (this.chequeados.includes(item.category)|| this.chequeados.length ==0))

            }



    },


})
app.mount(`#app`)