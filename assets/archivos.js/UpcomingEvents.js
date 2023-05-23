const {createApp} = Vue
const app = createApp( {

    data(){
        return {
            arrayEventos: [],
            inputSearch:``,
            eventosFiltradosUp:[],
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
            

            this.eventosFiltradosUp = this.arrayEventos.filter(evento => evento.date < data.currentDate)
            
            
            const category = this.arrayEventos.map (box => box.category)
            let setInfo = Array.from(new Set (category))
            this.arrayCategory= setInfo
            
            



        })
        .catch(error =>console.error(error))


    },

    methods:{


    },

    computed:{

        filtro (){
            this.eventosFiltrados= this.eventosFiltradosUp.filter(item =>item.name.toLowerCase().includes(this.inputSearch.toLowerCase())
            && (this.chequeados.includes(item.category)|| this.chequeados.length ==0))

        } 
        
            

        

    },


})
app.mount(`#app`)