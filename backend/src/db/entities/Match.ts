import {Entity, ManyToOne, Property, Unique} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import {User} from "./User.js";

@Entity()
export class Match {

    @ManyToOne({ primary: true } )
    owner!: User;

    @ManyToOne( { primary: true })
    matchee!: User;

    @Property()
    created_at = new Date();
}