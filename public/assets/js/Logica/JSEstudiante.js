const dir = "http://localhost:8000";

$("#btnRegStudents").click(function(e) {

    let postStudents = {
        nombre: $('#inputnomStudents').val(),
        apeMaterno: $('#inputmatStudents').val(),
        apePaterno: $('#inputpatStudents').val(),
        grado: $('select[name = inputgrupStudents]').val(),
        img: $('#FileStudents').val()
    };

    $.post(dir + "/students", postStudents, function(respuesta) {
        if (respuesta.ok) {
            console.log(respuesta);

        } else {

        }
        e.preventDefault();
    });
});


getStudents();

function getStudents() {

    $.ajax({
        type: "GET",
        dataType: 'JSON',
        url: dir + "/students",
        success: function(respuesta) {

            let tableStudens = $("#tableStudents");

            if (respuesta.count === 0) {
                tableStudens.append(

                    `<tr class="text-center table-info">
                        <td scope="row" colspan="4">NO HAY DATOS REGISTRADOS</td> 
                    </tr>`

                );
            } else {

                $.each(respuesta.users, function(index, elemento) {
                    tableStudens.append(

                        `<tr id=${elemento._id}>
                            <td scope="row">${index + 1}</td> 
                            <th> ${elemento.nombre} ${elemento.apePaterno} ${elemento.apeMaterno}</th> 
                            <td> ${elemento.grado} </td> 
                             <td> 		
                                <button class="btn btn-warning StudentsUpdate" id="${elemento._id}"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-danger  StudentsDelete" id="${elemento._id}"><i class="fas fa-trash"></i></button>                    
                            </td> 
                        </tr>`
                    );
                });

            }
        },
        error: function() {
            console.log("No se ha podido obtener la información", respuesta);
        }
    });

}

$(document).on("click", ".StudentsDelete", function() {
    var id = $(this).attr("id");
    console.log(id);
});



$(document).on("click", ".StudentsUpdate", function() {
    var id = $(this).attr("id");
    console.log('update' + id);
});