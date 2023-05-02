
import {Entity, Property, Unique, ManyToOne, PrimaryKey} from "@mikro-orm/core";
import type { Rel } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { User } from "./User.js";


// going to extend the base entity unlike match
// so that I can have a unique ID primary key
@Entity()
export class Message {

    // Something to uniquely identify a specific message
    @PrimaryKey()
    id!: number;

    // The person who sent the message
    @ManyToOne({primary: false})
    sender!: Rel<User>;

    // The person who received the message
    @ManyToOne({primary: false})
    receiver!: Rel<User>;

    // The body of the message
    @Property()
    message!: string;

}


