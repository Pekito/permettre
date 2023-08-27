# Permettre Authorization API

## Índice
- [Introdução](#introdução)
- [O que é Permettre?](#origem-de-permettre-e-sua-relação-com-autorização)
- [Recursos](#recursos)
- [Começando](#começando)
- [Uso](#uso)
- [Modelo de Domínio](#modelo-de-domínio)
- [Modos de Permissão](#modos-de-permissão)
- [Licença](#licença)

## Introdução
Permettre é um projeto de estudo que demonstra a aplicação dos princípios da modelagem tática de Domain Driven Design no contexto de uma API de Autorização. O projeto tem como objetivo demonstrar como projetar e estruturar funcionalidades relacionadas à autorização usando uma abordagem orientada a domínio.

## O que é Permettre?
A palavra "Permettre" origina-se da língua francesa e se traduz para "permitir" ou "autorizar". No contexto da autorização, o termo significa o ato de conceder permissões ou direitos de acesso a recursos ou ações específicas. Ao adotar o nome "Permettre", enfatizamos o propósito central desta API, que é gerenciar e controlar permissões de maneira estruturada e focada no domínio.

## Recursos
O Permettre oferece os seguintes recursos:
- **Gerenciamento de Usuários:** Armazenar e gerenciar informações do usuário.
- **Gerenciamento de Permissões:** Definir e gerenciar permissões individuais.
- **Gerenciamento de Grupos de Permissões:** Definir e gerenciar grupos de permissões.
- **Verificações de Autorização:** Realizar verificações de autorização para determinar se um usuário ou grupo possui as permissões necessárias.

## Começando
Para começar com o Permettre, siga estas etapas:
1. Clone o repositório para a sua máquina local.
2. Instale as dependências necessárias conforme descrito na documentação.
3. Configure o banco de dados executando os scripts fornecidos.
4. Configure as configurações da API, incluindo conexão com o banco de dados e configurações de segurança.
5. Compile e execute a API.

## Uso
O Permettre fornece uma API RESTful que permite interagir com as funcionalidades relacionadas à autorização. Os endpoints da API e suas descrições estão documentados na documentação fornecida. Você pode usar ferramentas como o Postman ou cURL para fazer solicitações à API.

## Modelo de Domínio
O modelo de domínio do Permettre é composto pelos seguintes conceitos principais:
- **Usuário:** Representa um usuário com informações associadas.
- **Permissão:** Representa uma permissão individual que pode ser concedida a usuários ou grupos.
- **Grupo de Usuários:** Define um grupo de permissões que pode ser atribuído a usuários. Grupos de usuários simplificam o gerenciamento de permissões, permitindo a atribuição em massa de permissões a vários usuários.

Esses conceitos são organizados de maneira alinhada aos princípios Tactical DDD para garantir um modelo de domínio claro e de fácil manutenção.

## Modos de Permissão
O Permettre suporta os seguintes modos de permissão:
- **Não Autorizado:** Indica a falta de permissão para acessar um recurso ou ação.
- **Leitura:** Permite a leitura de um recurso.
- **Escrita:** Permite a modificação ou escrita em um recurso.

## Licença
O Permettre é lançado sob a [Licença MIT](LICENSE), o que significa que você pode usar, modificar e distribuir o código para fins educacionais e não comerciais. Consulte o arquivo `LICENSE` para obter mais detalhes.

---
*Aviso: Este projeto é um exercício de aprendizado e não é adequado para uso em produção. Ele é projetado exclusivamente para fins educacionais, para demonstrar a aplicação dos princípios Tactical DDD em uma API simples de Autorização.*