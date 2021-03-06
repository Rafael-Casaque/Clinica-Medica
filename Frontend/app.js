const urlUsada = "http://localhost:3000";
var enderecoElemento;

$("#formEP>.btn-primary").on("click", (e) => {
    e.preventDefault();
    $("#loading").show()
    $("header").hide()
    const dados = {
        id: enderecoElemento.eq(0).attr("name"),
        nome: $("#eNomeP").val(),
        dataNascimento: $("#eDataNascimento").val()
    };
    $.ajax({
        url: urlUsada + '/pacientes',
        type: 'PUT',
        dataType: "json",
        data: dados,
        success: () => {
            $("#loading").hide()
            $("header").show()
            $("input").val('')
            $("#modal-sucesso").show();
            setTimeout(() => { $("#modal-sucesso").fadeOut("slow") }, 1500)
            $("body").css({ backgroundColor: "white" });
            $("#pacientes>ul>li").eq(0).trigger("click");
        }
    });
})

$("#formEM>.btn-primary").on("click", (e) => {
    e.preventDefault();
    $("#loading").show()
    $("header").hide()
    const dados = {
        id: enderecoElemento.eq(0).attr("name"),
        nome: $("#eNomeM").val(),
        idEspecialidade: $("#eEspecialidade>option:checked").attr("name")
    };
    $.ajax({
        url: urlUsada + '/medicos',
        type: 'PUT',
        dataType: "json",
        data: dados,
        success: () => {
            $("#loading").hide()
            $("header").show()
            $("input").val('')
            $("#modal-sucesso").show();
            setTimeout(() => { $("#modal-sucesso").fadeOut("slow") }, 1500)
            $("body").css({ backgroundColor: "white" });
            $("#medicos>ul>li").eq(0).trigger("click");
        }
    });
})

$("#pacientes>ul>li").eq(0).click((e) => {
    let pacientes;
    e.preventDefault();
    $("#medicosLista").hide()
    $("#loading").show()
    $("header").hide()
    $("form").hide()
    $.get(urlUsada + "/pacientes", (data) => {
        pacientes = data;
    }).done(() => {
        $("#loading").hide()
        $("header").show()
        $("#pacientesLista").show()
        $("#pacientesTabela>tbody>tr").remove()
        for (let i = 0; i < pacientes.length; i++) {
            $("#pacientesTabela>tbody").append(`<tr>
                <td name="${pacientes[i].id}">${pacientes[i].nome}</td>
                <td>${pacientes[i].dataNascimento}</td>
                <td>${pacientes[i].dataCadastro}</td>
                <td>
                    <button class="btn btn-success cons"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye m-lg-1" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>Ver consultas</button>
                    <button class="btn btn-primary edit"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil m-lg-1" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>Editar</button>
                    <button idpaciente="${pacientes[i].id}" class="btn btn-danger del"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash m-lg-1" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>Deletar</button>
                </td>
            </tr>`)
        }
        $("#pacientesTabela>tbody>tr>td>.cons").click((e) => {
            $("#consultasTabela>tbody>tr").remove();
            const elemento = $(e.target).parent().parent().children().eq(0);
            $("#verConsultas").show();
            $.get(urlUsada + "/consultas", (res) => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].idPaciente == elemento.attr("name")) {
                        $.get(urlUsada + "/medicos", (resM) => {
                            for (let j = 0; j < resM.length; j++) {
                                if (res[i].idMedico == resM[j].id) {
                                    $("#consultasTabela>tbody").append(`<tr><td name="${res[i].id}">${resM[j].nome}</td><td>${elemento.html()}</td><td>${res[i].data}</td><td><button class="btn btn-danger cancelarConsulta">Cancelar</button></td></tr>`)
                                }
                            }
                        })
                    }
                }
            }).done(() => {
                setTimeout(() => {
                    $(".cancelarConsulta").click((e) => {
                        $("#loading").show();
                        $("header").hide();
                        $.ajax({
                            url: urlUsada + '/consultas',
                            type: 'DELETE',
                            dataType: "json",
                            data: { id: $(e.target).parent().parent().children().attr("name") },
                            success: () => {
                                $("#loading").hide()
                                $("header").show()
                                $(e.target).parent().parent().remove()
                                $("#modal-sucesso").show();
                                setTimeout(() => { $("#modal-sucesso").fadeOut("slow") }, 1500)
                            }
                        })
                    })
                }, 500)
            })
        })

        $("#pacientesTabela>tbody>tr>td>.del").click((e) => {
            $("#loading").show();
            $("header").hide();
            $.ajax({
                url: urlUsada + '/pacientes',
                type: 'DELETE',
                dataType: "json",
                data: { id: $(e.target).attr("idpaciente") },
                success: (res) => {
                    if (res.status == 500) {
                        $("#loading").hide()
                        $("header").show()
                        $("#modal-error").show();
                        setTimeout(() => { $("#modal-error").fadeOut("slow") }, 1500)
                    }
                    else {
                        $(e.target).parent().parent().remove()
                        $("#loading").hide()
                        $("header").show()
                        $("#modal-sucesso").show();
                        setTimeout(() => { $("#modal-sucesso").fadeOut("slow") }, 1500)
                    }
                }
            })
        })

        $("#pacientesTabela>tbody>tr>td>.edit").click((e) => {
            const elemento = $(e.target).parent().parent().children();
            enderecoElemento = elemento;
            $("#eNomeP").val(elemento.eq(0).html());
            $("#eDataNascimento").val(elemento.eq(1).html());
            $("body").css({ backgroundColor: "#BDBDBD" });
            setTimeout(() => {
                $("#formEP").show();
            }, 100)
        })
    })
});

$("#pacientesForm>.btn-primary").click((e) => {
    e.preventDefault();
    $("#loading").show()
    $("header").hide()
    const dados = {
        nome: $("#nomeP").val(),
        dataNascimento: $("#dataNascimento").val()
    };
    $.ajax({
        url: urlUsada + '/pacientes',
        type: 'POST',
        dataType: "json",
        data: dados,
        success: () => {
            $("#loading").hide()
            $("header").show()
            $("input").val('')
            $("#modal-sucesso").show();
            setTimeout(() => { $("#modal-sucesso").fadeOut("slow") }, 1500)
        }
    });
})

$("#medicos>ul>li").eq(0).click((e) => {
    let medicos;
    let especialidades;
    e.preventDefault();
    $("#pacientesLista").hide()
    $("#loading").show()
    $("header").hide()
    $("form").hide()
    $.get(urlUsada + "/especialidades", (data) => {
        especialidades = data;
    })
    $.get(urlUsada + "/medicos", (data) => {
        medicos = data;
    }).done(() => {
        $("#loading").hide()
        $("header").show()
        $("#medicosTabela>tbody>tr").remove()
        for (let i = 0; i < medicos.length; i++) {
            $("#medicosTabela>tbody").append(`<tr>
                <td name="${medicos[i].id}">${medicos[i].nome}</td>
                <td>${medicos[i].dataCadastro}</td>                
                <td name="${medicos[i].idEspecialidade}">${especialidades[parseInt(medicos[i].idEspecialidade) - 1].nome}</td>
                <td>
                    <button class="btn btn-success cons"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye m-lg-1" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>Ver consultas</button>
                    <button class="btn btn-primary edit"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil m-lg-1" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>Editar</button>
                    <button idmedico="${medicos[i].id}" class="btn btn-danger del"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash m-lg-1" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>Deletar</button>
                </td>
            </tr>`)
        }
        $("#medicosLista").show()

        $("#medicosTabela>tbody>tr>td>.cons").click((e) => {
            $("#consultasTabela>tbody>tr").remove();
            const elemento = $(e.target).parent().parent().children().eq(0);
            $("#verConsultas").show();
            $.get(urlUsada + "/consultas", (res) => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].idMedico == elemento.attr("name")) {
                        $.get(urlUsada + "/pacientes", (resP) => {
                            for (let j = 0; j < resP.length; j++) {
                                if (res[i].idPaciente == resP[j].id) {
                                    $("#consultasTabela>tbody").append(`<tr><td name="${res[i].id}">${elemento.html()}</td><td>${resP[j].nome}</td><td>${res[i].data}</td><td><button class="btn btn-danger cancelarConsulta">Cancelar</button></td></tr>`)
                                }
                            }
                        })
                    }
                }
            }).done(() => {
                setTimeout(() => {
                    $(".cancelarConsulta").click((e) => {
                        $("#loading").show();
                        $("header").hide();
                        $.ajax({
                            url: urlUsada + '/consultas',
                            type: 'DELETE',
                            dataType: "json",
                            data: { id: $(e.target).parent().parent().children().attr("name") },
                            success: () => {
                                $("#loading").hide()
                                $("header").show()
                                $(e.target).parent().parent().remove()
                                $("#modal-sucesso").show();
                                setTimeout(() => { $("#modal-sucesso").fadeOut("slow") }, 1500)
                            }
                        })
                    })
                }, 500)
            })
        })

        $("#medicosTabela>tbody>tr>td>.del").click((e) => {
            $("#loading").show();
            $("header").hide();
            $.ajax({
                url: urlUsada + '/medicos',
                type: 'DELETE',
                dataType: "json",
                data: { id: $(e.target).attr("idmedico") },
                success: (res) => {
                    if (res.status == 500) {
                        $("#loading").hide()
                        $("header").show()
                        $("#modal-error").show();
                        setTimeout(() => { $("#modal-error").fadeOut("slow") }, 1500)
                    }
                    else {
                        $(e.target).parent().parent().remove()
                        $("#loading").hide()
                        $("header").show()
                        $("#modal-sucesso").show();
                        setTimeout(() => { $("#modal-sucesso").fadeOut("slow") }, 1500)
                    }
                }
            });
        })

        $("#medicosTabela>tbody>tr>td>.edit").click((e) => {
            const elemento = $(e.target).parent().parent().children();
            enderecoElemento = elemento;
            if ($("#eEspecialidade>option").length == 0) {
                $.get(urlUsada + "/especialidades", (res) => {
                    for (let i = 0; i < res.length; i++) {
                        $("#eEspecialidade").append($(`<option name="${res[i].id}">${res[i].nome}</option>`))
                    }
                }).done(() => {
                    $("#eNomeM").val(elemento.eq(0).html());
                    $("#loading").hide()
                    $("header").show()
                    setTimeout(() => {
                        $("#formEM").show();
                    }, 100)
                })
            }
            else {
                $("#eNomeM").val(elemento.eq(0).html());
                $("#loading").hide()
                $("header").show()
                setTimeout(() => {
                    $("#formEM").show();
                }, 100)
            }
            $("body").css({ backgroundColor: "#BDBDBD" });
        })
    })
});

$("#medicos>ul>li").eq(1).click((e) => {
    $("form").hide()
    e.preventDefault();
    $("#loading").show()
    $("header").hide()
    $("#medicosLista").hide()
    $("#pacientesLista").hide()
    $("#especialidade").remove("option")
    if ($("#especialidade>option").length == 0) {
        $.get(urlUsada + "/especialidades", (res) => {
            $("#medicosForm").show()
            for (let i = 0; i < res.length; i++) {
                $("#especialidade").append($(`<option name="${res[i].id}">${res[i].nome}</option>`))
            }
        }).done(() => {
            $("#loading").hide()
            $("header").show()
        })
    }
    else {
        $("#loading").hide()
        $("header").show()
        $("#medicosForm").show()
    }
});

$("#medicosForm>.btn-primary").click((e) => {
    e.preventDefault();
    $("#loading").show()
    $("header").hide()
    const dados = {
        nome: $("#nomeM").val(),
        idEspecialidade: $("#especialidade>option:checked").attr("name")
    }
    $.ajax({
        url: urlUsada + '/medicos',
        type: 'POST',
        dataType: "json",
        data: dados,
        success: () => {
            $("#loading").hide()
            $("header").show()
            $("input").val('')
            $("#modal-sucesso").show();
            setTimeout(() => { $("#modal-sucesso").fadeOut("slow") }, 1500)
        }
    });
})

$("#consulta").click((e) => {
    $("#pacientesLista").hide()
    let pacientes, medicos;
    e.preventDefault();
    $("#loading").show()
    $("header").hide()
    $("form").hide()
    $("#paciente>option").remove()
    $("#medico>option").remove()
    $.get(urlUsada + "/pacientes", (res) => {
        pacientes = res;
    })
    $.get(urlUsada + "/medicos", (res) => {
        medicos = res;
    }).done(() => {
        for (let i = 0; i < pacientes.length; i++) {
            $("#paciente").append($(`<option name="${pacientes[i].id}">${pacientes[i].nome}</option>`))
        }
        for (let i = 0; i < medicos.length; i++) {
            $("#medico").append($(`<option name="${medicos[i].id}">${medicos[i].nome}</option>`))
        }
        $("#loading").hide()
        $("header").show()
        $("#consultaForm").show();
    })
})

$("#consultaForm>.btn-primary").click((e) => {
    e.preventDefault();
    if (Date.parse($("#dataConsulta").val() + ' ' + $("#horaConsulta").val()) - Date.now() < 0) {
        $("#modal-error2").show();
        setTimeout(() => { $("#modal-error2").fadeOut("slow") }, 1500)
    }
    else {
        dataAtual = Date.now()
        console.log(dataAtual - $("#dataConsulta").val())        
        $("#loading").show()
        $("header").hide()
        const dados = {
            idPaciente: $("#paciente>option:checked").attr("name"),
            idMedico: $("#medico>option:checked").attr("name"),
            data: $("#dataConsulta").val() + ' ' + $("#horaConsulta").val()
        }
        $.ajax({
            url: urlUsada + '/consultas',
            type: 'POST',
            dataType: "json",
            data: dados,
            success: () => {
                $("#loading").hide()
                $("header").show()
                $("input").val('')
                $("#modal-sucesso").show();
                setTimeout(() => { $("#modal-sucesso").fadeOut("slow") }, 1500)
            }
        });
    }
});

//eventos de hover e ocultamento

var estado = false;

$("#menu").click((e) => {
    estado == false ? (
        $("#navbar-links").show(),
        estado = true
    ) : (
        $("#navbar-links").hide(),
        estado = false
    )
})

$("#formEM").hide();
$("#formEP").hide();
$("#verConsultas").hide();
$("#pacientesLista").hide()
$("#medicosLista").hide()

$("#consulta").click((e) => {
    $("#medicosLista").hide()
    $("#pacientesLista").hide()
    e.preventDefault();
});

$("#testee").show();

$("a").click((e) => {
    e.preventDefault();
})

$("#consultaForm").hide()

$("#pacientesForm").hide()

$("#medicosForm").hide()

$("aside").hide()

$(".opcoes").hide()

$("#loading").hide()

$("#pacientes").mouseover(() => {
    $(".opcoes").eq(0).show()
});

$("#pacientes").mouseout(() => {
    $(".opcoes").eq(0).hide()
});

$("#medicos").mouseover(() => {
    $(".opcoes").eq(1).show()
});

$("#medicos").mouseout(() => {
    $(".opcoes").eq(1).hide()
});

$("#pacientes>ul>li").eq(1).click((e) => {
    $("#pacientesLista").hide()
    $("#medicosLista").hide()
    e.preventDefault();
    $("form").hide()
    $("#pacientesForm").show()
});

$(".close").click(() => {
    $("form").hide()
    $("#pacientesLista").hide()
    $("#medicosLista").hide()
});

$(".closeC").click(() => {
    $("#verConsultas").hide();
    $("body").css({ backgroundColor: "white" });
});

$(".closeE").click(() => {
    $("#formEP").hide()
    $("#formEM").hide()
    $("body").css({ backgroundColor: "white" });
    $("#pacientes>ul>li").eq(0).trigger("click");
});

$(".closeEM").click(() => {
    $("#formEM").hide()
    $("body").css({ backgroundColor: "white" });
});