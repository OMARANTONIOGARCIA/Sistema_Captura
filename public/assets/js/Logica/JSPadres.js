getParents();

function getParents() {

    $.ajax({
        type: "GET",
        dataType: 'JSON',
        url: dir + "/parents",
        success: function(respuesta) {

            let tableParents = $("#tableParents");
            if (respuesta.count === 0) {
                tableParents.append(

                    `<tr class="text-center table-info">
                        <td scope="row" colspan="4">NO HAY DATOS REGISTRADOS</td> 
                    </tr>`
                );

            } else {
                $.each(respuesta.parents, function(index, elemento) {
                    tableParents.append(

                        `<tr id=${elemento._id}>
                            <td scope="row">${index + 1}</td> 
                            <th> ${elemento.nombre} ${elemento.apePaterno} ${elemento.apeMaterno}</th> 
                            <td> ${elemento.grado} </td> 
                            <td></td>
                            <td> 		
                                <button class="btn btn-warning ParentsUpdate" id="${elemento._id}"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-danger  ParentsDelete" id="${elemento._id}"><i class="fas fa-trash"></i></button>                    
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