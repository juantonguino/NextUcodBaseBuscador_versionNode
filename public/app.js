//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})
var slider = $("#rangoPrecio").data("ionRangeSlider");

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()
let renderArray=(data)=>{
  $('.lista').text('');
  data.forEach(element => {
    text =`<!-- Property-->
    <div class="card horizontal">
      <div class="card-image">
        <img src="img/home.jpg">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <div>
            <b>Direccion: </b><p>`+element.Direccion+`</p>
          </div>
          <div>
            <b>Ciudad: </b><p>`+element.Ciudad+`</p>
          </div>
          <div>
            <b>Telefono: </b><p>`+element.Telefono+`</p>
          </div>
          <div>
            <b>Código postal: </b><p>`+element.Codigo_Postal+`</p>
          </div>
          <div>
            <b>Precio: </b><p>`+element.Precio+`</p>
          </div>
          <div>
            <b>Tipo: </b><p>`+element.Tipo+`</p>
          </div>
        </div>
        <div class="card-action right-align">
          <a href="#">Ver más</a>
        </div>
      </div>
    </div>
    <!---->`
    $('.lista').append(text);
  });
}

$('#buscar').on('click', (e)=>{
  if(this.customSearch==true){
    $.ajax(
      {
        type:'GET',
        url:'/api/data',
        success: function(data){
          renderArray(data)
         }
      }
   );
  }
  else{
    from= slider.result.from
    to=slider.result.to
    ciudad= $('#ciudad').val();
    tipo=$('#tipo').val()
    console.log(ciudad)
    $.ajax({
      type:'GET',
      url:'/api/process/'+ciudad+'/'+tipo+'/'+from+'/'+to,
      success:(data)=>{
        renderArray(data)
      }
    });
  }
})

$(document).ready(function() {
  $('select').material_select();
  $('select').on('contentChanged', function() {
    $(this).material_select();
  });

  $.ajax(
    {
      type:'GET',
      url:'/api/city',
      success: function(data){
        data.forEach(element => {
          $newOpt = $("<option>").attr("value",element).text(element)
          $('#ciudad').append($newOpt);
          $("#ciudad").trigger('contentChanged');
        });
       }
    }
  );
  $.ajax(
  {
    type:'GET',
    url:'/api/type',
    success: function(data){
      data.forEach(element => {
        $newOpt = $("<option>").attr("value",element).text(element)
        $('#tipo').append($newOpt);
        $("#tipo").trigger('contentChanged');
      });
     }
  }
  );
});


