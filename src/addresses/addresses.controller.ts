import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('addresses')
@UseGuards(JwtAuthGuard)
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Post()
  create(@Request() req, @Body() createDto: any) {
    return this.addressesService.create(req.user.id, createDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.addressesService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.addressesService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() updateDto: any) {
    return this.addressesService.update(id, req.user.id, updateDto);
  }

  @Patch(':id/set-default')
  setDefault(@Param('id') id: string, @Request() req) {
    return this.addressesService.setDefault(id, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.addressesService.remove(id, req.user.id);
  }
}