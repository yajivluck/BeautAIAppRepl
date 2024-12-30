import { InputType, Field, Int } from "@nestjs/graphql";
import { Status } from "../entities/appointments.entity";  // Adjust the import path as needed
import { IsInt, IsOptional, IsEnum, IsDateString, IsNotEmpty } from "class-validator";

@InputType()
export class CreateAppointmentDto {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  service_id: number;  // ID of the service associated with the appointment

  @Field(() => Status, { defaultValue: Status.PENDING })
  @IsEnum(Status)
  @IsOptional()
  status?: Status; // Status of the appointment, default to PENDING

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  rating?: number;  // Optional rating (1-5)

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  user_id?: number;  // Optional user_id if provided by the request
}
