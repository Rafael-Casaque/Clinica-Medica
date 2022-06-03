const urlUsada = "http://localhost:3000";

//eventos ajax

$("#pacientes>ul>li").eq(0).click((e) => {    
    e.preventDefault();
    $("#loading").show()
    $("header").hide()
    $.get(urlUsada + "/pacientes", (data) => {
        pacientes = data;
    }).done(() => {
        $("#loading").hide()
        $("header").show()
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
        success: function (res) {
            if (res.status == 201) {
                $("#loading").hide()
                $("header").show()
                $("input").val('')
                $("#modal-sucesso").show();                
                setTimeout(() => { $("#modal-sucesso").fadeOut("slow")}, 1500)
            }            
        }
    });
})

$("#medicos>ul>li").eq(0).click((e) => {
    e.preventDefault();
    $.get(urlUsada + "/medicos", (e) => {        
    })
});

$("#medicos>ul>li").eq(1).click((e) => {    
    $("form").hide()
    e.preventDefault();
    $("#loading").show()
    $("header").hide()
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
        success: function (res) {
            if (res.status == 201) {
                $("#loading").hide()
                $("header").show()
                $("input").val('')                
                $("#modal-sucesso").show();                
                setTimeout(() => { $("#modal-sucesso").fadeOut("slow")}, 1500)
            }            
        }
    });
})

$("#consulta").click((e)=>{
    let pacientes,medicos;
    e.preventDefault();
    $("#loading").show()
    $("header").hide()
    $("form").hide();        
    $.get(urlUsada + "/pacientes",(res)=>{
        pacientes = res;
    })
    $.get(urlUsada + "/medicos",(res)=>{
        medicos = res;
    }).done(() => {
        $("#loading").hide()
        $("header").show()            
        $("#consultaForm").show();    
        console.log(medicos)
        console.log(pacientes)        

        for (let i = 0; i < pacientes.length; i++) {
            $("#paciente").append($(`<option name="${pacientes[i].id}">${pacientes[i].nome}</option>`))                
        }
        for (let i = 0; i < medicos.length; i++) {
            $("#medico").append($(`<option name="${medicos[i].id}">${medicos[i].nome}</option>`))                
        }
    })
})

//eventos de hover e ocultamento

$("#consulta").click((e) => {
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
    e.preventDefault();    
    $("form").hide()
    $("#pacientesForm").show()
});

$(".close").click(() => {
    $("form").hide()    
});