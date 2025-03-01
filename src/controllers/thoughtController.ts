import Thought from '../models/Thought.js';
import { Request, Response } from 'express';

  export const getThoughts = async(_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getSingleThought = async(req: Request, res: Response) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
         res.status(404).json({ message: 'No thought with that ID' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create a new thought
  export const createThought = async(req: Request, res: Response) => {
    try {
      const dbThoughtData = await Thought.create(req.body);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const updateThought = async(req: Request, res: Response) => {
    try {
      console.log("🚀 ~ updateThought ~ req.body:", req.body)
      console.log("🚀 ~ updateThought ~ req.params.userId:", req.params.userId)
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { 
          $set: req.body 
        },
        { new: true, runValidators: false }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No user with this ID!' });
        return;
      } else {
        res.json(dbThoughtData);
      } 
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // delete a thought
  // BONUS: remove a user's associated thoughts when deleted
  export const deleteThought = async(req: Request, res: Response) => {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.userId });
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      } else {
        res.json({ message: 'Thought deleted!' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }