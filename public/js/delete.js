
function deleteRectFormSubmit(){
    let form = document.getElementsByName("deleteRectForm")[0].elements;
    for (let i = 0, f; f = form[i++];) {
        if (f.value === ""){
            return;
        }
    }

    $.ajax({
        method: 'post',
        url: '/deleteRect',
        data: '&_id='+$('#uid').val(), // fname='bobby'&lname='chan'&pid='8'
    });
}