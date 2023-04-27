
import { Entity, Property, Unique, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { User } from "./User.js";


// going to extend the base entity unlike match
// so that I can have a unique ID primary key
@Entity()
export class Message extends BaseEntity {

    // The person who sent the message
    @ManyToOne({primary: true})
    from!: User;

    // The person who received the message
    @ManyToOne({primary: true})
    to!: User;

    // The body of the message
    @Property()
    body!: string;

}


