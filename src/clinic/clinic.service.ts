import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Clinic } from "./clinic.entity";

@Injectable()
export class ClinicService {
    constructor(
        @InjectRepository(Clinic)
        private clinicRepository: Repository<Clinic>,
    ) { }

    async insert(newClinic: Clinic): Promise<Clinic> {
        return await this.clinicRepository.save(newClinic);
    }
}