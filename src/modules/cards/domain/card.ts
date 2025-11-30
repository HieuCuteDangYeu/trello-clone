import { Entity } from '@shared/core/Entity';

interface CardProps {
  title: string;
  translation: string;
  example?: string;
  pronunciation?: string;
  listId: string;
  boardId: string;
  position: number;
  memberIds: string[];
  createdAt: Date;
  description?: string;
}

export class Card extends Entity<CardProps> {
  get title(): string {
    return this.props.title;
  }
  get translation(): string {
    return this.props.translation;
  }
  get example(): string | undefined {
    return this.props.example;
  }
  get pronunciation(): string | undefined {
    return this.props.pronunciation;
  }
  get description(): string | undefined {
    return this.props.description;
  }
  get listId(): string {
    return this.props.listId;
  }
  get boardId(): string {
    return this.props.boardId;
  }
  get position(): number {
    return this.props.position;
  }
  get memberIds(): string[] {
    return this.props.memberIds;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: CardProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: {
      title: string;
      translation: string;
      listId: string;
      boardId: string;
      position: number;
      description?: string;
      example?: string;
      pronunciation?: string;
    },
    id?: string,
  ): Card {
    if (props.title.length < 1) {
      throw new Error('Word cannot be empty.');
    }
    if (props.translation.length < 1) {
      throw new Error('Translation cannot be empty.');
    }

    return new Card(
      {
        ...props,
        memberIds: [],
        createdAt: new Date(),
      },
      id,
    );
  }

  public move(newListId: string, newPosition: number): void {
    this.props.listId = newListId;
    this.props.position = newPosition;
  }

  public updateDetails(props: {
    title?: string;
    translation?: string;
    description?: string;
    example?: string;
    pronunciation?: string;
  }): void {
    if (props.title) this.props.title = props.title;
    if (props.translation) this.props.translation = props.translation;
    if (props.description !== undefined)
      this.props.description = props.description;
    if (props.example !== undefined) this.props.example = props.example;
    if (props.pronunciation !== undefined)
      this.props.pronunciation = props.pronunciation;
  }
}
