

$('#ModalUpdateUserForm').on('show.bs.modal',async function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var userId = button.data('whatever') // Extract info from data-* attributes

  let data=await getData(userId);
  console.log(data);
  var modal = $(this);
  modal.find('.modal-body #username').val(data.username);
  if(data.isAdmin){
    modal.find('.modal-body #sessiontime').val("Unlimited");
    document.getElementById("sessiontime").disabled =true ;
  }
  else{
    modal.find('.modal-body #sessiontime').val(data.sessionTimeOut);
    document.getElementById("sessiontime").disabled =false ;
  
  }
  
  const fullname = data.fullname.split(' ');

  modal.find('.modal-body #fname').val(fullname[0]);
  modal.find('.modal-body #lname').val(fullname[1]);
  modal.find('.modal-body #email').val(data.email);
  let datetime=moment(data.CreatedDate).format("dddd, MMMM Do YYYY, h:mm:ss a");//convert from ISO format using momentjs
  modal.find('.modal-body #createDate').val(datetime);
  modal.find('.modal-body #createddate').val(data.CreatedDate);//save CreatedDate in server side  in ISO format
  modal.find('.modal-body #userid').val(data.userid);
  modal.find('.modal-body #isAdmin').val(data.isAdmin);

const select = document.getElementById('permissions')
const selectValues = data.permissions;
/* Iterate options of select element */
for (const option of document.querySelectorAll('#permissions option')) {
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

  async function getData(userId)
{
    let resp = await fetch("http://localhost:3000/users/updateUser/"+userId);
    let data = await resp.json();
    return data;
}


    function displayCreatedDate() {
        var T = document.getElementById("concealedCreatedDate");
        T.style.display = "block";  // <-- Set it to block
    }
    function displaySessiontime() {
      var T = document.getElementById("sessiontime");
      T.style.display = "block";  // <-- Set it to block
  }
    

  $('.delete_button').click(function(e){
      var result = confirm("Are you sure you want to delete this user?");
      if(!result) {
          e.preventDefault();
      }
  });
