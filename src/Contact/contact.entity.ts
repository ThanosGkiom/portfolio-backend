import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    company?: string;

    @Column()
    message: string;

    @CreateDateColumn()
    createdAt: Date;
}
