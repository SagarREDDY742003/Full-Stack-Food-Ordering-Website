import React, { useEffect } from 'react'
import EventCard from './EventCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../state/Restaurant/Action';

const Events = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents({jwt:localStorage.getItem("jwt")}));
  }, [dispatch]);

  const events = useSelector((store) => store.restaurant.events);

  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
        {events.map((event) => <EventCard access={false} event={event}   />)}
    </div>
  )
}

export default Events
