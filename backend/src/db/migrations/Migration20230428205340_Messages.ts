import { Migration } from '@mikro-orm/migrations';

export class Migration20230428205340 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "message" drop constraint "message_from_id_foreign";');
    this.addSql('alter table "message" drop constraint "message_to_id_foreign";');

    this.addSql('alter table "message" add column "sender_id" int not null, add column "receiver_id" int not null;');
    this.addSql('alter table "message" add constraint "message_sender_id_foreign" foreign key ("sender_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "message" add constraint "message_receiver_id_foreign" foreign key ("receiver_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "message" drop column "from_id";');
    this.addSql('alter table "message" drop column "to_id";');
    this.addSql('alter table "message" rename column "body" to "message";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "message" drop constraint "message_sender_id_foreign";');
    this.addSql('alter table "message" drop constraint "message_receiver_id_foreign";');

    this.addSql('alter table "message" add column "from_id" int not null, add column "to_id" int not null;');
    this.addSql('alter table "message" add constraint "message_from_id_foreign" foreign key ("from_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "message" add constraint "message_to_id_foreign" foreign key ("to_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "message" drop column "sender_id";');
    this.addSql('alter table "message" drop column "receiver_id";');
    this.addSql('alter table "message" rename column "message" to "body";');
  }

}
