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
        let women = await this.womenRepository.findOne({
            email: newWomen.email,
            name: newWomen.name,
        });
        if (!women) {
            women = await this.womenRepository.save(newWomen);
        }
        return women
    }
}
