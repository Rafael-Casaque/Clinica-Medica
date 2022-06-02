var medicos, pacientes, consultas, especialidades;
const urlUsada = "http://localhost:3000";
//operações :hover

$("#testee").show();

$("a").click((e) => {
    e.preventDefault();
})

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

$(".close").click(() => {
    $("#pacientesForm").hide()
    $("#medicosForm").hide()
});

//operações ajax

$("#pacientes>ul>li").eq(0).click((e) => {
    e.preventDefault();
    $("#loading").show()
    $("header").hide()
    $.get(urlUsada, (data) => {
        pacientes = data;
    }).done(() => {
        $("#loading").hide()
        $("header").show()
    })
});

$("#pacientes>ul>li").eq(1).click((e) => {
    e.preventDefault();
    $("#pacientesForm").show()
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
        success: function (res) {
            if (res.status == 201) {
                $("#loading").hide()
                $("header").show()
                $("#nome").val(""),
                    $("#dataNascimento").val("")
                $("#modal-sucesso").show();                
                setTimeout(() => { $("#modal-sucesso").fadeOut("slow")}, 1500)
            }
            else {
                alert(1)
            }
        },
        done: function (data) {
            console.log(data);
        },
        fail: function (jqXHR, textStatus, errorThrown) {
            // Informe aqui que a conexão caiu ou que houve algum problema
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
})

$("#medicos>ul>li").eq(0).click((e) => {
    e.preventDefault();
    $.get(urlUsada + "/medicos", (e) => {
        console.log(e);
    })
});

$("#medicos>ul>li").eq(1).click((e) => {
    e.preventDefault();
    $("#loading").show()
    $("header").hide()
    $("#especialidade").remove("option")
    if ($("#especialidade>option").length == 0) {
        $.get(urlUsada + "/especialidades", (res) => {
            $("#medicosForm").show()
            for (let i = 0; i < res.length; i++) {
                $("#especialidade").append($(`<option name="${res[i].id}">${res[i].nome}</option>`))
                console.log(res[i].id)
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

$("#consulta").click((e) => {
    e.preventDefault();
});