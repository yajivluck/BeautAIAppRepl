import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  user_id: number;

  @Column({ length: 255 })
  @Field()
  name: string;

  @Column({ length: 255, unique: true })
  @Field()
  username: string;

  @Column({ length: 255, unique: true })
  @Field()
  email: string;

  @Column({ length: 255 })
  password: string;
}
