getUsers();

function getUsers() {

    $.ajax({
        type: "GET",
        dataType: 'JSON',
        url: dir + "/Users",
        success: function(respuesta) {

            let tableData = $("#tableUsers");

            if (respuesta.count === 0) {
                tableData.append(

                    `<tr class="text-center table-info">
                        <td scope="row" colspan="5">NO HAY DATOS REGISTRADOS</td> 
                    </tr>`

                );
            } else {

                $.each(respuesta.users, function(index, elemento) {
                    tableData.append(

                        `<tr id=${elemento._id}>
                            <td scope="row">${index + 1}</td> 
                            <th> ${elemento.nombre} ${elemento.apePaterno} ${elemento.apeMaterno}</th> 
                            <td> ${elemento.email} </td> 
                            <td> ${elemento.role} </td> 
                            <td> 		
                                <button class="btn btn-warning UsersUpdate" id="${elemento._id}"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-danger  UsersDelete" id="${elemento._id}"><i class="fas fa-trash"></i></button>                    
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