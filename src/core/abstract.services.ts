import { ObjectLiteral, Repository } from 'typeorm';

export abstract class AbstractService {

    protected abstract repository: Repository<ObjectLiteral>;
    // Business logic

    async getAll() {
        return await this.repository.find();
    }

    async getById(id: number) {
        const user = await this.repository.findOne(id);
        if (!user) {
            throw new Error('USER NOT FOUND');
        }
        return user;
    }

    async create(element: any) {
        return await this.repository.save(element);
    }

    async update(idElement: any, element: ObjectLiteral) {
        return await this.repository.update(idElement, element);
    }

    async delete(id: any) {
        return  await this.repository.delete(id);
    }

}
