import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Role' }], default: [] })
  roles: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Permission' }], default: [] })
  permissions: Types.ObjectId[];

  @Prop({ default: false })
  isSuperAdmin: boolean;

  @Prop()
  providerToken: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
