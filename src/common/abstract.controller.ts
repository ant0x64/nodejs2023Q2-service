import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { UUIDPipe } from 'src/common/pipes/uuid.pipe';

import { AbstractService } from './abstract.service';
import { AbstractEntity } from './abstract.entity';

const DynamicResponseType = (params) => {
  return function (
    target: AbstractController<any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    if (target.getEntity) {
      const entity = target.getEntity();
      params.type = params.array ? [entity] : entity;
    }

    return ApiResponse(params)(target, propertyKey, descriptor);
  };
};

@UseInterceptors(ClassSerializerInterceptor)
export abstract class AbstractController<
  E extends AbstractEntity,
  S extends AbstractService<E> = AbstractService<E>,
> {
  protected service: S;

  abstract getEntity(): E;

  @Post()
  @ApiOperation({ summary: 'Create entity' })
  @DynamicResponseType({
    status: 201,
    description: 'The entity has been created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Does not contain required fields',
  })
  create(@Body() createDto: Partial<E>) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all entitys' })
  @DynamicResponseType({ status: 200, array: true })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single entity by id' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the entity',
  })
  @DynamicResponseType({ status: 200 })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Entity not found' })
  async findOne(@Param('id', UUIDPipe) id: string) {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update entity' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the entity',
  })
  @DynamicResponseType({ status: 200 })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Entity not found' })
  async update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateDto: Partial<E>,
  ) {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete entity' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the entity',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Entity not found' })
  async remove(@Param('id', UUIDPipe) id: string) {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }

    return this.service.remove(id);
  }
}
