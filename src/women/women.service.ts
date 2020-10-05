import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Women } from './women.entity';

@Injectable()
export class WomenService {
    constructor(
        @InjectRepository(Women)
        private womenRepository: Repository<Women>,
    ) { }

    async insert(newWomen: Women): Promise<Women> {
        return await this.womenRepository.save(newWomen);
    }

    async findAll(): Promise<Women[]> {
        return this.womenRepository.find();
    }
}
