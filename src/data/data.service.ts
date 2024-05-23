import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Datum } from './entities/datum.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Datum)
    private usersRepository: Repository<Datum>,
  ) {}
  async create(createDatumDto: CreateDatumDto) {
    try {
      const data = new Datum();
      data.title_tm = createDatumDto.title_tm;
      data.title_en = createDatumDto.title_en;
      data.title_ru = createDatumDto.title_ru;
      data.description_en = createDatumDto.description_en;
      data.description_ru = createDatumDto.description_ru;
      data.description_tm = createDatumDto.description_tm;
      data.short_en = createDatumDto.short_en;
      data.short_ru = createDatumDto.short_ru;
      data.short_tm = createDatumDto.short_tm;
      data.type = createDatumDto.type;
      data.order = createDatumDto.order;
      data.url = createDatumDto.url;
      data.assetId = createDatumDto.assetId;
      return await this.usersRepository.save(data);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll() {
    return this.usersRepository.find({
      relations: {
        asset: true,
      },
    });
  }

  async update(id: number, createDatumDto: UpdateDatumDto) {
    try {
      const data = await this.usersRepository.findOneBy({ id: id });
      if (data) {
        if (createDatumDto.title_tm) data.title_tm = createDatumDto.title_tm;
        if (createDatumDto.title_en) data.title_en = createDatumDto.title_en;
        if (createDatumDto.title_ru) data.title_ru = createDatumDto.title_ru;
        if (createDatumDto.description_en)
          data.description_en = createDatumDto.description_en;
        if (createDatumDto.description_ru)
          data.description_ru = createDatumDto.description_ru;
        if (createDatumDto.description_tm)
          data.description_tm = createDatumDto.description_tm;
        if (createDatumDto.short_en) data.short_en = createDatumDto.short_en;
        if (createDatumDto.short_ru) data.short_ru = createDatumDto.short_ru;
        if (createDatumDto.short_tm) data.short_tm = createDatumDto.short_tm;
        if (createDatumDto.type) data.type = createDatumDto.type;
        if (createDatumDto.order) data.order = createDatumDto.order;
        if (createDatumDto.url) data.url = createDatumDto.url;
        if (createDatumDto.assetId) data.assetId = createDatumDto.assetId;
        return await this.usersRepository.update({ id: id }, data);
      } else {
        throw new NotFoundException('Data Not found for given ID');
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async remove(id: number) {
    try {
      const asset = await this.usersRepository.findOneBy({ id: id });
      if (asset) {
        return this.usersRepository.remove(asset);
      } else {
        throw new BadRequestException('Data Not found');
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
