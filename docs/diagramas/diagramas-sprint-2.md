# Diagramas da Sprint 2

Este arquivo consolida os diagramas principais da Sprint 2 do SmartGreen.

A Sprint 2 evolui o sistema da base de autenticacao para o MVP funcional com:

- RF1: monitorar o fluxo de veiculos nas vias do cruzamento;
- RF3: exibir o status atual de cada semaforo no painel;
- melhorias de UX/UI;
- aplicacao de ISP no front-end;
- aplicacao de Strategy Pattern no back-end.

## Imagens Geradas

As imagens PNG prontas para usar na apresentacao estao em:

![Diagrama de Classes da Sprint 2](imagens/diagrama-classes-sprint-2.png)

![Diagrama ER da Sprint 2](imagens/diagrama-er-sprint-2.png)

![Diagrama de Estados da Sprint 2](imagens/diagrama-estados-sprint-2.png)

## Diagrama de Classes

O diagrama de classes mostra a relacao entre tela de login, Menu SmartGreen,
clientes HTTP, controllers, services, Prisma, entidades de banco, ISP e Strategy.

```mermaid
classDiagram
direction LR

class PaginaLogin {
  +render()
}

class FormularioAcesso {
  -modoAcesso: ModoAcesso
  -nomeCompleto: string
  -email: string
  -senha: string
  -carregando: boolean
  -erro: string
  +enviarFormulario()
  +alterarModo()
  +limparFormulario()
}

class ArmazenamentoSessao {
  -chaveToken: string
  -chaveUsuario: string
  +salvarSessao()
  +obterToken()
  +obterUsuario()
  +limparSessao()
}

class ClienteEntradaAutenticacao {
  <<interface>>
  +entrar(dadosEntrada)
}

class ClienteCadastroAutenticacao {
  <<interface>>
  +cadastrar(dadosCadastro)
}

class ClienteAutenticacaoHttp {
  +entrar(dadosEntrada)
  +cadastrar(dadosCadastro)
}

class PaginaSistema {
  +render()
}

class PainelSistema {
  -tokenAcesso: string
  -usuario: UsuarioSessao
  -visaoSistema: VisaoSistema
  -carregando: boolean
  -atualizando: boolean
  +carregarVisao()
  +simularAgora()
  +sair()
}

class StatusSemaforos {
  +render(vias, semaforo)
}

class ResumoSistema {
  +render(visaoSistema)
}

class VisaoCruzamento {
  +render(vias, semaforo)
}

class CartaoVia {
  +render(via)
}

class ClienteConsultaTrafego {
  <<interface>>
  +obterVisaoGeral(tokenAcesso)
}

class ClienteSimulacaoTrafego {
  <<interface>>
  +simular(tokenAcesso)
}

class ClienteTrafegoHttp {
  +obterVisaoGeral(tokenAcesso)
  +simular(tokenAcesso)
}

class ControladorAutenticacao {
  +cadastrar(dadosCadastro)
  +entrar(dadosEntrada)
}

class ServicoAutenticacao {
  -prisma: PrismaService
  -servicoJwt: JwtService
  +cadastrar(dadosCadastro)
  +entrar(dadosEntrada)
  -criarSessao(usuario)
}

class ControladorTrafego {
  +obterVisaoGeral()
  +simular()
}

class ServicoTrafego {
  -prisma: PrismaService
  -engenharia: EngenhariaDeTrafego
  +obterVisaoGeral()
  +simular()
  -buscarViasMonitoradas()
  -buscarSemaforo()
}

class EngenhariaDeTrafego {
  -estrategiaViaAberta: EstrategiaViaAberta
  -estrategiaViaFechada: EstrategiaViaFechada
  +processarCenarioAtual()
  +processarSimulacao()
  +obterIdsAbertosAtuais()
  +calcularTempoVerdeSegundos()
}

class EstrategiaSimulacaoVia {
  <<interface>>
  +simular(contexto)
}

class EstrategiaViaAberta {
  +simular(contexto)
}

class EstrategiaViaFechada {
  +simular(contexto)
}

class PrismaService {
  +onModuleInit()
  +enableShutdownHooks()
}

class User {
  +id: string
  +name: string
  +email: string
  +passwordHash: string
}

class Lane {
  +id: string
  +key: LaneKey
  +name: string
  +currentVehicleCount: number
  +signalColor: SignalColor
}

class TrafficLight {
  +id: string
  +name: string
  +statusText: string
  +cycleSeconds: number
}

class TrafficFlowReading {
  +id: string
  +laneId: string
  +vehicleCount: number
  +recordedAt: DateTime
}

PaginaLogin --> FormularioAcesso
FormularioAcesso --> ClienteEntradaAutenticacao
FormularioAcesso --> ClienteCadastroAutenticacao
FormularioAcesso --> ArmazenamentoSessao
ClienteAutenticacaoHttp ..|> ClienteEntradaAutenticacao
ClienteAutenticacaoHttp ..|> ClienteCadastroAutenticacao
ClienteAutenticacaoHttp ..> ControladorAutenticacao : HTTP

PaginaSistema --> PainelSistema
PainelSistema --> StatusSemaforos
PainelSistema --> ResumoSistema
PainelSistema --> VisaoCruzamento
PainelSistema --> ClienteConsultaTrafego
PainelSistema --> ClienteSimulacaoTrafego
PainelSistema --> ArmazenamentoSessao
VisaoCruzamento --> CartaoVia
ClienteTrafegoHttp ..|> ClienteConsultaTrafego
ClienteTrafegoHttp ..|> ClienteSimulacaoTrafego
ClienteTrafegoHttp ..> ControladorTrafego : HTTP

ControladorAutenticacao --> ServicoAutenticacao
ControladorTrafego --> ServicoTrafego
ServicoAutenticacao --> PrismaService
ServicoTrafego --> PrismaService
ServicoTrafego --> EngenhariaDeTrafego
EngenhariaDeTrafego --> EstrategiaSimulacaoVia
EstrategiaViaAberta ..|> EstrategiaSimulacaoVia
EstrategiaViaFechada ..|> EstrategiaSimulacaoVia

PrismaService --> User
PrismaService --> Lane
PrismaService --> TrafficLight
PrismaService --> TrafficFlowReading
Lane "1" --> "0..*" TrafficFlowReading
Lane "0..1" --> "0..*" TrafficLight
```

## Diagrama ER

O diagrama entidade-relacionamento mostra a estrutura de dados usada na Sprint 2.

```mermaid
erDiagram
    USER {
        string id PK
        string name
        string email UK
        string passwordHash
        datetime createdAt
        datetime updatedAt
    }

    LANE {
        string id PK
        string key UK
        string name
        string description
        int displayOrder
        int currentVehicleCount
        string signalColor
        datetime lastPriorityAt
        datetime createdAt
        datetime updatedAt
    }

    TRAFFIC_FLOW_READING {
        string id PK
        string laneId FK
        int vehicleCount
        datetime recordedAt
    }

    TRAFFIC_LIGHT {
        string id PK
        string name
        string mode
        string statusText
        int cycleSeconds
        string currentPriorityLaneId FK
        datetime createdAt
        datetime updatedAt
    }

    LANE ||--o{ TRAFFIC_FLOW_READING : registra
    LANE ||--o{ TRAFFIC_LIGHT : pode_ser_prioritaria
```

## Diagrama de Estados

O diagrama de estados mostra o fluxo do usuario no sistema, desde login/cadastro
ate o Menu SmartGreen, RF3, RF1, simulacao e saida.

```mermaid
stateDiagram-v2
    direction LR

    [*] --> Acesso

    state Acesso {
        direction TB
        [*] --> TelaLogin
        TelaLogin --> ValidandoLogin : Entrar
        TelaLogin --> ModoCadastro : Cadastrar

        ValidandoLogin --> AcessoAutorizado : credenciais validas
        ValidandoLogin --> ErroLogin : credenciais invalidas
        ErroLogin --> TelaLogin : corrigir dados

        ModoCadastro --> ValidandoCadastro : enviar cadastro
        ValidandoCadastro --> CadastroConcluido : dados validos
        ValidandoCadastro --> ErroCadastro : dados invalidos
        ErroCadastro --> ModoCadastro : corrigir dados
        CadastroConcluido --> TelaLogin : entrar
    }

    AcessoAutorizado --> MenuSmartGreen

    state MenuSmartGreen {
        direction TB
        [*] --> CarregandoVisao
        CarregandoVisao --> StatusSemaforos : dados carregados
        StatusSemaforos --> FluxoVeiculos : RF3 exibido
        FluxoVeiculos --> AguardandoAtualizacao : RF1 exibido

        AguardandoAtualizacao --> SimulandoTrafego : Atualizar
        AguardandoAtualizacao --> SimulandoTrafego : atualizacao automatica
        SimulandoTrafego --> StatusSemaforos : nova leitura

        AguardandoAtualizacao --> ConfirmandoSaida : Sair
        ConfirmandoSaida --> AguardandoAtualizacao : cancelar
    }

    MenuSmartGreen --> ErroPainel : falha de API
    SimulandoTrafego --> ErroPainel : erro na simulacao
    ErroPainel --> MenuSmartGreen : tentar novamente
    ErroPainel --> Acesso : sessao expirada
    ConfirmandoSaida --> Acesso : confirmar saida

    Acesso --> [*]
```

## Como explicar na apresentacao

Use esta fala:

> Na Sprint 2, os diagramas foram atualizados para refletir o MVP funcional. O
> diagrama de classes mostra a separacao entre front-end, clientes HTTP, API,
> services, banco e tambem as refatoracoes com ISP e Strategy. O diagrama ER
> mostra que, alem de usuario, agora temos entidades de trafego: Via, Semaforo e
> Leitura de Fluxo. Ja o diagrama de estados mostra o comportamento do usuario,
> desde login e cadastro ate o Menu SmartGreen, passando por RF3, RF1,
> atualizacao dos dados e saida do sistema.
