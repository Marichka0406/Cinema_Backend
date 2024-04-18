const Actor = require('../models/actorModel.js')

const getAllActors = async (req, res) => {
    try {
        const actors = await Actor.findAll()

        const responseBody = actors.map((actor) => ({
            id: actor.id,
            first_name: actor.first_name,
            last_name: actor.last_name,
        }))
        
        res.status(200).json(responseBody)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};

const getActorById = async (req, res) => {
    try {
        const actorId = req.params.id
        console.log(`Getting actor with ID: ${actorId}`)
    
        if (isNaN(actorId)) {
            return res.status(400).json({
                error: 'Invalid actorId. Must be a number.',
            });
        }
    
        const actor = await Actor.findByPk(actorId)
    
        if (!actor) {
            return res.status(404).json({
                error: 'Actor not found.',
            });
        }
        const responseBody = {
            id: actor.id,
            first_name: actor.first_name,
            last_name: actor.last_name,
        };
    
        
        res.status(200).json(responseBody)
    }catch (error) {
    
        console.error('Error:', error)
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

const createActor = async (req, res) => {
    try {
        console.log('Creating a new actor')
        console.log(req.body);
        const { first_name, last_name } = req.body
        if (!first_name || !last_name) {
            return res.status(400).json({
                error: 'Something is missing',
            });
        }
    
        const newActor = await Actor.create({
            first_name,
            last_name,
        });
    
        const responseBody = {
            id: newActor.id,
            first_name: newActor.first_name,
            last_name: newActor.last_name,
        };
    
        res.status(201).json(responseBody)
    
    } catch (error) {
        console.error('Error:', error)
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

const deleteActor = async (req, res) => {
    try {
        const actorId = req.params.id
        const actor = await Actor.findByPk(actorId)
        if (!actor) {
            return res.status(404).json('Actor not found')
        }
        await actor.destroy()
        return res.status(204).json('Successfully deleted')
    } catch (error) {
        console.error('Error deleting actor:', error)
        return res.status(500).json('Internal Server Error')
    }
};

const updateActor = async (req, res) => {
    try {
        const actorId = req.params.id
        const { first_name, last_name } = req.body
    
        const actor = await Actor.findByPk(actorId)
        
        actor.first_name = first_name
        actor.last_name = last_name
    
        await actor.save()
    
        return res.status(200).json({
            id: actor.id,
            first_name: actor.first_name,
            last_name: actor.last_name,
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = {
    getAllActors,
    getActorById,
    createActor,
    deleteActor,
    updateActor
}