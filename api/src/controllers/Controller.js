class Controller {

  constructor(service) {
    this.service = service;
    this.get = this.get.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async get(req, res) {
    let response = await this.service.get(req.query)
    return res.status(response.statusCode).send(response)
  }

  async insert(req, res) {
    let response = await this.service.insert(req.body)
    return res.status(response.statusCode).send(response)
  }

  async update(req, res) {
    let response = await this.service.update(req.params.id, req.body)
    return res.status(response.statusCode).send(response)
  }

  async delete(req, res) {
    let response = await this.service.delete(req.params.id)
    return res.status(response.statusCode).send(response)
  }
  
}

export default Controller