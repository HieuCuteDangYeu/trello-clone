import { Card } from '../domain/card';

export interface ICardPersistence {
  _id: string;
  title: string;
  translation: string;
  example?: string | null;
  pronunciation?: string | null;
  description?: string | null;
  listId: string;
  boardId: string;
  position: number;
  memberIds: string[];
  createdAt: Date;
}

export class CardMap {
  public static toPersistence(card: Card): ICardPersistence {
    return {
      _id: card.id,
      title: card.title,
      translation: card.translation,
      example: card.example,
      pronunciation: card.pronunciation,
      description: card.description,
      listId: card.listId,
      boardId: card.boardId,
      position: card.position,
      memberIds: card.memberIds,
      createdAt: card.createdAt,
    };
  }

  public static toDomain(raw: ICardPersistence): Card {
    return Card.create(
      {
        title: raw.title,
        translation: raw.translation,
        example: raw.example || undefined,
        pronunciation: raw.pronunciation || undefined,
        description: raw.description || undefined,
        listId: raw.listId,
        boardId: raw.boardId,
        position: raw.position,
      },
      raw._id,
    );
  }
}
