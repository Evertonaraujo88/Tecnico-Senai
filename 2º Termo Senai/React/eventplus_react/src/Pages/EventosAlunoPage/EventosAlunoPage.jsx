import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Title from "../../Components/Title/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../Components/Container/Container";
import { Select } from "../../Components/FormComponents/FormComponents";
import Spinner from "../../Components/Spinner/Spinner";
import Modal from "../../Components/Modal/Modal";
import Notification from "../../Components/Notification/Notification"
import api, { eventsResource, myEventsResource, presencesEventsResource, commentaryEventIdResource, commentaryEventResource } from "../../Services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../Context/AuthContext";
import { logDOM } from "@testing-library/react";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [comentario, setComentario] = useState('');
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);
   //Notify
   const [notifyUser, setNotifyUser] = useState();

  useEffect(() => {


    loadEventsType();
  }, [tipoEvento, userData.userId]);

  async function loadEventsType() {

    setShowSpinner(true);
    setEventos([]); //zera o array de eventos

    if (tipoEvento === "1") {
      //listar os eventos (Evento)
      try {
        const todosEventos = await api.get(eventsResource);
        const meusEventos = await api.get(`${myEventsResource}/${userData.userId}`);

        const eventosMarcados = verificaPresenca(todosEventos.data, meusEventos.data);
        setEventos(eventosMarcados);

        /*  console.clear();
         console.log("todos os eventos!!!");
         console.log(todosEventos.data);

         console.log("meus eventos!!!");
         console.log(meusEventos.data);

         console.log("Eventos marcados!!!");
         console.log(eventosMarcados);
*/
        /* setEventos(todosEventos.data); */
        /*  console.log(todosEventos.data); */

      } catch (error) {
        console.log("erro na api funcao loadeventstype da eventosa aluno page");
        console.log(error);
      }
    } else if (tipoEvento === "2") {
      //listar os meu eventos (presencaEventos)
      try {

        const retornoEventos = await api.get(`${myEventsResource}/${userData.userId}`);

        const arrEventos = []; //array vazio

        retornoEventos.data.forEach(e => {
          arrEventos.push({
            ...e.evento,
            situacao: e.situacao,
            idPresencaEvento: e.idPresencaEvento,

          });
        });
        setEventos(arrEventos);
        console.log(arrEventos);

      } catch (error) {
        console.log("erro na api funcao loadeventstype da eventosa aluno page na condicao else");
        console.log(error);
      }
    } else {
      setEventos([]);
    }


    setShowSpinner(false);
  }

  const verificaPresenca = (arrAllEvents, eventsUser) => {

    for (let x = 0; x < arrAllEvents.length; x++) {//para cada evento principal

      for (let i = 0; i < eventsUser.length; i++) {//procurar a correspondencia em minhas presencas

        if (arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento) {
          arrAllEvents[x].situacao = true;
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
          break; //para de procurar para o evento principal
        }

      }

    }
    return arrAllEvents;
  }

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  
  const showHideModal = (idEvent) => {
    setShowModal(showModal ? false : true);
    setUserData({ ...userData, idEvento: idEvent });
  };

  // ler um comentario
  const loadMyCommentary = async (idUsuario, idEvento) => {

    try {
      const promise = await api.get(commentaryEventIdResource + '?idUsuario=' + idUsuario + '&idEvento=' + idEvento);
      console.log(promise.data);
      setComentario(promise.data.descricao)

    } catch (error) {

    /*   Notify(
        "Erro",
        "Verifique a conexão com a internet",
        "danger",
        "Imagem de erro. Rapaz segurando um balão com símbolo x"
      ); */
      console.log(error);
      return;
      
    }
  }

  //Cadastra comentario
  const postMyCommentary = async (descricao, idUsuario, idEvento) => {

    try {
      const promise = await api.post(commentaryEventResource, {
        descricao: descricao,
        exibe: true,
        idUsuario: idUsuario,
        idEvento: idEvento
      })
      console.log(descricao, idUsuario, idEvento);
      console.log(promise.data);
      if (promise.status === 201) {

        const promise = await api.get(commentaryEventIdResource + '?idUsuario=' + idUsuario + '&idEvento=' + idEvento);
        console.log(promise.data);
        setComentario(promise.data.descricao)
       /*  Notify(
          "Sucess",
          "Comentario cadastrado com sucesso",
          "success",
          "Imagem de sucesso. Moça segurando balão"
        ); */
      }
    } catch (error) {

      /* Notify(
        "Erro",
        "O cadastro deve ter no mínimo 3 caracteres",
        "warning",
        "Imagem de aviso. Boneco batendo na exclamação"
      );
      console.log(error);
      return; */
    }
  }


  //remove comentario
  const commentaryRemove = async (idComentarioEvento, idUsuario, idEvento) => {

    try {
      
      const GetById = await api.get(commentaryEventIdResource + '?idUsuario=' + idUsuario + '&idEvento=' + idEvento);
      idComentarioEvento = GetById.data.idComentarioEvento

      const promise = await api.delete(commentaryEventResource + '/' + idComentarioEvento)
      if (promise.status === 204) {

        const GetDesc = await api.get(commentaryEventIdResource + '?idUsuario=' + idUsuario + '&idEvento=' + idEvento);
        console.log(promise.data);
        setComentario(GetDesc.data.descricao)
       /*  Notify(
          "Sucess",
          "Excluido com sucesso",
          "success",
          "Imagem de sucesso. Moça segurando balão"
        );*/
      }

    } catch (error) {

      /* Notify(
        "Erro",
        "Nenhum comentario para ser excluido",
        "danger",
        "Imagem de erro. Boneco batendo na exclamação"
      );
      console.log(error);
      return; */
    }

  };



  async function handleConnect(eventId, whatTheFunction, presencaId = null) {

    if (whatTheFunction === "connect") {

      try {//connect

        const promise = await api.post(presencesEventsResource, {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: eventId
        });

        if (promise.status === 201) {
          alert("presenca confirmada!!!")
        }
        /* setTipoEvento(1);//chamar a api */

        loadEventsType();

      } catch (error) {
        alert("erro no post handleConnect!!!")
      }
      return;

    }
    //unconnect - aqui seria o else

    try {

      const unconnected = await api.delete(
        `${presencesEventsResource}/${presencaId}`
      );

      if (unconnected.status === 204) {

        alert("Desconectado do evento");
        loadEventsType()
      }
    } catch (error) {
      alert("nao desconectado do evento, alguns erro no try unconnect")
      console.log(error);
    }


    alert("Desconectar ao evento:" + eventId);
  }
  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} /> */}

      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          />

          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={showHideModal}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={loadMyCommentary}
          fnPost={postMyCommentary}
          fnDelete={commentaryRemove}
          comentaryText={comentario}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
