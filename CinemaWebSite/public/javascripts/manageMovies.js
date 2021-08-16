$('.delete_button').click(function(e){
    var result = confirm("Are you sure you want to delete this movie?");
    if(!result) {
        e.preventDefault();
    }
});


$('#ModalUpdateMovieForm').on('show.bs.modal',async function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var movieid = button.data('whatever') // Extract info from data-* attributes
  let data=await getData(movieid);
  console.log(data);
  var modal = $(this);
  
  modal.find('.modal-body #Premiered').val(data.Premiered);
  modal.find('.modal-body #Image').val(data.Image);

  modal.find('.modal-body #Name').val(data.Name);
  modal.find('.modal-body #movieid').val(data._id);


const select = document.getElementById('Genres')
const selectValues = data.Genres;
/* Iterate options of select element */
for (const option of document.querySelectorAll('#Genres option')) {
  /* If option value contained in values, set selected attribute */
  if (selectValues.indexOf(option.value) !== -1) {
    option.setAttribute('selected', 'selected');
  }
  /* Otherwise ensure no selected attribute on option */
  else {
    option.removeAttribute('selected');
  }
}
})

  async function getData(movieid)
{
    let resp = await fetch("http://localhost:3000/movies/updateMovie/"+movieid);
    let data = await resp.json();
    return data;
}
