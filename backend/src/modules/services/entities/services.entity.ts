import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Business } from '../../businesses/entities/business.entity';  // Adjust import path as needed
import { Appointments } from '../../appointments/entities/appointments.entity';  // Adjust import path as needed


@Entity('services')
@ObjectType()
export class Service {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  service_id: number;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  service_name: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  service_type: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ type: 'float' })  // Added price field with float type
  @Field(() => Float)
  price: number;

  @ManyToOne(() => Business, (business) => business.services)
  @JoinColumn({ name: 'business_id' })
  @Field(() => Business)
  business: Business;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field()
  updated_at: Date;

  @OneToMany(() => Appointments, (appointments) => appointments.service)
  @Field(() => [Appointments], { nullable: true })
  appointments?: Appointments[];  // One-to-many relationship with Appointments

}
