import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Service } from "../../services/entities/services.entity";
import { User } from "../../users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Status {
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
  RESCHEDULED = 'Rescheduled',
  NO_SHOW = 'No_Show',
}

registerEnumType(Status, {
  name: 'Status',
  description: 'The status of an appointment',
});

@Entity('appointments')
@ObjectType()
export class Appointments {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  appointment_id: number;

  @ManyToOne(() => Service, (service) => service.appointments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  @Field(() => Service, { nullable: true })
  service: Service;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  @Field(() => User, { nullable: true })
  user: User;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  @Field(() => Status)
  status: Status;

  @Column({ type: 'int', nullable: true })
  @Field(() => Int, { nullable: true })
  rating?: number;
}