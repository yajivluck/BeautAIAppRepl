import { InputType, Field, Int } from "@nestjs/graphql";
import { Status } from "../entities/appointments.entity";  // Adjust the import path as needed
import { IsInt, IsOptional, IsEnum, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateAppointmentDto {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  appointment_id: number;  // Required field to specify the appointment to update

  @Field(() => Status, { nullable: true })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;  // Optional field to update the status

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  rating?: number;  // Optional field to update the rating (1-5)

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  service_id?: number;  // Optional field to update the service_id

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  user_id?: number;  // Optional field to update the user_id (if needed)
}
