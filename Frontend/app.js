$(".opcoes").hide()

$("#pacientes").mouseover(()=>{
    $(".opcoes").eq(0).show()
    console.log(111)
});

$("#pacientes").mouseout(()=>{
    $(".opcoes").eq(0).hide()
    console.log(111)
});

$("#medicos").mouseover(()=>{
    $(".opcoes").eq(1).show()
    console.log(111)
});

$("#medicos").mouseout(()=>{
    $(".opcoes").eq(1).hide()
    console.log(111)
});

$("#pacientes").click(()=>{

});

$("#medicos").click(()=>{

});

$("#consultas").click(()=>{

});