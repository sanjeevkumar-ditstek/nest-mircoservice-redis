import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Assessment extends Document {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true, unique: true })
  answer_type: string;

  @Prop()
  category: string;
}

export const AssessmentSchema = SchemaFactory.createForClass(Assessment);
