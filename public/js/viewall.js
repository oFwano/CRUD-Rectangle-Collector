function displayAll(data){
    $('.Rectangle-table').empty();
    $('<tr>').append('<th>Unique ID</th><th>Width</th><th>Height</th><th>Colour</th><th>Name</th>').appendTo('.Rectangle-table')
    data.forEach(d => {
        $('<tr>')
            .append('<td>'+d._id+'</td><td>'+d.width+'</td><td>'+d.height+'</td><td>'+d.colour+'</td><td>'+d.name+'</td>')
            .appendTo('.Rectangle-table');
    });
}

document.addEventListener("DOMContentLoaded", function(){
    $.ajax({
        method: 'post',
        url: '/viewAll',
        data: 123,
        success: displayAll
    });
});