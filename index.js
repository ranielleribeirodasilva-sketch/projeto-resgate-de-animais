var dados = []

function ApagaRegistro(id) {
    let _confirm = confirm("Deseja realmente excluir este registro?")

    if (_confirm) {
        for (let i = 0; i < dados.length; i++) {
            if (dados[i].ID == id) {
                dados.splice(i, 1)
            }
        }
        PopulaTabela()
    }
}

function EditaRegistro(id) {
    $("#modalRegistro").modal("show")

    dados.forEach(function (item) {
        if (item.ID == id) {
            $("#hdID").val(item.ID)
            $("#txtAnimal").val(item.Animal)
            $("#txtEspecie").val(item.Especie)
            $("#txtDtResgate").val(item.DtResgate.substr(6, 4) + "-" + item.DtResgate.substr(3, 2) + "-" + item.DtResgate.substr(0, 2))
            $("#txtSexo").val(item.Sexo)
        }
    })
}

function PopulaTabela() {                   //Função que carrega os dados cadastrados na tabela, exibindo-os na tela. 
    if (Array.isArray(dados)) {             // Verifica se é array
        localStorage.setItem("_dados_", JSON.stringify(dados)) //Converte todos os dados do array em string (stringify) 
                                                               // e armazena no localStorage(setItem).
                                                               //Então todos os dados do array foram guardados 
                                                               // no localStorage (cookies) em formatode texto.

        $("#tblDados tbody").html("")                //Limpa linhas antigas da tabela

        dados.forEach(function (item) {              //Faz um loop, faz uma varredura em todo o array passando por todos os indices.
            //TEMPLATE STRING                        //de acordo com cada indice encontrado ele vai criando linhas para exibição dos registros. 
            $("#tblDados tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.Animal}</td>
                <td>${item.Especie}</td>
                <td>${item.DtResgate}</td>
                <td>${item.Sexo}</td>
                <td><button type="button" class="btn btn-primary" onclick="javascript:EditaRegistro(${item.ID})"><i class="fa fa-edit" /></button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.ID});"><i class="fa fa-trash" /></button></td>
                
            </tr>`)
        })
    }
}

$(function () {
    //EXECUTA AO CARREGAR DA TELA
    dados = JSON.parse(localStorage.getItem("_dados_")) // getItem - Faz a leitura do localStorage (buscando os dados).
                                                        // JSON.parse - Converte esses dados que estão no formato string para o formato
                                                        // original que estava antes no array.                                                        

    if (dados != null){
        PopulaTabela()
    }else{
        dados= []
    }

    if (dados) {    // Verifica se possui algum registro dentro do "array dados", se tiver, então é verdadeiro, ele popula a tabela)
        PopulaTabela()
    }
    $("#btnSalvar").click(function () {
        //EVENTO CLICK DO BOTÃO SALVAR
        
        let _id = $("#hdID").val()
        let Animal = $("#txtAnimal").val()
        let Especie = $("#txtEspecie").val()
        let DtResgate = new Date($("#txtDtResgate").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
        let Sexo = $("#txtSexo").val()

        if (dados.length == null) {
                registro.ID = "1"
        }

        if (!_id || _id == "0") {

            let registro = {}

            registro.Animal = Animal
            registro.Especie = Especie
            registro.DtResgate = DtResgate
            registro.Sexo = Sexo

            registro.ID = dados.length + 1
            dados.push(registro)
        } else {
            dados.forEach(function (item) {
                if (item.ID == _id) {
                    item.Animal = Animal
                    item.Especie = Especie
                    item.DtResgate = DtResgate
                    item.Sexo = Sexo
                }
            })
        }

        alert("Registro salvo com sucesso!")
        $("#modalRegistro").modal("hide")

        //LIMPEZA DOS CAMPOS
        $("#hdID").val("0")
        $("#txtAnimal").val("")
        $("#txtEspecie").val("")
        $("#txtDtResgate").val("")
        $("#txtSexo").val("")

        PopulaTabela()

    })

})
