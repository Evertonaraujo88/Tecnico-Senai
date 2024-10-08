import React from 'react';
import { Tooltip } from 'react-tooltip';

//import da funcao pasta util
import { dateFormatDbToView } from '../../Utils/StringFunction';

//Estilizacao
import './NextEvent.css'

const NextEvent = ({ title, description, eventDate, idEvent }) => {

    function conectar(idEvent) {
        alert(`Chamar o recurso para conectar: ${idEvent}`)
    }
    return (
        <article className='event-card'>

            <h2 className='event-card__title'>{title}</h2>

            <p className='event-card__description'
                data-tooltip-id="my-tooltip"
                data-tooltip-content={description}
                data-tooltip-place="top">

                <Tooltip id="my-tooltip" className='tooltip' />
                {description.substr(0, 15)}
                ...

            </p>

            <p className='event-card__description'>
                {new Date(eventDate).toLocaleDateString()}
                </p>

            <p className='event-card__description'>{dateFormatDbToView(eventDate)}</p>


            <a onClick={() => { conectar(idEvent) }} href="" className='event-card__connect-link'>Conectar</a>

        </article>
    );
};

export default NextEvent;