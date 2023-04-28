import { Migration } from '@mikro-orm/migrations';

export class Migration20230428000245 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "message" ("id" serial primary key, "from_id" int not null, "to_id" int not null, "body" varchar(255) not null);');

    this.addSql('alter table "message" add constraint "message_from_id_foreign" foreign key ("from_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "message" add constraint "message_to_id_foreign" foreign key ("to_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "message" cascade;');
  }

}
