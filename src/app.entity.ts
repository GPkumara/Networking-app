import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity({name:"users"})
export class Users {
    @PrimaryColumn()
    userid: string
    
    @Column()
    emailid : string

    @Column()
    username: string

    @Column()
    password: string

    @Column('text',{ array:true,nullable:true})
    contacts: string[]

    @Column('text',{ array:true,nullable:true})
    tags: string[] 
}

@Entity({name:"contacts"})
export class contacts {
    @PrimaryColumn()
    contactid: string

    @Column()
    fullname : string

    @Column()
    facebook: string

    @Column()
    instagram: string

    @Column()
    linkedin: string

    @Column()
    description: string

    @Column({type:'bigint'})
    contactno: string

    @Column()
    place: string

    @Column()
    photo: string
    
    @Column('text',{ array:true})
    tags: string[]

}

@Entity({name:"tags"})
export class tags {
    @PrimaryColumn()
    tagid: string

    @Column()
    tagname:string
}
