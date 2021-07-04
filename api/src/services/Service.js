import mongoose from "mongoose";
import Response from '../helpers/Response'
import ErrorResponse from '../helpers/ErrorResponse'

class Service {
  constructor(model) {
    this.model = model;
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async get(query) {
    let { skip, limit } = query;

    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;

    delete query.skip;
    delete query.limit;

    if (query._id) {
      query._id = new mongoose.mongo.ObjectId(query._id);
    }

    let items = await this.model
      .find(query)
      .skip(skip)
      .limit(limit);

    return new Response(true, 200, items)
  }

  async insert(data) {
    let item = await this.model.create(data);
    if (item) {
      return new Response(true, 200, item)
    }
  }

  async update(id, data) {
    let item = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!item){
      throw ErrorResponse(`${this.model.modelName} with id ${id} not found`, 404)
    }
    return new Response(true, 202, item)
  }

  async delete(id) {
    let item = await this.model.findByIdAndDelete(id);
    if (!item){
      throw ErrorResponse(`${this.model.modelName} with id ${id} not found`, 404)
    }
    return new Response(true, 202, item)
  }
}

export default Service;
