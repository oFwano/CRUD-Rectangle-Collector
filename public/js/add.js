function formSubmitSuccess(data){
    //refreshes the page
    return true;
}

function createRectFormSubmit(){
    let form = document.getElementsByName("createRectForm")[0].elements;
    for (let i = 0, f; f = form[i++];) {
        if (f.value === ""){
            return;
        }
    }

    $.ajax({
        method: 'post',
        url: '/createRect',
        data: 'width='+$('#width').val()+'&height='+$('#height').val()+'&colour='+$('#colour').val()+'&name='+$('#name').val()+'&_id='+$('#uid').val(), // fname='bobby'&lname='chan'&pid='8'
        success: formSubmitSuccess
    });
}

