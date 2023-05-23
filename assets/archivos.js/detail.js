
const {createApp} = Vue
const app = createApp( {

    data(){
        return {
           info:[],
           busquedaId:null

        }

    },

    created(){
        
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
        .then(res => res.json())
        .then(data =>{
          this.info = data.events
          
        let parametros= new URLSearchParams(location.search)
        this.busquedaId= parseInt(parametros.get(`_id`))
        

        })
        .catch(error =>console.log(error))


    },

    computed:{
        filtrarPorId(){
            return this.info.filter(item => item._id=== this.busquedaId)
        }
    },

  

})
app.mount(`#app`)


// function imprimirCard (data,containerDetail){
// containerDetail.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
// <div class="row g-0">
//   <div>
//     <img class="col-12" src=${data.image} alt="${data.name}">
//   </div>
//   <div>
//     <div class="card-body">
//       <h5 class="card-title text-center">${data.name}</h5>
//       <div class="py-2">
//             <ul>
//                 <li class="list">Date: ${data.date}</li>
//                 <li class="list">Description: ${data.description}</li>
//                 <li class="list">Category: ${data.category}</li>
//                 <li class="list">Place: ${data.place}</li>
//                 <li class="list">Capacity: ${data.capacity}</li><li class="list">${data.assistance ? "Assistance" : "Estimate"}: ${data.assistance ? data.assistance :data.estimate}</li>
                
//                 <li class="list">Price: $${data.price}</li>
//             </ul>
//         </div>
//     </div>
//   </div>
// </div>
// </div>`
// }