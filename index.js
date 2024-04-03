let participantes = [
    {
      nome: "Mayk Brito",
      email: "mayk@gmail.com",
      dataInscrição: new Date(2024, 4, 24, 19, 20),
      dataCheckin: null
  },
  {
      nome: "Diego Fernandes",
      email: "Diego@gmail.com",
      dataInscrição: new Date(2024, 2, 22, 19, 20),
      dataCheckin: new Date(2024, 2, 25, 22, 00)
  },
  {
      nome: "Fernanda Lima",
      email: "fernanda@gmail.com",
      dataInscrição: new Date(2024, 2, 22, 19, 20),
      dataCheckin: new Date(2024, 2, 25, 22, 00)
  },
  {
      nome: "João Silva",
      email: "joao@gmail.com",
      dataInscrição: new Date(2024, 2, 22, 19, 20),
      dataCheckin: null
  },
  {
      nome: "Ana Souza",
      email: "ana@gmail.com",
      dataInscrição: new Date(2024, 2, 22, 19, 20),
      dataCheckin: new Date(2024, 2, 25, 22, 00)
  },
  {
      nome: "Pedro Santos",
      email: "pedro@gmail.com",
      dataInscrição: new Date(2024, 2, 22, 19, 20),
      dataCheckin: null
  },
  {
      nome: "Mariana Oliveira",
      email: "mariana@gmail.com",
      dataInscrição: new Date(2024, 2, 22, 19, 20),
      dataCheckin: new Date(2024, 2, 25, 22, 00)
  },
  {
      nome: "Lucas Martins",
      email: "lucas@gmail.com",
      dataInscrição: new Date(2024, 2, 22, 19, 20),
      dataCheckin: null
  },
  {
      nome: "Carolina Lima",
      email: "carolina@gmail.com",
      dataInscrição: new Date(2024, 2, 22, 19, 20),
      dataCheckin: new Date(2024, 2, 25, 22, 00)
  },
  {
      nome: "Rafaela Pereira",
      email: "rafaela@gmail.com",
      dataInscrição: new Date(2024, 2, 22, 19, 20),
      dataCheckin: new Date(2024, 2, 25, 22, 00)
  }
];
const criarNovoParticipante = (participante) => {
  const dataInscrição = dayjs(Date.now())
  .to(participante.dataInscrição)

  let dataCheckin = dayjs(Date.now())
  .to(participante.dataCheckin)
  //condicional
  if(participante.dataCheckin == null) {
    dataCheckin = `
    <button
    data-email="${participante.email}"
    onclick="fazerCheckIn(event)"
    >
     Confirmar Check-in
    </button>
    `
  }
  return ` 
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscrição}</td>
      <td>${dataCheckin}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }
 document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscrição: new Date(),
    dataCheckin: null
  }

  const participanteExiste = participantes.find((p) => 
    p.email == participante.email
  )
  if(participanteExiste) {
    alert('Email ja cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event)=> {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find((p) => 
    p.email == event.target.dataset.email
  )

  participante.dataCheckin = new Date()

  atualizarLista(participantes)
}
