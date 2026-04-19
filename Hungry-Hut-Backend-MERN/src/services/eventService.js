import Event from "../models/event.model.js";
import Restaurant from "../models/restaurant.model.js";
import { findRestaurantById } from "./RestaurantService.js";

export async function createEventOfRestaurant(event,restaurantId) {
    try {
        const restaurant = await findRestaurantById(restaurantId);
        const newEvent = await Event.create({
            restaurant:restaurantId,
            imageUrl:event.imageUrl,
            startedAt:event.startedAt,
            endsAt:event.endsAt,
            location:event.location,
            name:event.name,
        });
        restaurant.events.push(newEvent._id);
        await restaurant.save();
        return newEvent;
    } catch (error) {
        throw new Error(`Failed to create event: ${error.message}`);
    }
}

export async function findRestaurantEvents(restaurantId) {
    try {
        return await Event.find({restaurant:restaurantId});
    } catch (error) {
        throw new Error(`Failed to get restaurant events: ${error.message}`);
    }
}

export async function findAllEvents() {
    try {
        return await Event.find();
    } catch (error) {
        throw new Error(`Failed to get events: ${error.message}`);
    }
}

export async function findEventById(id) {
    try {
        const event = await Event.findById(id);
        if(!event) throw new Error("Event not found");
        return event;
    } catch (error) {
        throw new Error(`Failed to get event: ${error.message}`);
    }
}

export async function deleteRestaurantEvent(id) {
    try {
        await Event.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Failed to delete event: ${error.message}`);
    }
}
