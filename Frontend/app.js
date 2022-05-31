var medicos, pacietes, consultas, especialidades;
const urlUsada = "http://localhost:3000";
//operações :hover

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

//operações ajax

$("#pacientes>ul>li").eq(0).click((e) => {
    e.preventDefault();
    $("#loading").show()
    $("header").hide()
    $.get(urlUsada + "/medicos", (data) => {
        if(data==undefined) console.log(1)
        console.log(data);
    }).done(()=>{
        $("#loading").hide()
        $("header").show()
    })    
});

$("#pacientes>ul>li").eq(1).click((e) => {
    e.preventDefault();
});

$("#medicos>ul>li").eq(0).click((e) => {
    e.preventDefault();
    $.get(urlUsada + "/medicos", (e) => {
        console.log(e);
    })
});

$("#medicos>ul>li").eq(1).click((e) => {
    e.preventDefault();
});

$("#consulta").click((e) => {
    e.preventDefault();
});