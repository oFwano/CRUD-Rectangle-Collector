function drawInfo(data){
    $('.Rectangle-info').empty();
    $('<tr>').append('<th>Unique ID</th><th>Width</th><th>Height</th><th>Colour</th><th>Name</th>').appendTo('.Rectangle-info')
    data.forEach(d => {
        $('<tr>')
            .append('<td>'+d._id+'</td><td>'+d.width+'</td><td>'+d.height+'</td><td>'+d.colour+'</td><td>'+d.name+'</td>')
            .appendTo('.Rectangle-info');
    });
}

function findOne(id){
    $.ajax({
        method: 'post',
        url: '/viewOne',
        data: 'id='+id,
        success: drawInfo
    });
}


function drawAll(data){
    $('.Rectangle-ul').empty();
    //$('<tr>').append('<th>Unique ID</th><th>Width</th><th>Height</th><th>Colour</th><th>Name</th>').appendTo('.Rectangle-ul')

    data.forEach(d => {
        let html = '<div class="Rectangle-draw"'+ 'onclick=findOne('+d._id +') style="width:'+d.width+'px; height:'+d.height+'px;'+'background:'+d.colour + ';line-height:'+d.height + 'px;">'+'UID: '+ d._id+ '</div>'
        $('<li>')
            .append(html)
            .appendTo('.Rectangle-ul');
    });
}

document.addEventListener("DOMContentLoaded", function(){
    $.ajax({
        method: 'post',
        url: '/viewAll',
        data: 123,
        success: drawAll
    });
});
