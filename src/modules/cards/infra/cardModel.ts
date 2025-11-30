import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    translation: { type: String, required: true },
    example: { type: String },
    pronunciation: { type: String },
    description: { type: String },
    listId: { type: String, required: true, ref: 'List' },
    boardId: { type: String, required: true, ref: 'Board' },
    position: { type: Number, required: true },
    memberIds: [{ type: String, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

CardSchema.index({ listId: 1, position: 1 });
CardSchema.index({ boardId: 1 });

export const CardModel = mongoose.model('Card', CardSchema);
