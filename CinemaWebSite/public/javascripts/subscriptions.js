$('.delete_button').click(function(e){
    var result = confirm("Are you sure you want to delete this member?");
    if(!result) {
        e.preventDefault();
    }
});
$('#ModalUpdateMemberForm').on('show.bs.modal',async function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var memberid = button.data('whatever') // Extract info from data-* attributes
    let data=await getData(memberid);
    var modal = $(this);
    modal.find('.modal-body #Name').val(data.Name);
  
    modal.find('.modal-body #City').val(data.City);
    modal.find('.modal-body #Email').val(data.Email);
    modal.find('.modal-body #memberid').val(data.memberid);
  
  

  })
  
    async function getData(memberid)
  {
      let resp = await fetch("http://localhost:3000/subscriptions/searchMemberById/"+memberid);
      let data = await resp.json();
      return data;
  }
  async function reply_click(element)
  {
    let memberid=element.getAttribute('data-member-id');
    let resp = await fetch("http://localhost:3000/subscriptions/searchMoviesNameByMemberId/"+memberid);
   
    let data = await resp.json();

    let optionList = "";

    data.forEach(element => {
        optionList += "<option value="+element.movieid+">"+element.moviename+"</option>"

});

 $("select#moviename"+memberid).html(optionList);


  }    
  