function updateSubmitSuccess(data){
    //refreshes the page
    return true;
}

function updateRectFormSubmit(){
    let form = document.getElementsByName("updateRectForm")[0].elements;
    for (let i = 0, f; f = form[i++];) {
        if (f.value === ""){
            return;
        }
    }

    $.ajax({
        method: 'post',
        url: '/updateRect',
        data: 'width='+$('#width').val()+'&height='+$('#height').val()+'&colour='+$('#colour').val()+'&name='+$('#name').val()+'&_id='+$('#uid').val(), // fname='bobby'&lname='chan'&pid='8'
        success: updateSubmitSuccess
    });
}

