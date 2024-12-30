import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Service } from '../../services/entities/services.entity';  // Adjust import path as needed

@Entity('businesses')
@ObjectType()
export class Business {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  business_id: number;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  business_name: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  phone_number: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  address: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  operating_hours: string;

  @OneToMany(() => Service, (service) => service.business)
  @Field(() => [Service])
  services: Service[];

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
}
