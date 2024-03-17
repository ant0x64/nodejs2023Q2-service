import { Repository, FindOptionsWhere, DeepPartial, In } from 'typeorm';
import { Subject } from 'rxjs';
import { AbstractEntity } from './abstract.entity';

export abstract class AbstractService<T extends AbstractEntity> {
  protected deleteEvent = new Subject<T['id']>();
  public delete$ = this.deleteEvent.asObservable();

  constructor(protected repository: Repository<T>) {}

  abstract create(createDto: Partial<T>): Promise<T>;

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  findOne(id: T['id']): Promise<T | null> {
    return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  findMany(id: T['id'][]): Promise<T[]> {
    return this.repository.findBy({ id: In(id) } as FindOptionsWhere<T>);
  }

  update(id: T['id'], updateDto: Partial<T>): Promise<T | undefined> {
    return this.repository
      .preload({ id, ...updateDto } as DeepPartial<T>)
      .then((entity) => {
        return entity ? this.repository.save(entity) : entity;
      });
  }

  remove(id: T['id']): Promise<boolean> {
    return this.findOne(id).then(async (entity) => {
      this.deleteEvent.next(id);
      return entity ? !!(await this.repository.remove(entity)) : false;
    });
  }
}
